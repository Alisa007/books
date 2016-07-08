const table = require('!style!css!sass!../node_modules/react-bootstrap-table/css/react-bootstrap-table.css');
const css  = require('!style!css!sass!./main.scss');

'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import BookPage from './containers/BookPage';
import reducers from './reducers';
import persistState from 'redux-localstorage';


const loggerMiddleware = createLogger();
const store = createStore(
    reducers,
    {
        form: {
            book: {
                title: {
                    value: 'Red hood'
                },
                isbn: {
                    value: 1234567890
                },
                pagesCount: {
                    value: 123
                },
                publisher: {
                    value: 'Wilson Simpson'
                },
                authors: {
                    value: 'Homer Simpson, Red Hood'
                },
                publishedAt: {
                    value: 1999
                },
                printedAt: {
                    value: '2016-07-09'
                }
            }
        }
    },
    compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ),
        persistState(),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

render(
    <Provider store={ store }>
        <BookPage/>
    </Provider>,
    document.querySelector('#main')
);


