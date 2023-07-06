import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import IngredientDetails from '../ingredientDetails/ingredientDetails'
import OrderDetails from '../orderDetails/orderDetails'


const modalRoot = document.querySelector('#react-modal')

function Modal({cardData, currentModal, closeModal}) {

  console.log(currentModal)
  useEffect(() => {
    const closeOnEsc = (evt) => {
      if (evt.code === "Escape") {
        closeModal()
      }
    }

    document.addEventListener('keydown', closeOnEsc)

    return () => document.removeEventListener('keydown', closeOnEsc)
  }, [])


  return ReactDOM.createPortal (
    (    
      <>

        {currentModal === 'IngredientDetails' && (
          <IngredientDetails onClick={closeModal} cardData={cardData} />
        )}

        {currentModal === 'OrderDetails' && (
          <OrderDetails onClick={closeModal} cardData={cardData} />
        )}
      </>

    ), modalRoot
  )
}




Modal.propTypes = {
  cardData: PropTypes.object,
  closeModal: PropTypes.func,
  currentModal: PropTypes.string
}


export default Modal 




