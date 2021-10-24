import reducer from '../../views/managerPages/Warehouse/redux/warehouseReducer';
import * as actions from '../../views/managerPages/Warehouse/redux/warehouseActionTypes';

const initialState = {
  allWarehouseProducts: null,
  loading: false,
};

const mockDataWarehouseProducts = {
  _id: '6150c8bc497d385c88837f2a',
  products: [
    {
      _id: '61555b6a7e8f8a491495386d',
      product: {
        archived: false,
        _id: '6150cabef14212175cf8c580',
        name: 'Chocolate biscuit',
        categoryId: '616c2ec3800c141704de18f6',
        unitPrice: 100,
        description: 'This is The chocolate biscuit',
        photo: 'phoyo',
        __v: 0,
      },
      quantity: 275,
    },
    {
      _id: '6155b26c8450c10c789d9589',
      product: {
        archived: false,
        _id: '6150ca6bf14212175cf8c577',
        name: 'Maari Biscuit',
        categoryId: '616c2ec3800c141704de18f6',
        unitPrice: 120,
        description: 'This is a Maari Biscuit',
        photo: 'photo',
        __v: 0,
      },
      quantity: 121,
    },
  ],
};
describe('Check Warehouse Reducer Actions', () => {
  it('1) returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('2) should set the loading state true in getWarehouseProducts action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_WAREHOUSE_PRODUCTS,
    });
    expect(nextState.loading).toEqual(true);
  });

  it('3) should set the loading state false and allWarehouseProducts array in getWarehouseProductsSuccess action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_WAREHOUSE_PRODUCTS_SUCCESS,
      data: mockDataWarehouseProducts,
    });
    expect(nextState.loading).toEqual(false);
    expect(nextState.allWarehouseProducts).toEqual(
      mockDataWarehouseProducts.products
    );
  });

  it('4) should set the loading state false in getWarehouseProductsError action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_WAREHOUSE_PRODUCTS_ERROR,
    });
    expect(nextState.loading).toEqual(false);
  });
});
