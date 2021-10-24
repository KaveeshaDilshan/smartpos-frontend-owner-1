import reducer from '../../views/managerPages/Category/redux/categoryReducer';
import * as actions from '../../views/managerPages/Category/redux/categoryActionTypes';

const initialState = {
  allCategories: null,
  loading: false,
};

const mockDataAllCategories = {
  totalItems: 2,
  items: [
    {
      archived: false,
      _id: '61717e666a900034d8d596e1',
      name: 'Test 1',
      __v: 0,
    },
    {
      archived: false,
      _id: '616c2ec3800c141704de18f6',
      name: 'Test 2',
      __v: 0,
    },
  ],
};

describe('Check Category Reducer Actions', () => {
  it('1) returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('2) should set the loading state true when get categories', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_CATEGORIES,
    });
    expect(nextState.loading).toEqual(true);
  });

  it('3) should set the allCategories state', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_ALL_CATEGORIES_SUCCESS,
      data: mockDataAllCategories,
    });
    expect(nextState.loading).toEqual(false);
    expect(nextState.allCategories).toEqual(mockDataAllCategories.items);
  });

  it('4) should set the loading state true in add category action ', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.ADD_CATEGORY,
    });
    expect(nextState.loading).toEqual(true);
  });

  it('5) should set the loading state true in add category success action ', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.ADD_CATEGORY_SUCCESS,
    });
    expect(nextState.loading).toEqual(false);
  });

  it('6) should set the loading state false in add category error action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.ADD_CATEGORY_ERROR,
    });
    expect(nextState.loading).toEqual(false);
  });
});
