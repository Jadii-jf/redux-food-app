import { createStore } from "redux";
import { combineReducers } from "redux";
import axios from 'axios'
import {useEffect} from 'react'
import { Reducer } from "./reducer/reducer";
import { actArea, actCategory, funcCategory } from "./action/action";
import { applyMiddleware } from "./reducer/reducer";
const thunkMiddleware = require('redux-thunk').default


export const store =createStore(Reducer,applyMiddleware(thunkMiddleware));