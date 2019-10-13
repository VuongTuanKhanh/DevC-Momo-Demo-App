import {combineReducers} from 'redux';
import {reducer as RecommendReducer} from './RecommedRedux';
import {reducer as UserReducer} from './UserRedux';
import {reducer as CategoryRedux} from './CategoryRedux';

export default combineReducers ({
  recommend: RecommendReducer,
  user: UserReducer,
  category: CategoryRedux,
});
