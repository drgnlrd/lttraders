// import Link from 'next/link';
import ProductCard from './ProductCard';
import { Box, Grid, GridItem, Container } from '@chakra-ui/react';

const ProductListing = ({products}) => {

    return(
        <Container maxW={'container.lg'} >
            <Grid templateColumns={['repeat(1, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={3} >
                {products.map((product)=>{
                    <GridItem key={product.id} >
                        <ProductCard product={product} />
                    </GridItem>
                })}
            </Grid>
        </Container>
        
    )

}

export default ProductListing;