import React from 'react';
import store from "./store";

//Redux 
import { Provider } from 'react-redux';

//import APP intermediate
import AppIntermediate from './AppIntermediate'

export default function App() {

  return (
    <Provider store={store}>
      <AppIntermediate />
    </Provider>


  );
}
