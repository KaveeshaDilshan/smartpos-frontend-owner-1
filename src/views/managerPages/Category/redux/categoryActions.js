import * as actionTypes from './categoryActionTypes';

export function getAllCategories() {
  return { type: actionTypes.GET_ALL_CATEGORIES };
}
export function addCategory(data) {
  return { type: actionTypes.ADD_CATEGORY, data };
}
