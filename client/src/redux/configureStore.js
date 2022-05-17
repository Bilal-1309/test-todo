import {applyMiddleware, combineReducers, createStore} from "redux";
import { authReducer } from "./features/auth";
import {todosReducer} from "./features/todo";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger/src";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const combineReducer = combineReducers({ authReducer, todosReducer });

export const store = createStore(
  combineReducer,
  applyMiddleware(thunk, logger)
);

