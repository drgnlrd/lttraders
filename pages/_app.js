import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../components/design';
import LayoutWrapper from '../layouts/layout-wrapper';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import userbase from 'userbase-js';
import { useState, useEffect } from 'react'

// const config = {
//     initialColorMode: "light",
//     useSystemColorMode: false,
//   }

// const theme = extendTheme({ config });

const stripePromise = loadStripe('pk_test_xKKLGnVyhPq9KEJXO0X9zAu200A4MGxV7w');


function MyApp({ Component, pageProps }) {
  const {user, setUser} = useState();

  useEffect(()=>{
    userbase.init({appId: "b2474a30-9252-410e-bfe7-4591ab7dcfca"})
  },[])

  return(
    <ChakraProvider theme={theme} >
      <LayoutWrapper user={user} setUser={setUser} {...pageProps}>
        <Elements stripe={stripePromise} >
          <Component user={user} {...pageProps} />
        </Elements>
      </LayoutWrapper>
    </ChakraProvider>
    
  ) 
}

export default MyApp
