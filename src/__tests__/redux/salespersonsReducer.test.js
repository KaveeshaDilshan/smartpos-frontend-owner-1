import reducer from '../../views/managerPages/Salespersons/redux/salespersonsReducer';
import * as actions from '../../views/managerPages/Salespersons/redux/salespersonsActionTypes';

const initialState = {
  allSalespersons: [],
  loading: false,
  oneSalesperson: {},
  warehouseShops: [],
  oneSalespersonDailyProducts: [],
  oneSalespersonAssignedShops: [],
  totalSalespersons: 0,
  dailyProductsLoading: false,
};

const mockDataAllSalespersons = {
  totalItems: 3,
  items: [
    {
      archived: false,
      _id: '6150c9d9f14212175cf8c55f',
      firstName: 'Yasinduu',
      lastName: 'Dilshan',
      email: 'yasindu.18@cse.mrt.ac.lk',
      role: 'salesperson',
      warehouseId: '6150c8bc497d385c88837f2a',
      uid: 'oDeoQP1u12hKb4MjOHjLOKotCI23',
      createdAt: '2021-09-26T19:28:25.790Z',
      updatedAt: '2021-10-15T10:16:58.006Z',
      __v: 0,
      telephone: '0716553268',
      latitude: '6.925',
      longitude: '79.862',
    },
  ],
};

const mockDataOneSalesperson = {
  success: 1,
  result: {
    archived: false,
    _id: '6150c9d9f14212175cf8c55f',
    firstName: 'Yasinduu',
    lastName: 'Dilshan',
    email: 'yasindu.18@cse.mrt.ac.lk',
    role: 'salesperson',
    warehouseId: '6150c8bc497d385c88837f2a',
    uid: 'oDeoQP1u12hKb4MjOHjLOKotCI23',
    createdAt: '2021-09-26T19:28:25.790Z',
    updatedAt: '2021-10-15T10:16:58.006Z',
    __v: 0,
    telephone: '0716553268',
    latitude: '6.925',
    longitude: '79.862',
  },
};

const mockDataWarehouseShops = {
  shops: [
    {
      balance: 0,
      archived: false,
      _id: '6150d5cd6bbca6002aa65f41',
      name: 'Sisira Stores',
      email: 'sisira@gmail.com',
      telephone: '0779665612',
      location: 'Mathara',
      longitude: '79.869',
      latitude: '6.929',
      ownerName: 'Sisira',
      address: '123, Mathara',
      warehouse: '6150c8bc497d385c88837f2a',
      __v: 0,
    },
  ],
};

const mockDataSalespersonShops = {
  shops: [
    {
      balance: 0,
      archived: false,
      _id: '6150d1a56bbca6002aa65f09',
      name: 'Dilshan Stores',
      email: 'dilshan@gmail.com',
      telephone: '0779883467',
      location: 'Mathara',
      longitude: '79.862',
      latitude: '6.928',
      ownerName: 'Dilshan',
      address: '247/5, Mathara',
      warehouse: '6150c8bc497d385c88837f2a',
      __v: 0,
    },
  ],
};

const mockDataDailyProducts = {
  dailyProducts: [
    {
      _id: '617182e2cf7bbd45d05b0f3c',
      product: {
        archived: false,
        _id: '6150cb94f14212175cf8c592',
        name: 'Crisco',
        categoryId: '616c2ec3800c141704de18f6',
        unitPrice: 190,
        description: 'This is the Crisco',
        photo: 'photo',
        __v: 0,
      },
      quantity: 10,
      sales: 0,
    },
  ],
};
describe('Check Salesperson Reducer Actions', () => {
  it('1) returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('2) should set the loading state true in getSalesperson Action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_SALESPERSONS,
    });
    expect(nextState.loading).toEqual(true);
  });

  it('3) should set the loading state false and allSalesperson array and totalSalesperson state in getSalespersonsSuccess Action ', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_SALESPERSONS_SUCCESS,
      data: mockDataAllSalespersons,
    });
    expect(nextState.loading).toEqual(false);
    expect(nextState.allSalespersons).toEqual(mockDataAllSalespersons.items);
    expect(nextState.totalSalespersons).toEqual(
      mockDataAllSalespersons.totalItems
    );
  });

  it('4) should set the loading state false in getSalespersonsError action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_SALESPERSONS_ERROR,
    });
    expect(nextState.loading).toEqual(false);
  });

  it('5) should set the oneSalesperson state in getOneSalesperson action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ONE_SALESPERSON_SUCCESS,
      data: mockDataOneSalesperson,
    });
    expect(nextState.oneSalesperson).toEqual(mockDataOneSalesperson.result);
  });

  it('6) should set the warehouseShops state in getWarehouseShopsSuccess action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_WAREHOUSE_SHOPS_SUCCESS,
      data: mockDataWarehouseShops,
    });
    expect(nextState.warehouseShops).toEqual(mockDataWarehouseShops.shops);
  });

  it('7) should set the oneSalespersonAssignedShops state in getSalespersonShopsSuccess action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_SALESPERSON_SHOPS_SUCCESS,
      data: mockDataSalespersonShops,
    });
    expect(nextState.oneSalespersonAssignedShops).toEqual(
      mockDataSalespersonShops.shops
    );
  });

  it('8) should set the dailyProductsLoading state true in getDailyProducts Action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_SALESPERSON_DAILY_PRODUCTS,
    });
    expect(nextState.dailyProductsLoading).toEqual(true);
  });

  it('9) should set the dailyProductsLoading state false and oneSalespersonDailyProducts array in getDailyProductsSuccess Action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_SALESPERSON_DAILY_PRODUCTS_SUCCESS,
      data: mockDataDailyProducts,
    });
    expect(nextState.dailyProductsLoading).toEqual(false);
    expect(nextState.oneSalespersonDailyProducts).toEqual(
      mockDataDailyProducts.dailyProducts
    );
  });
});
