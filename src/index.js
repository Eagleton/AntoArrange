import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Switch,Router,Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import indexRoutes from "./routes/index.jsx";
import {Provider} from 'react-redux';
import getTeacherScheduleInfo from "./pages/Schedule/reducers";
import {createStore, applyMiddleware} from "redux";
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const hist = createBrowserHistory();
const loggerMiddleware = createLogger();
const store = createStore(
    getTeacherScheduleInfo,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
