import reducer from '../../views/managerPages/Leaves/redux/leavesReducer';
import * as actions from '../../views/managerPages/Leaves/redux/leavesActionTypes';

const initialState = {
  allLeaves: [],
  loading: false,
};

const mockDataLeaves = {
  totalItems: 1,
  items: [
    {
      approved: 'pending',
      archived: false,
      _id: '6155741abf9c04002adcaf55',
      userId: {
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
      description: 'Family event',
      from: '2021-10-05T00:00:00.000Z',
      to: '2021-10-08T00:00:00.000Z',
      createdAt: '2021-09-30T08:23:54.773Z',
      updatedAt: '2021-09-30T08:23:54.773Z',
      __v: 0,
    },
  ],
};

describe('Check Leaves Reducer Actions', () => {
  it('1) returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('2) should set the loading state true in getLeaves action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_LEAVES,
    });
    expect(nextState.loading).toEqual(true);
  });

  it('3) should set the loading state false and allLeaves array in getLeavesSuccess action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_LEAVES_SUCCESS,
      data: mockDataLeaves,
    });
    expect(nextState.loading).toEqual(false);
    expect(nextState.allLeaves).toEqual(mockDataLeaves.items);
  });

  it('4) should set the loading state false in getLeavesError action', () => {
    const previousState = initialState;
    const nextState = reducer(previousState, {
      type: actions.GET_LEAVES_ERROR,
    });
    expect(nextState.loading).toEqual(false);
  });
});
