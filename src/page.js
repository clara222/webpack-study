import React,{Component} from 'react'
import ReactDom from 'react-dom'
class App extends Component {
  render () {
    return (
      <div>hello word</div>
    )
  }
}
ReactDom.render(
  <App/>,
  document.getElementById('root')
)