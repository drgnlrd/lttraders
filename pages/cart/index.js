import { commerce } from '../../lib/commerce';
import {
    Box, 
    Flex, 
    Table, 
    Thead, 
    Tbody, 
    Tfoot, 
    Tr, 
    Th, 
    Td,
    useColorModeValue,
    IconButton,
    Icon,
    Spinner,
    Image,
    Text,
    HStack,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Container,
    Img,
    Stack,
    Alert,
    AlertIcon,
    chakra,
    Skeleton
} from '@chakra-ui/react';

import { BiTrash } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';




const Cart = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isClearing, setIsClearing] = useState(false);
    const [quantity, setQuantity] = useState(Number);
    const [productId, setProductId] = useState('');
    const [cart, setCart] = useState();
    const router = useRouter();

    useEffect(async () => {
        await commerce.cart.retrieve().then((res)=>{
            setCart(res);
        })
        console.log(window.localStorage.getItem('commercejs_cart_id'));
    }, []);

    const deleteItem= async (id)=>{
        setIsLoading(true);
        await commerce.cart.remove(id).then((res)=>{
            setIsLoading(false);
            router.reload();
        })
    }

    const updateItem = async () => {

        let qty = quantity;
        let prodId = productId;

        setIsUpdating(true);
        await commerce.cart.update(prodId,{quantity: qty}).then((res)=>{
            console.log(res);
            router.reload();
            setIsUpdating(false);
        })
    }

    const clearCart = async () =>{
        setIsClearing(true);
        await commerce.cart.empty().then((res)=>{
            router.reload();
            setIsClearing(false);
        })
    }

    const handleChange=(e, id)=>{
        setQuantity(e);
        setProductId(id);
        setIsDisabled(false);
    }

    return(
        <Box mt={30}>
            {/* {cart.line_items.length > 0 ? (
                <>
                    <Flex
                    w="full"
                    p={20}
                    alignItems="center"
                    justifyContent="center">
                        <Table variant="simple" >
                            <Thead bg={useColorModeValue('gray.300', 'gray.600')} >
                                <Tr>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th>Product</Th>
                                    <Th isNumeric >Price</Th>
                                    <Th>Quantity</Th>
                                    <Th isNumeric >Total</Th>
                                </Tr> 
                            </Thead>
                            <Tbody>
                                {cart.line_items.map((item)=>(
                                    <Tr key={item.id} >
                                        <Th>
                                            <IconButton
                                                icon={isLoading === true ? <Spinner /> : <Icon as={BiTrash} w={6} h={6} />}
                                                onClick={deleteItem(item.id)}
                                            />
                                        </Th>
                                        <Th>
                                            <Box p={10} >
                                                <Image src={`${item.media.source}`} w={'70px'} h={'auto'} />
                                            </Box>
                                        </Th>
                                        <Th>
                                            <Flex alignItems={'center'} justifyContent={'center'} >
                                                <Text fontWeight={'500'} >{item.name}</Text>
                                            </Flex>
                                        </Th>
                                        <Th isNumeric >
                                            <Text>{item.price.formatted_with_symbol}</Text>
                                        </Th>
                                        <Th>
                                            <HStack maxW="120px">
                                                <NumberInput defaultValue={item.quantity} min={1} onChange={(e)=>{handleChange(e, item.id)}}>
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                                <Button w={'10px'} onClick={updateItem} colorScheme={useColorModeValue('teal','pink')} isDisabled={isDisabled === true ? true : false } >Update</Button>
                                            </HStack>
                                        </Th>
                                        <Th isNumeric >
                                            <Text>{item.line_total.formatted_with_symbol}</Text>
                                        </Th>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Flex>
                </>
            ) : (
                <>
                    <Text size={'2xl'} >Your Cart Is Empty</Text>
                </>
            ) }
             */}
            
            <Flex
                w="full"
                pt={30}
                p={{base:0, md: 20}}
                alignItems="center"
                justifyContent="center">
                <Container maxW={'container.xl'} >
                    {cart && cart.line_items < 1 ? (
                        <>
                            <Alert status="warning" mb={10}>
                                <AlertIcon />
                                Your Cart is Empty! Go To the&nbsp;<chakra.a href={'/products'} textDecoration={'underline'} >Shop</chakra.a>&nbsp;Now to add products to your Cart.
                            </Alert>
                        </>
                    ) : (<></>)}
                    <Box overflowX={'auto'}>
                        <Table variant="simple" >
                            <Thead bg={useColorModeValue('gray.300', 'gray.600')} >
                                <Tr>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th>Product</Th>
                                    <Th isNumeric >Price</Th>
                                    <Th>Quantity</Th>
                                    <Th isNumeric >Total</Th>
                                </Tr> 
                            </Thead>
                            <Tbody>
                                {cart ? cart.line_items.map((item)=>{
                                    return(
                                        <Tr key={item.id} >
                                            <Td>
                                            <IconButton
                                                    icon={isLoading === true ? <Spinner /> : <Icon as={BiTrash} w={6} h={6} />}
                                                    onClick={()=>{deleteItem(item.id)}}

                                                />
                                            </Td>
                                            <Td>
                                                <Img src={`${item.media.source}`} w={'100%'} maxW={['30vw','10vw']}  h={'auto'} />
                                            </Td>
                                            <Td>
                                                {item.name}
                                            </Td>
                                            <Td isNumeric >
                                                {item.price.formatted_with_symbol}
                                            </Td>
                                            <Td isNumeric >
                                                <NumberInput defaultValue={item.quantity} min={1} onChange={(e)=>{handleChange(e, item.id)}} maxW={'130px'} >
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Td>
                                            <Td isNumeric >
                                                {item.line_total.formatted_with_symbol}
                                            </Td>
                                        </Tr>
                                    )
                                }):(
                                <>
                                    <Tr>
                                        <Td>
                                            <Stack>
                                                <Skeleton h={'15px'} />
                                                <Skeleton h={'15px'} />
                                            </Stack>
                                        </Td>
                                        <Td>
                                            <Stack>
                                                <Skeleton h={'15px'} />
                                                <Skeleton h={'15px'} />
                                            </Stack>
                                        </Td>
                                        <Td>
                                            <Stack>
                                                <Skeleton h={'15px'} />
                                                <Skeleton h={'15px'} />
                                            </Stack>
                                        </Td>
                                        <Td>
                                            <Stack>
                                                <Skeleton h={'15px'} />
                                                <Skeleton h={'15px'} />
                                            </Stack>
                                        </Td>
                                        <Td>
                                            <Stack>
                                                <Skeleton h={'15px'} />
                                                <Skeleton h={'15px'} />
                                            </Stack>
                                        </Td>
                                        <Td>
                                            <Stack>
                                                <Skeleton h={'15px'} />
                                                <Skeleton h={'15px'} />
                                            </Stack>
                                        </Td>
                                    </Tr>
                                    
                                    
                                </>)}
                            </Tbody>
                        </Table>
                    </Box>
                    <Flex alignItems={'flex-end'} direction={'column'} mt={3} >
                        <HStack>
                            <Button
                                bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.400)')} 
                                _hover={{
                                    bgGradient: useColorModeValue('linear(to-r, teal.500,green.500)','linear(to-r, red.500,pink.500)')
                                }}
                                color={'white'}
                                isDisabled={isDisabled===true?true:false}
                                isLoading={isUpdating===true?true:false}
                                onClick={()=>{updateItem()}}
                                >
                                Update
                            </Button>
                            <Button
                                bgGradient={useColorModeValue('linear(to-r, red.400,pink.400)','linear(to-r, teal.400,green.400)')} 
                                _hover={{
                                    bgGradient: useColorModeValue('linear(to-r, red.500,pink.500)','linear(to-r, teal.500,green.500)')
                                }}
                                color={'white'}
                                isLoading={isClearing===true?true:false}
                                onClick={()=>{clearCart()}}
                                >
                                Clear Cart
                            </Button>
                        </HStack>
                        
                    </Flex>
                    <Stack direction={{base: 'column', md: 'row-reverse'}} gap={3}>
                        <Box w="full" maxW="lg" mt={10} >
                            <Table variant="simple" >
                                <Tbody>
                                    <Th bg={useColorModeValue('gray.300', 'gray.600')} >SubTotal</Th>
                                    <Td>{cart ? cart.subtotal.formatted_with_symbol : "" }</Td>
                                </Tbody>
                                <Tbody>
                                    <Th bg={useColorModeValue('gray.300', 'gray.600')} >Total</Th>
                                    <Td fontWeight={'500'} >{cart ? cart.subtotal.formatted_with_symbol : ""}</Td>
                                </Tbody>
                            </Table>
                        </Box>
                    </Stack>
                    <Flex alignItems={'flex-end'} direction={'column'} mt={3} >
                            <Button
                                as={'a'}
                                bg={useColorModeValue('teal.400','red.400')} 
                                _hover={{
                                    bg: useColorModeValue('teal.600','red.600')
                                }}
                                href={'/checkout'}
                                >
                                Proceed To Checkout
                            </Button>
                    </Flex>
                </Container>
                
            </Flex>
            
        </Box>
    )
}

Cart.layout = 'default';

export default Cart;

