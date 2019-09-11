import { createStore, applyMiddleware } from 'redux';
// import Thunk from 'redux-thunk';
import thunkMiddleware from "redux-thunk";
import reducers from '../reducers';

export function configureStore() {

    // const store = createStore(
    //     reducers,
    //     initialState,
    //     compose(applyMiddleware(Thunk))
    // );

    let createStoreWithMiddleware = applyMiddleware(thunkMiddleware) (createStore);
    const store = createStoreWithMiddleware(reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
