import {foodRecommedApi} from '../constants/AxiosConfig';

const types = {
  GET_CATEGORIES: 'GET_CATEGORIES',
  SELECT_CATE: 'SELECT_CATE',
};

export const getCategories = () => dispatch => {
  foodRecommedApi.get ('/api/category').then (res => {
    dispatch ({
      type: types.GET_CATEGORIES,
      payload: res.data,
    });
  });
};

export const selecteCate = cate => dispatch => {
  dispatch ({
    type: types.SELECT_CATE,
    payload: cate,
  });
};

const initState = {
  data: [],
  cateSelected: [],
};

export const reducer = (state = initState, action) => {
  const {payload, type} = action;
  switch (type) {
    case types.GET_CATEGORIES:
      return {
        ...state,
        data: payload,
      };
    case types.SELECT_CATE:
      const {cateSelected} = state;
      let cateSelectedArr = cateSelected;
      const index = cateSelectedArr.indexOf (payload);
      if (index > -1) {
        cateSelectedArr.splice (index, 1);
      } else {
        cateSelectedArr.push (payload);
      }
      return {
        ...state,
        cateSelected: cateSelectedArr,
      };
    default:
      return state;
  }
};
