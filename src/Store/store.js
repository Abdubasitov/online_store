import { configureStore } from '@reduxjs/toolkit';
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import products from './redusers/products/products'
import userReducer from './redusers/user/user'
import favorites from './redusers/favorites/favorites'
import cart from './redusers/cart/cart'
import gadgets from './redusers/products/gadgets';
import cloth from './redusers/products/cloth';
import home from './redusers/products/home';
import beatiful from './redusers/products/beatiful';
import toys from './redusers/products/toys';
import OnePage from './redusers/oneproduct/oneProduct'
import { saveOrder } from './redusers/order/order';


const rememberedKeys = ['products', 'user']

const store = configureStore({
  reducer: rememberReducer({
    products,
    user: userReducer,
    favorites,
    cart,
    gadgets,
    cloth,
    home,
    beatiful,
    toys,
    OnePage,
    saveOrder,
  }),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
    rememberEnhancer(
      window.localStorage, // or window.sessionStorage, or your own custom storage driver
      rememberedKeys
    )
  )
});

export default store;
