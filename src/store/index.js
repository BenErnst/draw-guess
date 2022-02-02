import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { gameReducer } from "./reducers/gameReducer";
import { playerReducer } from "./reducers/playerReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    gameModule: gameReducer,
    playerModule: playerReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
window.myStore = store;

