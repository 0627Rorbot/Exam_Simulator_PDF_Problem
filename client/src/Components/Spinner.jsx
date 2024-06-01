import React from "react";
import { Spinner, AbsoluteCenter, ModalOverlay } from '@chakra-ui/react'
import "./style.css"

const BSpinner = () => {
  return (
    <div position='relative' className="spinner">
      <AbsoluteCenter p='4' color='white' axis='both'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </AbsoluteCenter>
    </div>
  )
}

export default BSpinner;