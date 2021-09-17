import * as actionTypes from './productActionTypes';

export function getAllProducts() {
  return { type: actionTypes.GET_ALL_PRODUCTS };
}
export function getOneProduct(data) {
  return { type: actionTypes.GET_ONE_PRODUCT, data };
}
export function addProduct(data) {
  return { type: actionTypes.ADD_PRODUCT, data };
}
export function updateProduct(data) {
  return { type: actionTypes.UPDATE_PRODUCT, data };
}
