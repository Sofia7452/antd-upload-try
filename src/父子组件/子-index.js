import React from 'react';
import ReactDOM from 'react-dom';
class Son extends React.Component {
  componentDidMount(){
    console.log('Son-didMount')
  }
  componentWillUnmount(){
    console.log('Son-willUnmount')
  }
  render(){

    console.log('Son-render')
    return(
      <>
      <div style={{color:'green'}}>儿子</div>
      <a href="https://www.baidu.com/" target='_self'>百度</a>
      </>
    )
    
  }
}
export default Son