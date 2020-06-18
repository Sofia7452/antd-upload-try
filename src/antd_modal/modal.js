import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'antd'

const ConfirmModalContent = ({ text, onConfirmClick, onCancelClick }) => {
  const close = () => {
    if (onCancelClick) {
      onCancelClick()
    }
    Modal.destroyAll()
  }

  const confirm = () => {
    if (onConfirmClick) {
      onConfirmClick()
    }
    Modal.destroyAll()
  }

  return (
    <div>
      <div>{text}</div>
      <div>
        <Button onClick={close}>取消</Button>
        <Button type="primary" onClick={confirm}>
          确认
        </Button>
      </div>
    </div>
  )
}

ConfirmModalContent.propTypes = {
  onConfirmClick: PropTypes.func,
  onCancelClick: PropTypes.func
}

export default ConfirmModalContent
