import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese:0.4,
  meat: 1.5,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
  };
  const updatedState = {
    ingredients: updateObject(state.ingredients, updatedIngredient),
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
  };
  const updatedSt = {
    ingredients: updateObject(state.ingredients, updatedIng),
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
    building: true
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    totalPrice: 4,
    ingredients: action.payload.ingredients,
    error: false,
    building: false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {
    totalPrice: 4,
    ingredients: action.payload.ingredients,
    error: false
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
};

export default reducer;
