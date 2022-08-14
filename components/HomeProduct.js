import { Flex, Box, chakra, useColorModeValue, useColorMode, Link } from '@chakra-ui/react';

const HomeProduct = ({ product }) => {
    return (
        <Flex
          bg={useColorModeValue('gray.200','gray.700')}
          p={[10,50,50]}
          w={['90vw','full','full']}
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            w="sm"
            mx="auto"
          >
            <Box
              bg="gray.300"
              h={64}
              w="full"
              rounded="lg"
              shadow="lg"
              bgSize="cover"
              bgPos="center"
              style={{
                backgroundImage: `url(${product.image.url})`,
              }}
            ></Box>
    
            <Box
              w={{ base: 'full', md: 'full' }}
              bg={useColorModeValue("white", "gray.800")}
              mt={-10}
              shadow="lg"
              rounded="md"
              overflow="hidden"
            >
              <chakra.h3
                py={2}
                textAlign="center"
                fontWeight="bold"
                textTransform="uppercase"
                color={useColorModeValue("gray.800", "white")}
                letterSpacing={1}
              >
              <Link href={`/products/${product.permalink}`} >
                {product.name}
              </Link>
                
              </chakra.h3>
    
              <Flex
                alignItems="center"
                justifyContent="space-between"
                py={2}
                px={3}
                bg={useColorModeValue("gray.400", "gray.600")}
              >
                <chakra.span
                  fontWeight="bold"
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  {product.price.formatted_with_symbol}
                </chakra.span>
                <chakra.button
                  bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.400)')}
                  fontSize="xs"
                  fontWeight="bold"
                  color="white"
                  rounded="lg"
                  px={2}
                  py={1}
                  textTransform="uppercase"
                  _hover={{
                    bgGradient: useColorModeValue('linear(to-r, teal.500,green.500)','linear(to-r, red.500,pink.500)'),
                  }}
                  _focus={{
                    bgGradient: useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.400)'),
                    outline: "none",
                  }}
                  as={'a'}
                  href={`/products/${product.permalink}`}
                >
                  Checkout Product
                </chakra.button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      );
}

export default HomeProduct;