import { jsdom } from 'jsdom';

global.document = jsdom(undefined);
global.window = document.defaultView;
global.navigator = global.window.navigator;
