import {
    Box,
    Center,
    Button,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    useToast,
} from '@chakra-ui/react';

import { commerce } from '../lib/commerce';

import { useState } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/router';

const IMAGE =   'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';


export default function ProductCard({ product }){

    const productId = product.id;
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isPushing, setIsPushing] = useState(false);
    const router = useRouter();

    const addToCart = async () =>{
        setIsLoading(true);
        await commerce.cart.add(productId, 1).then((res)=>{
            console.log(res);
            setIsLoading(false);
            toast({
                title: 'Product Added.',
                description: 'The Product has been added. Go to cart for checkout.',
                position: 'top',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        })
    }

    const buyNow = async () => {
        setIsPushing(true);
        await commerce.cart.add(productId, 1).then((res)=>{
            console.log(res);
            setIsPushing(false);
            router.push('/cart');
        })
    }

    return(
        <Box
            role={'group'}
            p={6}
            maxW={'350px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'xl'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    borderRadius: '10px',
                    top: 0,
                    left: 0,
                    background: useColorModeValue('gray.500', 'gray.500'),
                    filter: 'blur(0px)',
                    border: '1px solid gray',
                    boxShadow: 'md',
                    zIndex: -1,
                }}
                _groupHover={{
                    _after: {
                        filter: 'blur(15px)',
                        top: 3,
                    },
                }}>
                    <Link href={`/products/${product.permalink}`} >
                        <Image 
                            rounded={'lg'}
                            height={230}
                            width={302}
                            objectFit={'cover'}
                            src={`${product.image.url}`}
                            cursor={'pointer'}
                        />
                    </Link>

            </Box>
            <Stack pt={10} align={'center'} >
                <Text color={'gray.500'} as={'span'} fontSize={'sm'} textTransform={'uppercase'} >
                    {product.categories.map(cat=>(
                        cat.name
                    ))}
                </Text>
                <Heading fontSize={'1xl'} as={'span'} fontFamily={'body'} fontWeight={500}>
                    <Link href={`/products/${product.permalink}`}>
                        {product.name}
                    </Link>
                </Heading>
                <Stack direction={'row'} align={'center'}>
                    <Text as={'span'} fontWeight={800} fontSize={'xl'} >
                        {product.price.formatted_with_symbol}
                    </Text>
                </Stack>
                <Stack direction={{base: 'row', md: 'row'}} align={'center'}>
                        <Button  
                            bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.400)')}
                            color={'white'}
                            _hover={{
                                bgGradient: useColorModeValue('linear(to-r, teal.500,green.500)','linear(to-r, red.500,pink.500)'),
                            }}
                            onClick={addToCart}
                            isLoading={isLoading === true ? true : false}>
                            Add To Cart
                        </Button>
                        <Button 
                            onClick={buyNow}
                            isLoading={isPushing === true ? true : false}  
                        >
                            Buy Now
                        </Button>
                </Stack>
            </Stack>
        </Box>
    )
}