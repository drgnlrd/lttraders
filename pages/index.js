import { Box, useColorModeValue, Button, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import SplitScreen from '../components/Hero';
import { commerce } from '../lib/commerce';
import HomeProduct from '../components/HomeProduct';
import HomeContact from '../components/HomeContact';
import {useEffect, useState} from 'react';

export async function getStaticProps(){

    const merchant = await commerce.merchants.about();
    const { data: products } = await commerce.products.list();
    // const cart = await commerce.cart.refresh();
    return {
        props: {
            merchant,
            products,
        },
    }
}


const Home = ({ merchant, products, categories}) => {

        useEffect(()=>{
            console.log("Products",products);
            console.log("Merchant",merchant);
            console.log("Categories",categories);
        })

        return(
            <Box>
                <SplitScreen />
                <Box pt={'20px'} w={'100%'} bg={useColorModeValue('gray.200','gray.700')} >
                    <Container maxW={'container.xl'} >
                        <Heading textAlign={'center'} as={'h1'} size={'xl'} mb={'20px'} >Featured Products</Heading>
                        <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)']} gap={5} >
                            {products.slice(0, 2).map((product)=>{
                                return(
                                    <GridItem key={product.id} >
                                        <HomeProduct product={product} />
                                    </GridItem>
                                )    
                            })}
                        </Grid>  
                    </Container>
                </Box>
                <Box>
                    <HomeContact />
                </Box>
                
                
                
                {/* <ProductListing products={products} /> */}
                {/* <p>Hello World</p> */}
                {/* <h1>Merchant:</h1>
                <pre>{JSON.stringify(merchant, null, 2)}</pre>
                <h1>Products:</h1>
                <pre>{JSON.stringify(products, null, 2)}</pre> */}
            </Box>
        )
    
}

Home.layout = 'default'

export default Home;