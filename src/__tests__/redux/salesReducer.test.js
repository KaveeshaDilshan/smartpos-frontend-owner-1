import reducer from '../../views/managerPages/Sales/redux/salesReducer';
import * as actions from '../../views/managerPages/Sales/redux/salesActionTypes';

const initialState = {
  sales: null,
  loading: false,
};
const mockDataSales = {
  incomes: [
    {
      _id: '6150c9d9f14212175cf8c55f',
      archived: false,
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
      income: 290,
    },
  ],
};
describe('Check Sales Reducer Actions', () => {
  it('1) returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('2) should set the loading state true in getSales Action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_SALESPERSONS_SALES_BY_DATE_RANGE,
    });
    expect(nextState.loading).toEqual(true);
  });

  it('3) should set the loading state false and sales array in getSalesSuccess Action ', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_SALESPERSONS_SALES_BY_DATE_RANGE_SUCCESS,
      data: mockDataSales,
    });
    expect(nextState.loading).toEqual(false);
    expect(nextState.sales).toEqual(mockDataSales.incomes);
  });

  it('4) should set the loading state false in getSalesError action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_SALESPERSONS_SALES_BY_DATE_RANGE_ERROR,
    });
    expect(nextState.loading).toEqual(false);
  });
});
