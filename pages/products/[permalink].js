import { Flex, Box, SimpleGrid, chakra, Button, Image, useColorModeValue, Text } from '@chakra-ui/react';
import { commerce } from '../../lib/commerce';

export async function getStaticProps({ params }){

    const { permalink } = params;

    const product = await commerce.products.retrieve(permalink, {
        type: 'permalink',
    })


    return{
        props:{
            product,
        },
    };
}

export async function getStaticPaths() {
    const { data: products } = await commerce.products.list();

    return{
        paths: products.map((product) => ({
            params: {
                permalink: product.permalink,
            },
        })),
        fallback: false,
    };
}

const ProductPage = ({ product }) => {
    return (
      <Flex
        bg="gray.600"
        p={5}
        w="full"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          shadow="xl"
          bg={useColorModeValue("white", "gray.800")}
          px={8}
          py={1}
          mx="auto"
          rounded={'md'}
        >
          <SimpleGrid
            alignItems="center"
            columns={{ base: 1, md: 2 }}
            flexDirection="column-reverse"
            spacingY={{ base: 10, md: 32 }}
            spacingX={{ base: 10, md: 24 }}
          >
            <Box
                w="100%"
                h="auto"
                py={{base: 0, md: 20}}
                as={Image}
                src={`${product.media.source}`}
                display={{base: 'block', md: 'none'}}
              ></Box>
            <Box order={{ base: "none", md: 2 }} pb={{base: '20px', md: '0px'}} >
              <chakra.h2
                mb={4}
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign={{ base: "center", md: "left" }}
                color={useColorModeValue("teal.600", "red.400")}
                lineHeight={{ md: "shorter" }}
              >
                {product.name}
              </chakra.h2>
              <chakra.div
                mb={5}
                textAlign={{ base: "center", sm: "left" }}
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize={{ md: "lg" }}
              >
                {product.description}
              </chakra.div>
              <Box mb={5}>
                <Text as={'span'} fontWeight={800} fontSize={'xl'} >
                    {product.price.formatted_with_symbol}
                </Text>
              </Box>
              

              <Button
                w={{ base: "full", sm: "auto" }}
                size="lg"
                bg={useColorModeValue("teal.400", "red.400")}
                _hover={{ bg: useColorModeValue("teal.600", "red.600") }}
                color={'white'}
                as="a"
                href="#"
              >
                Add To Cart
              </Button>
            </Box>
            <Box
              w="90%"
              h="auto"
              py={20}
              as={Image}
              src={`${product.media.source}`}
              display={{base: 'none', md: 'block'}}
            ></Box>
          </SimpleGrid>
        </Box>
      </Flex>
    );
}
  
  
ProductPage.layout = 'default';

export default ProductPage;