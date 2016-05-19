import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Index from './components/index'

// Import Application styles
import Styles from './styles/main.less'

let rootElement = document.getElementById( 'content' )

render(	<Index />, rootElement )
