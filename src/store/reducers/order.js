import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => updateObject(state, { purchased: false });
const purchaseBurgerStart = (state, action) => updateObject(state, { loading: true });
const  purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
};
const purchaseBurgerFailed = (state, action) =>  updateObject(state, { loading: false });
const purchaseFetchOrdersStart = (state, action) =>  updateObject(state, { loading: true });
const fetchOrdersSuccess = (state, action) => updateObject(state, { orders: action.orders, loading: false });
const fetchOrdersFailed = (state, action) => updateObject( state, { loading: false });

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case (actionTypes.PURCHASE_INIT): return purchaseInit(state, action);
    case (actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state, action);
    case (actionTypes.PURCHASE_BURGER_SUCCESS): return purchaseBurgerSuccess(state, action);
    case (actionTypes.PURCHASE_BURGER_FAILED): return purchaseBurgerFailed(state, action);
    case (actionTypes.FETCH_ORDERS_START): return purchaseFetchOrdersStart(action, state);
    case (actionTypes.FETCH_ORDERS_SUCCESS): return fetchOrdersSuccess(state, action);
    case (actionTypes.FETCH_ORDERS_FAILED): return fetchOrdersFailed(state, action);
    default: return state;
  }
};

export default reducer;