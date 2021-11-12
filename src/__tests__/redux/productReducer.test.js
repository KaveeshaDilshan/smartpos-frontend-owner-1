import reducer from '../../views/managerPages/Products/redux/productReducer';
import * as actions from '../../views/managerPages/Products/redux/productActionTypes';

const initialState = {
  allProducts: null,
  loading: false,
  oneProduct: null,
  oneProductLoading: false,
};

const mockDataAllProducts = {
  totalItems: 1,
  items: [
    {
      archived: false,
      _id: '6150cb21f14212175cf8c589',
      name: 'Sprite',
      categoryId: {
        archived: false,
        _id: '616c2f5c800c141704de1900',
        name: 'Beverage',
        __v: 0,
      },
      unitPrice: 300,
      description: 'This is Sprite',
      photo: 'photo',
      __v: 0,
    },
  ],
};

const mockDataOneProduct = {
  success: 1,
  result: {
    archived: false,
    _id: '6150ca6bf14212175cf8c577',
    name: 'Maari Biscuit',
    categoryId: {
      archived: false,
      _id: '616c2ec3800c141704de18f6',
      name: 'Biscuit',
      __v: 0,
    },
    unitPrice: 120,
    description: 'This is a Maari Biscuit',
    photo: 'photo',
    __v: 0,
  },
};

const mockDataUpdatedProduct = {
  success: 1,
  result: {
    archived: false,
    _id: '6150ca6bf14212175cf8c577',
    name: 'Crisco',
    categoryId: {
      archived: false,
      _id: '616c2ec3800c141704de18f6',
      name: 'Biscuit',
      __v: 0,
    },
    unitPrice: 150,
    description: 'This is a Crisco Biscuit',
    photo: 'photo',
    __v: 0,
  },
};

describe('Check Product Reducer Actions', () => {
  it('1) returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('2) should set the loading state true in getAllProducts action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_PRODUCTS,
    });
    expect(nextState.loading).toEqual(true);
  });

  it('3) should set the loading state false and allProducts array in getAllProductsSuccess action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_PRODUCTS_SUCCESS,
      data: mockDataAllProducts,
    });
    expect(nextState.loading).toEqual(false);
    expect(nextState.allProducts).toEqual(mockDataAllProducts.items);
  });

  it('4) should set the loading state false in getAllProductsError action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_PRODUCTS_ERROR,
    });
    expect(nextState.loading).toEqual(false);
  });

  it('5) should set the loading state true in getOneProduct action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ONE_PRODUCT,
    });
    expect(nextState.oneProductLoading).toEqual(true);
  });

  it('6) should set the loading state false and oneProduct object in getOneProductSuccess action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ONE_PRODUCT_SUCCESS,
      data: mockDataOneProduct,
    });
    expect(nextState.oneProductLoading).toEqual(false);
    expect(nextState.oneProduct).toEqual(mockDataOneProduct.result);
  });

  it('7) should set the loading state false in getOneProductError action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ONE_PRODUCT_ERROR,
    });
    expect(nextState.oneProductLoading).toEqual(false);
  });

  it('8) should set the loading state true in addProduct action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.ADD_PRODUCT,
    });
    expect(nextState.loading).toEqual(true);
  });

  it('9) should set the loading state false in addProductSuccess action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.ADD_PRODUCT_SUCCESS,
    });
    expect(nextState.loading).toEqual(false);
  });

  it('10) should set the loading state false in addProductError action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.ADD_PRODUCT_ERROR,
    });
    expect(nextState.loading).toEqual(false);
  });

  it('11) should update the oneProduct state in updateProductSuccess action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.UPDATE_PRODUCT_SUCCESS,
      data: mockDataUpdatedProduct,
    });
    expect(nextState.oneProduct).toEqual(mockDataUpdatedProduct.result);
  });
});
