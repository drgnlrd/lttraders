import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../components/design';
import LayoutWrapper from '../layouts/layout-wrapper';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

// const config = {
//     initialColorMode: "light",
//     useSystemColorMode: false,
//   }

// const theme = extendTheme({ config });

const stripePromise = loadStripe('pk_test_xKKLGnVyhPq9KEJXO0X9zAu200A4MGxV7w');


function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider theme={theme} >
      <LayoutWrapper {...pageProps}>
        <Elements stripe={stripePromise} >
          <Component {...pageProps} />
        </Elements>
      </LayoutWrapper>
    </ChakraProvider>
    
  ) 
}

export default MyApp
