import React from 'react';
import ReactDOM from 'react-dom';
import T from 'i18n-react';
import './database/init';
//
import RU from './texts/RU';
import Root from './Root';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss'
import '../scss/core/_dropdown-menu-right.scss'

T.setTexts(RU);

ReactDOM.render((
    <Root/>
), document.getElementById('root'));
