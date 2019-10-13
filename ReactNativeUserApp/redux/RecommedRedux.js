import { foodRecommedApi } from "../constants/AxiosConfig";
import { calculateLatLong } from "../helper/utils";

const types = {
  GET_BANNER: "GET_BANNER",
  GET_RECOMMEND_BY_USERID_SUCCCESS: "GET_RECOMMEND_BY_USERID_SUCCCESS",
  GET_RECOMMEND_BY_USERID_PAGIN: "GET_RECOMMEND_BY_USERID_PAGIN",
  RECOMMEND_END_PAGE: "RECOMMEND_END_PAGE",
  GET_RECOMMEND_BY_USERID_ERROR: "GET_RECOMMEND_BY_USERID_ERROR",
  IS_LOADING_MORE: "IS_LOADING_MORE"
};

export const getRecommendByUserId = (page = 1, pageSize = 10) => async (
  dispatch,
  getState
) => {
  let userId = getState().user.userId;
  const userRegion = getState().user.region;
  const { latMin, latMax, longMin, longMax } = calculateLatLong(
    userRegion.latitudeDelta,
    userRegion.longitude,
    userRegion.latitude
  );
  const cateSelected = getState().category.cateSelected;
  var category = cateSelected.length > 0 ? cateSelected : null;
  await foodRecommedApi
    .post("/api/recommendation", {
      category,
      latMin,
      latMax,
      longMin,
      longMax,
      page,
      pageSize,
      userId
    })
    .then(res => {
      dispatch({
        type: types.GET_RECOMMEND_BY_USERID_SUCCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      console.log("err");
    });
};

export const getRecommendByUserIdWithPagin = (pageSize = 10) => async (
  dispatch,
  getState
) => {
  dispatch({ type: types.IS_LOADING_MORE, payload: true });
  let userId = getState().user.userId;
  const userRegion = getState().user.region;
  const cateSelected = getState().category.cateSelected;
  var category = cateSelected.length > 0 ? cateSelected : null;
  const pageIndex = getState().recommend.page;
  const page = pageIndex + 1;
  const { latMin, latMax, longMin, longMax } = calculateLatLong(
    userRegion.latitudeDelta,
    userRegion.longitude,
    userRegion.latitude
  );
  await foodRecommedApi
    .post("/api/recommendation", {
      category,
      latMin,
      latMax,
      longMin,
      longMax,
      page,
      pageSize,
      userId
    })
    .then(res => {
      if (res.data.length === 0) {
        dispatch({
          type: types.RECOMMEND_END_PAGE,
          payload: page
        });
      } else {
        dispatch({
          type: types.GET_RECOMMEND_BY_USERID_PAGIN,
          payload: res.data
        });
      }
    })
    .catch(err => {
      console.log(err);
      console.log("err");
    });
};

export const getBanner = () => (dispatch, getState) => {
  let userId = getState().user.userId;
  userId = userId ? userId : "9223308265286104986";
  foodRecommedApi
    .get(`/api/recommendation/special?userId=${userId}`)
    .then(res =>
      dispatch({
        type: types.GET_BANNER,
        payload: res.data
      })
    );
};

const initState = {
  isLoading: true,
  isLoadingMore: false,
  recommends: [],
  page: 1,
  endPage: false,
  banners: []
};

export const reducer = (state = initState, action) => {
  const { payload, type } = action;
  switch (type) {
    case types.GET_BANNER:
      return {
        ...state,
        banners: payload
      };
    case types.GET_RECOMMEND_BY_USERID_SUCCCESS:
      return {
        ...state,
        isLoading: false,
        endPage: false,
        recommends: payload
      };
    case types.GET_RECOMMEND_BY_USERID_ERROR:
      return {
        ...state
      };
    case types.GET_RECOMMEND_BY_USERID_PAGIN:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false,
        endPage: false,
        page: state.page + 1,
        recommends: state.recommends.concat(payload)
      };
    case types.RECOMMEND_END_PAGE:
      return {
        ...state,
        isLoading: false,
        page: payload - 1,
        endPage: true,
        isLoadingMore: false
      };
    case types.IS_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: true
      };
    default:
      return state;
  }
};
