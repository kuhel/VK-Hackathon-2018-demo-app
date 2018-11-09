import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import './main.css';


// Init VK App
connect.send('VKWebAppInit', {});

ReactDOM.render(<h1 style={{textAlign: 'center'}}>Hello world!</h1>, document.getElementById('root'));
