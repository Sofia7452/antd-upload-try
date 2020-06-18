import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from 'antd'
import ConfirmModalContent from './modal'
const BigTab = ()=>{
  const onConfirmClick = () => {
    console.log('onConfirmClick')
  }
  const onCancelClick = () => {
    console.log('onCancelClick')
  }
  
  const modalClick =()=>{
    <ConfirmModalContent  
      text={'当前合约未保存至云端，确认关闭吗？'} 
      onConfirmClick={onConfirmClick} 
      onCancelClick={onCancelClick}>
    </ConfirmModalContent>
  }
  return(
    <button onClick={modalClick}>确认</button>
  )
}
export default BigTab