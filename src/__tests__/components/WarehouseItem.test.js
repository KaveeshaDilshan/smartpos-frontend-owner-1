import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import WarehouseItem from '../../views/managerPages/Warehouse/components/WarehouseItem';

let container = null;
const mockStore = configureStore([]);
let store;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
  store = mockStore({
    dashboardReducer: {
      warehouseID: '123456789',
    },
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const item = {
  _id: '61555b6a7e8f8a491495386d',
  product: {
    archived: false,
    _id: '6150cabef14212175cf8c580',
    name: 'Chocolate biscuit',
    categoryId: '616c2ec3800c141704de18f6',
    unitPrice: 100,
    description: 'This is The chocolate biscuit',
    photo: 'photo',
    __v: 0,
  },
  quantity: 275,
};

describe('should render correctly', () => {
  it('renders nothing when no warehouse product details has passed as props', () => {
    act(() => {
      render(
        <Provider store={store}>
          <WarehouseItem />
        </Provider>,
        container
      );
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
  });
  it('renders correctly when warehouse product details has passed as props', () => {
    act(() => {
      render(
        <Provider store={store}>
          <WarehouseItem
            productId={item.product._id}
            poto={item.product.photo}
            productName={item.product.name}
            unitPrice={item.product.unitPrice}
            count={item.quantity}
          />
        </Provider>,
        container
      );
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"MuiPaper-root MuiCard-root makeStyles-card-4 MuiPaper-elevation1 MuiPaper-rounded\\">
        <div style=\\"display: flex;\\">
          <div><img class=\\"MuiCardMedia-root makeStyles-media-6 MuiCardMedia-media MuiCardMedia-img\\" src=\\"photo\\" id=\\"photo\\" alt=\\"Product Image\\" title=\\"Product Image\\"></div>
          <div style=\\"margin-left: 35px; display: flex; align-items: center; justify-content: space-between; width: 100%;\\">
            <div style=\\"display: flex; align-items: center; justify-content: space-between; font-size: 20px; font-weight: 450; width: 50%;\\">
              <div id=\\"product_name\\">Chocolate biscuit</div>
              <div id=\\"unitPrice\\">Rs 100</div>
            </div>
            <div style=\\"margin-right: 10px; display: flex; align-items: center;\\">
              <div class=\\"MuiFormControl-root MuiTextField-root\\">
                <div class=\\"MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense\\"><input aria-invalid=\\"false\\" id=\\"quantity\\" type=\\"number\\" class=\\"MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense\\" value=\\"275\\">
                  <fieldset aria-hidden=\\"true\\" style=\\"padding-left: 8px;\\" class=\\"PrivateNotchedOutline-root-7 MuiOutlinedInput-notchedOutline\\">
                    <legend class=\\"PrivateNotchedOutline-legend-8\\" style=\\"width: 0.01px;\\"><span>​</span></legend>
                  </fieldset>
                </div>
              </div>
              <div style=\\"display: flex; align-items: center;\\"><svg class=\\"MuiSvgIcon-root makeStyles-SaveIcon-5\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\">
                  <path d=\\"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z\\"></path>
                </svg></div>
            </div>
          </div>
        </div>
      </div>"
    `);
  });
});

describe('should render the correct values which have been passed', () => {
  it('should have correct product name', () => {
    act(() => {
      render(
        <Provider store={store}>
          <WarehouseItem
            productId={item.product._id}
            poto={item.product.photo}
            productName={item.product.name}
            unitPrice={item.product.unitPrice}
            count={item.quantity}
          />
        </Provider>,
        container
      );
    });
    expect(container.querySelector('#product_name').textContent).toBe(
      `${item.product.name}`
    );
  });
  it('should have correct unit price', () => {
    act(() => {
      render(
        <Provider store={store}>
          <WarehouseItem
            productId={item.product._id}
            poto={item.product.photo}
            productName={item.product.name}
            unitPrice={item.product.unitPrice}
            count={item.quantity}
          />
        </Provider>,
        container
      );
    });
    expect(container.querySelector('#unitPrice').textContent).toBe(
      `Rs ${item.product.unitPrice}`
    );
  });

  it('should have correct quantity', () => {
    act(() => {
      render(
        <Provider store={store}>
          <WarehouseItem
            productId={item.product._id}
            poto={item.product.photo}
            productName={item.product.name}
            unitPrice={item.product.unitPrice}
            count={item.quantity}
          />
        </Provider>,
        container
      );
    });
    expect(container.querySelector('#quantity').textContent).toBe(``);
  });
});
