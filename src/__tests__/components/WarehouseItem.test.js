import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { fireEvent } from '@testing-library/react';
import ProductItem from '../../views/managerPages/Products/components/ProductItem';

let container = null;
const mockStore = configureStore([]);
let store;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
  store = mockStore({});
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const product = {
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
};

describe('should render correctly', () => {
  it('renders nothing when no product details has passed as props', () => {
    act(() => {
      render(
        <Provider store={store}>
          <ProductItem />
        </Provider>,
        container
      );
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
  });
  it('renders correctly when product details has passed as props', () => {
    act(() => {
      render(
        <Provider store={store}>
          <ProductItem
            productId={product._id}
            name={product.name}
            categoryName={product.categoryId.name}
            unitPrice={product.unitPrice}
            photoURL={product.photo}
            description={product.description}
          />{' '}
        </Provider>,
        container
      );
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"MuiPaper-root MuiCard-root makeStyles-root-9 MuiPaper-elevation1 MuiPaper-rounded\\"><img class=\\"MuiCardMedia-root makeStyles-media-12 MuiCardMedia-media MuiCardMedia-img\\" src=\\"photo\\" id=\\"photo\\" alt=\\"Product Image\\" title=\\"Product Image\\">
        <hr class=\\"MuiDivider-root\\">
        <hr class=\\"MuiDivider-root\\">
        <div class=\\"MuiCardContent-root\\">
          <p class=\\"MuiTypography-root makeStyles-name-10 MuiTypography-body1\\" id=\\"product_name\\">Maari Biscuit</p>
          <p class=\\"MuiTypography-root makeStyles-categoryName-11 MuiTypography-body1 MuiTypography-colorTextSecondary MuiTypography-gutterBottom\\" id=\\"category_name\\">Biscuit</p>
        </div>
        <div class=\\"MuiCardContent-root\\">
          <div class=\\"MuiChip-root makeStyles-priceTag-13 MuiChip-sizeSmall\\" id=\\"unitPrice\\"><span class=\\"MuiChip-label MuiChip-labelSmall\\">RS 120</span></div>
        </div>
        <div class=\\"MuiCardActions-root MuiCardActions-spacing\\"><button class=\\"MuiButtonBase-root MuiButton-root MuiButton-text makeStyles-button-14 MuiButton-textSizeSmall MuiButton-sizeSmall\\" tabindex=\\"0\\" type=\\"button\\" id=\\"detailsButton\\"><span class=\\"MuiButton-label\\">Details</span><span class=\\"MuiTouchRipple-root\\"></span></button><svg class=\\"MuiSvgIcon-root makeStyles-edit-15 MuiSvgIcon-colorAction\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\">
            <path d=\\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\\"></path>
          </svg><svg class=\\"MuiSvgIcon-root makeStyles-delete-16 MuiSvgIcon-colorAction\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\">
            <path d=\\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\\"></path>
          </svg></div>
      </div>
      <div></div>"
    `);
  });
});

describe('should render the correct values which have been passed', () => {
  it('should have correct product name', () => {
    act(() => {
      render(
        <Provider store={store}>
          <ProductItem
            productId={product._id}
            name={product.name}
            categoryName={product.categoryId.name}
            unitPrice={product.unitPrice}
            photoURL={product.photo}
            description={product.description}
          />
        </Provider>,
        container
      );
    });
    expect(container.querySelector('#product_name').textContent).toBe(
      `${product.name}`
    );
  });
  it('should have correct category name', () => {
    act(() => {
      render(
        <Provider store={store}>
          <ProductItem
            productId={product._id}
            name={product.name}
            categoryName={product.categoryId.name}
            unitPrice={product.unitPrice}
            photoURL={product.photo}
            description={product.description}
          />
        </Provider>,
        container
      );
    });
    expect(container.querySelector('#category_name').textContent).toBe(
      `${product.categoryId.name}`
    );
  });
  it('should have correct unit price', () => {
    act(() => {
      render(
        <Provider store={store}>
          <ProductItem
            productId={product._id}
            name={product.name}
            categoryName={product.categoryId.name}
            unitPrice={product.unitPrice}
            photoURL={product.photo}
            description={product.description}
          />
        </Provider>,
        container
      );
    });
    expect(container.querySelector('#unitPrice').textContent).toBe(
      `RS ${product.unitPrice}`
    );
  });
});
