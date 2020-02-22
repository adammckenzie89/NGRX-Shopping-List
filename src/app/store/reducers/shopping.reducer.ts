import { ShoppingActionTypes, ShoppingAction } from '../actions/shopping.actions';
import { ShoppingItem } from '../models/shopping-item.model';

const initialState: Array<ShoppingItem> = [];

export function ShoppingReducer(state: Array<ShoppingItem> = initialState, action: ShoppingAction) {
  switch (action.type) {
    case ShoppingActionTypes.ADD_ITEM:
      console.log(action.type);
      return [...state, action.payload];

    case ShoppingActionTypes.REMOVE_ITEM:
      console.log(action.type, action.payload);
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
}
