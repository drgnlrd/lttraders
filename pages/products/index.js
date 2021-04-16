import { Box, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import { commerce } from '../../lib/commerce';
import ProductCard from '../../components/ProductCard';
import { useState } from 'react';

export async function getStaticProps(){
    const { data: products } = await commerce.products.list();

    return{
        props:{
            products,
        },
    };
};

const Products = ({products}) => {

    const [productId, setproductId] = useState('');

    return(
        <Box >
            <Container maxW={'container.xl'} >
                <Heading textAlign={'center'} as={'h1'} size={'3xl'} py={'40px'} >
                    Products
                </Heading>
                <Grid templateColumns={['repeat(1, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)']} gap={5} >
                    {products.map((product)=>(
                        
                        <GridItem key={product.id} mt={'50px'} >
                            <ProductCard product={product} />
                        </GridItem>
                        
                    ))}
                </Grid>  
            </Container>
        </Box>
    )
}

Products.layout = 'default';

export default Products;