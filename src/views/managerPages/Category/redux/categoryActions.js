import * as actionTypes from './categoryActionTypes';

export function getAllCategories(data) {
  return { type: actionTypes.GET_ALL_CATEGORIES, data };
}
export function addCategory(data) {
  return { type: actionTypes.ADD_CATEGORY, data };
}
