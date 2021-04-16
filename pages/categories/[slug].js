import { commerce } from '../../lib/commerce';
import ProductCard from '../../components/ProductCard';
import { Box, Heading, Container, Grid, GridItem } from '@chakra-ui/react';

export async function getStaticProps({ params }){
    const { slug } = params;

    const category = await commerce.categories.retrieve(slug, {
        type: "slug"
    })

    const { data: products } = await commerce.products.list({
        category_slug: [slug],
    });

    return{
        props:{
            category,
            products,
        }
    }
}


export async function getStaticPaths() {
    const { data: categories } = await commerce.categories.list();
  
    return {
        paths: categories.map((category) => ({
            params: {
                slug: category.slug,
            },
        })),
        fallback: false,
    };
}

const CategoryPage = ({ category, products}) => {
    return(
        <Box >
            <Container maxW={'container.xl'} >
                <Heading textAlign={'center'} as={'h1'} size={'3xl'} py={'40px'} >
                    {category.name}
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

CategoryPage.layout = 'default';

export default CategoryPage;