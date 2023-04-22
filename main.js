import './style.css'

import { registerEvents } from './js/registerEvents'


const init = () => {
  const rootElement = document.getElementById('root')
  const fileElements = Array.from(document.getElementsByClassName('file'))
  registerEvents(rootElement, fileElements)
}

if (document.readyState === 'completed') {
  init()
} else {
  window.onload = init
}

