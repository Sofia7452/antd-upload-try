import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getCountAddAction } from '../store/actions/counter';
import { add } from '../store/actions/counter';

// class Son extends Component {
//   render() {
//     return (
//       <>
//         <div>sonComponent</div>
//         <Counter></Counter>
//       </>
//     )
//   }
// }
class Counter extends Component {

  render() {
    console.log('this.props',this.props)
    return (
      <div>
        {this.props.count}
        <button onClick={this.handleClick}>add</button>
      </div>
    )
  }

  handleClick = () => {
    this.props.add(6)
  }
}
//mapStateToProps里面用state.counter...
//实际组件里面用this.props.count取变量
// const mapStateToProps = (state) => ({
//   count: state.counter.count
// })

const mapStateToProps = (state) => {
  // console.log('state', state)
  // console.log('ownProps', ownProps)
  return state.counter
};//reducer里面又一个counter.js文件,里面是一系列纯函数


// const mapDispatchToProps = (dispatch) => ({
//   getCountAddAction: (val) => {
//     dispatch(getCountAddAction(val))
//   }
// })

const mapDispatchToProps = {
  add
}
// const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

 
export default connect(mapStateToProps, mapDispatchToProps)(Counter);