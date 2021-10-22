import reducer from '../../views/managerPages/Dashboard/redux/dashboardReducer';
import * as actions from '../../views/managerPages/Dashboard/redux/dashboardActionTypes';

const initialState = {
  warehouseID: null,
  warehouse: null,
  loading: false,
  warehouseSales: [],
};

const mockDataWarehouseSales = [
  {
    date: '2021-10-21',
    totalSales: 290,
  },
  {
    date: '2021-10-22',
    totalSales: 0,
  },
];

const mockDataWarehouse = {
  archived: false,
  _id: '6150c8bc497d385c88837f2a',
  salesPersonId: [],
  name: 'Matara Warehouse',
  district: 'Matara',
  town: 'Morawaka',
  telephone: '085212345',
  products: [],
  __v: 0,
  managerId: {
    archived: false,
    _id: '6150c921497d385c88837f37',
    firstName: 'Kaveesha',
    lastName: 'DIlshan',
    email: 'kaveesha.18@cse.mrt.ac.lk',
    telephone: '+94777816226',
    role: 'manager',
    uid: '7eiLXCyJpNU6A9MLxiv7d02JWWE2',
    createdAt: '2021-09-26T19:25:21.078Z',
    updatedAt: '2021-09-26T19:26:14.763Z',
    __v: 0,
    warehouseId: '6150c8bc497d385c88837f2a',
  },
};

describe('Check Dashboard Reducer Actions', () => {
  it('1) returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('2) should set the loading state true in get warehouse sales action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_WAREHOUSE_SALES,
    });
    expect(nextState.loading).toEqual(true);
  });

  it('3) should set the loading state true in getWarehouseSales action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_WAREHOUSE_SALES_SUCCESS,
      sales: mockDataWarehouseSales,
    });
    expect(nextState.loading).toEqual(false);
    expect(nextState.warehouseSales).toEqual(mockDataWarehouseSales);
  });

  it('4) should set the loading state false in getWarehouseSalesError action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_WAREHOUSE_SALES_ERROR,
    });
    expect(nextState.loading).toEqual(false);
  });

  it('5) should set warehouseId and warehouse details object', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.M_GET_MANAGER_WAREHOUSE_SUCCESS,
      warehouse: mockDataWarehouse,
    });
    expect(nextState.warehouseID).toEqual(mockDataWarehouse._id);
    expect(nextState.warehouse).toEqual(mockDataWarehouse);
  });
});
