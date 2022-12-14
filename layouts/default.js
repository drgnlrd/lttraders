import Head from 'next/head';
import WithSubnavigation from '../components/Nav';
import SmallFooter from '../components/Footer';
import { Box, Container } from '@chakra-ui/react';


// export async function getStaticProps(){

//     const cartId = "cart_zoBRmKLAQLREbo";
//     const cart = await commerce.cart.retrieve(cartId);

//     return{
//         props:{
//             cart,
//         },
//     };
// }

const DefaultLayout = (props,{user, setUser}) => {

    return(
    <>
        <Head>
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
            <meta name='description' content='LT Traders Ecommerce Website' />
            <title>LT Traders</title>
            <meta charset="utf-8" />
            <link rel="manifest" href="/manifest.json" />
            <link href='/favicon.ico' rel='icon' type='image/png' sizes='16x16' />
            <link href='/favicon.ico' rel='icon' type='image/png' sizes='32x32' />
            <link rel="apple-touch-icon" href="/apple-icon.png"></link>
            <meta name="theme-color" content="#94DDDE"/>
        </Head>
        
        <WithSubnavigation cart={props.cart} setUser={setUser} user={user} />
        <Box minH={'70vh'} marginTop={'70px'} marginBottom={'30px'}>
            {props.children}
        </Box>
        <SmallFooter />
    </>
)};

export default DefaultLayout;