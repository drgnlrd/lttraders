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

const stripePromise = loadStripe('pk_test_51LWiVISHI3nKtVvjHQN0Gk1gC35nWltL2f24jWt0hIfCk6bXYN2ceGb2y86mbtDeguTGWWCkMamZOyK3tAF7GX6M00bYVukbyD');


function MyApp({ Component, pageProps }) {
  const {user, setUser} = useState();

  useEffect(()=>{
    userbase.init({appId: "4a9dd000-9770-4942-a4cb-ea66f330c3af"})
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
