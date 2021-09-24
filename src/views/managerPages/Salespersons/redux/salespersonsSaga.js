import axios from 'axios';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './salespersonsActionTypes';
import { BASE_URL } from '../../../../const/config';

export function* getAllSalespersons(action) {
  const { search, warehouseID, page } = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/salespersons/getAll/${warehouseID}?sortBy=+firstName&query=${search}&page=${page}`
    );
    yield put({
      type: actionTypes.GET_ALL_SALESPERSONS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.GET_ALL_SALESPERSONS_ERROR,
    });
  }
}

const getOneSalespersonCall = async (id) => {
  const result = await axios.get(
    `${BASE_URL}/manager/salespersons/getOne/${id}`
  );
  return result;
};

export function* getOneSalesperson(action) {
  const id = action.data;
  try {
    const { data } = yield call(getOneSalespersonCall, id);
    yield put({
      type: actionTypes.GET_ONE_SALESPERSON_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* addSalesperson(action) {
  try {
    yield axios.post(`${BASE_URL}/manager/salespersons`, action.data);
    toast.success('New Salesperson is added successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* editSalesperson(action) {
  console.log(action.data);
  const { id, details } = action.data;
  try {
    yield axios.patch(`${BASE_URL}/manager/salespersons/${id}`, details);
    toast.success('Salesperson details are edited successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* getWarehouseShops(action) {
  const warehouseId = action.data;
  console.log(warehouseId);
  try {
    // const { data } = yield axios.get(
    //   `${BASE_URL}/manager/shops/warehouse/${warehouseId}?sortBy=+name`
    // );
    const data = {
      shops: [
        {
          balance: 0,
          archived: false,
          _id: '6139fe5859c215002ae0500d',
          name: 'shop1',
          email: 'yasindu563@gmail.com',
          telephone: '0779667959',
          location: 'Gampaha',
          longitude: '7.409',
          latitude: '80.098',
          ownerName: 'testnn',
          address: '248/6, Batapotha ',
          __v: 0,
        },
        {
          balance: 0,
          archived: false,
          _id: '6139fe1059c215002ae05007',
          name: 'shop3',
          email: 'yasindu56@gmail.com',
          telephone: '0779667954',
          location: 'Gampaha',
          longitude: '7.409',
          latitude: '80.098',
          ownerName: 'testn',
          address: '248/5, Batapotha ',
          __v: 0,
        },
      ],
    };

    yield put({
      type: actionTypes.GET_WAREHOUSE_SHOPS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* getSalespersonShops(action) {
  const salespersonId = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/shops/${salespersonId}`
    );
    // const data = {
    //   shops: [
    //     {
    //       balance: 0,
    //       archived: false,
    //       _id: '6139fe1059c215002ae05004',
    //       name: 'shop2',
    //       email: 'yasindu56@gmail.com',
    //       telephone: '0779667954',
    //       location: 'Gampaha',
    //       longitude: '7.409',
    //       latitude: '80.098',
    //       ownerName: 'testn',
    //       address: '248/5, Batapotha ',
    //       __v: 0,
    //     },
    //   ],
    // };
    yield put({
      type: actionTypes.GET_SALESPERSON_SHOPS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* addShopsToSalesperson(action) {
  const { id, details } = action.data;
  try {
    yield axios.post(`${BASE_URL}/manager/shops/${id}`, details);
    toast.success('Shops are added successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* getSalespersonDailyProducts(action) {
  const { id, date } = action.data;
  console.log(date);
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/dailyproducts/${id}?date=${date}`
    );
    yield put({
      type: actionTypes.GET_SALESPERSON_DAILY_PRODUCTS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* addDailyProduct(action) {
  console.log(action.data);
  const { salespersonId, details } = action.data;
  try {
    yield axios.post(
      `${BASE_URL}/manager/dailyProducts/${salespersonId}`,
      details
    );
    toast.success('Daily Products are updated successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

// export function* changeDailyProductCount(action) {
//   console.log(action.data);
//   try {
//     yield axios.patch(
//       `${BASE_URL}/manager/dailyProducts/changeCount`,
//       action.data
//     );
//     toast.success('Product count is updated successfully');
//   } catch (error) {
//     toast.error(error.response.data.message);
//   }
// }

function* ManagerSalespersonsSagas() {
  yield takeLatest(actionTypes.GET_ALL_SALESPERSONS, getAllSalespersons);
  yield takeLatest(actionTypes.GET_ONE_SALESPERSON, getOneSalesperson);
  yield takeLatest(actionTypes.ADD_SALESPERSON, addSalesperson);
  yield takeLatest(actionTypes.EDIT_SALESPERSON, editSalesperson);
  yield takeLatest(
    actionTypes.GET_SALESPERSON_DAILY_PRODUCTS,
    getSalespersonDailyProducts
  );
  yield takeLatest(actionTypes.ADD_NEW_DAILY_PRODUCT, addDailyProduct);
  yield takeLatest(actionTypes.ADD_SHOPS_TO_SALESPERSON, addShopsToSalesperson);
  yield takeLatest(actionTypes.GET_WAREHOUSE_SHOPS, getWarehouseShops);
  yield takeLatest(actionTypes.GET_SALESPERSON_SHOPS, getSalespersonShops);
}

const managerSalespersonsSagas = [ManagerSalespersonsSagas];

export default managerSalespersonsSagas;
