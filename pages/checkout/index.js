import { 
    Box, 
    SimpleGrid, 
    GridItem, 
    Heading, 
    Text, 
    chakra, 
    Stack, 
    FormControl, 
    FormLabel, 
    Input, 
    Select, 
    Button, 
    useColorModeValue,
    Container,
    Table, 
    Thead, 
    Tbody, 
    Tfoot, 
    Tr, 
    Th, 
    Td,
    Skeleton
} from '@chakra-ui/react';

import { useRouter } from 'next/router';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { commerce } from '../../lib/commerce';
import { useEffect, useState } from 'react';


const initialFormData = Object.freeze({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    town_city: "",
    county_state: "",
    postal_zip_code: "",
    country: "",
})

const CheckoutPage = () =>{

    const [checkout, setCheckout] = useState();
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [formData, updateFormData] = useState(initialFormData);
    const [shipOption, setShipOption] = useState();
    const [cart, setCart] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    

    useEffect(async () => {
      await commerce.cart.retrieve().then(async (fetchedCart)=>{
        setCart(fetchedCart);
        console.log(cart);
        await commerce.checkout.generateTokenFrom('cart', fetchedCart.id).then(async (res)=>{
          console.log(res);
          setCheckout(res);
          await commerce.checkout.getShippingOptions(res.id,{
            country: 'IN',
          }).then((options)=>{
            console.log('[Shipping Options]',options);
            setShipOption(options);
            setShowSkeleton(false);
            
          })
        })
      })
        
      
    }, [])

        

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsProcessing(true);
        if(!stripe || !elements) {
          setIsProcessing(false);
          return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type:'card',
          card: cardElement,
        });

        if(error){
          console.log('[error]',error);
        }
        else{
          console.log('[PaymentMethod]', paymentMethod);
        }

        console.log('formData:', formData);

        
          await commerce.checkout.capture(checkout.id,{
            customer:{
              firstname: formData.firstname,
              lastname: formData.lastname,
              email: formData.email,
            },
            shipping:{
              name: `${formData.firstname} ${formData.lastname}`,
              street: formData.street,
              town_city: formData.town_city,
              county_state: formData.county_state,
              postal_zip_code: formData.postal_zip_code,
              country: formData.country,
            },
            fulfillment:{
              shipping_method: 'ship_RqEv5xWkkoZz4j',
            },
            payment: {
              // gateway: 'stripe',
              // stripe: {
              //   payment_method_id: paymentMethod.id,
              // },
              gateway: 'test_gateway',
              card: {
                number: '4242424242424242',
                expiry_month: '02',
                expiry_year: '24',
                cvc: '123',
                postal_zip_code: formData.postal_zip_code,
              },
            },
          }).then(async (res) => {
               await commerce.cart.refresh();
               router.push(`/order-complete`);
               setIsProcessing(false);
          }) .catch(err => {
               window.alert(err.data.error.message);
               setIsProcessing(false);
          });   

    }

    return(
        <Box mt={['70px', '70px', '70px']} pt={'30px'}>
        <Container maxW={'container.xl'} >
        {showSkeleton === true ? (
            <Stack mt={[5, 5, 5]} >
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
            </Stack>
        ) : (
            <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Shipping Information
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Use a permanent address where you can receive your package.
              </Text>
            </Box>
            <chakra.form
              action="#"
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
                mt={'10px'}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      First name
                    </FormLabel>
                    <Input
                      type="text"
                      name="firstname"
                      id="firstname"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={(e)=>{handleChange(e)}}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Last name
                    </FormLabel>
                    <Input
                      type="text"
                      name="lastname"
                      id="lastname"
                      autoComplete="family-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={(e)=>{handleChange(e)}}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      for="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Email address
                    </FormLabel>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={(e)=>{handleChange(e)}}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      for="country"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Country / Region
                    </FormLabel>
                    <Select
                      id="country"
                      name="country"
                      autoComplete="country"
                      placeholder="Select option"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={(e)=>{handleChange(e)}}
                    >
                    <option value="IN">India</option>
                      
                    </Select>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      for="street_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Street address
                    </FormLabel>
                    <Input
                      type="text"
                      name="street"
                      id="street"
                      autoComplete="street-address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={(e)=>{handleChange(e)}}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                    <FormLabel
                      for="city"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      City
                    </FormLabel>
                    <Input
                      type="text"
                      name="town_city"
                      id="town_city"
                      autoComplete="city"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={(e)=>{handleChange(e)}}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                    <FormLabel
                      for="state"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      State / Province
                    </FormLabel>
                    <Select
                      id="county_state"
                      name="county_state"
                      autoComplete="state"
                      placeholder="Select option"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={(e)=>{handleChange(e)}}
                    >
                      <option value="AN">Andaman and Nicobar Islands</option>
                      <option value="AP">Andhra Pradesh</option>
                      <option value="AR">Arunāchal Pradesh</option>
                      <option value="AS">Assam</option>
                      <option value="BR">Bihār</option>
                      <option value="CH">Chandigarh</option>
                      <option value="CT">Chhattīsgarh</option>
                      <option value="DL">Delhi</option>
                      <option value="DH">Dādra and Nagar Haveli and Damān and Diu</option>
                      <option value="GA">Goa</option>
                      <option value="GJ">Gujarāt</option>
                      <option value="HR">Haryāna</option>
                      <option value="HP">Himāchal Pradesh</option>
                      <option value="JK">Jammu and Kashmīr</option>
                      <option value="JH">Jhārkhand</option>
                      <option value="KA">Karnātaka</option>
                      <option value="KL">Kerala</option>
                      <option value="LA">Ladākh</option>
                      <option value="LD">Lakshadweep</option>
                      <option value="MP">Madhya Pradesh</option>
                      <option value="MH">Mahārāshtra</option>
                      <option value="MN">Manipur</option>
                      <option value="ML">Meghālaya</option>
                      <option value="MZ">Mizoram</option>
                      <option value="NL">Nāgāland</option>
                      <option value="OR">Odisha</option>
                      <option value="PY">Puducherry</option>
                      <option value="PB">Punjab</option>
                      <option value="RJ">Rājasthān</option>
                      <option value="SK">Sikkim</option>
                      <option value="TN">Tamil Nādu</option>
                      <option value="TG">Telangāna</option>
                      <option value="TR">Tripura</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="UT">Uttarākhand</option>
                      <option value="WB">West Bengal</option>
                    </Select> 
                    
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                    <FormLabel
                      for="postal_code"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      ZIP / Postal
                    </FormLabel>
                    <Input
                      type="text"
                      name="postal_zip_code"
                      id="postal_zip_code"
                      autoComplete="postal-code"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={(e)=>{handleChange(e)}}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                        for="card_details"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue("gray.700", "gray.50")}
                        >
                      Credit/Debit Card
                    </FormLabel>
                    <CardElement
                        options={{
                            style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                color: '#aab7c4',
                                },
                                marginTop: '10px',
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                            },
                            hidePostalCode: true,
                        }}
                        />
                  </FormControl>
                </SimpleGrid>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.200", "gray.300")}
                textAlign="right"
              >
                <Button
                  type="submit"
                  bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.400)')}
                  _hover={{
                      bgGradient: useColorModeValue('linear(to-r, teal.500,green.500)','linear(to-r, red.500,pink.500)'),
                      boxShadow: 'md',
                      transition: 'all .2s ease',
                  }}
                  onClick={(e)=>{handleSubmit(e)}}
                  color={'white'}
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                  isLoading={isProcessing == true ? true : false}
                >
                  Place Order
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
          <GridItem colSpan={{ md: 1 }} mt={{base: 10, md: 0}}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Your Order
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Please check through and confirm before ordering.

              </Text>
            </Box>
            <Box pt={'10px'}>
                <Table variant="simple" >
                    <Thead bg={useColorModeValue('gray.300', 'gray.600')}>
                      <Tr>
                        <Th>Product</Th>
                        <Th>Total</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                        {cart.line_items.length > 0 ? (
                            <>
                                {cart.line_items.map((item)=>(
                                    <>
                                        <Tr>
                                            <Td>{item.name}&nbsp;x&nbsp;{item.quantity}</Td>
                                            <Td>{item.line_total.formatted_with_symbol}</Td>
                                        </Tr>
                                    </>
                                ))}
                            </>
                        ) : (
                            <>
                                <Tr>
                                    <Td>Cart is Empty</Td>
                                    <Td></Td>
                                </Tr>
                            </>
                        )}
                        <Tr>
                            <Th bg={useColorModeValue('gray.300', 'gray.600')} >SubTotal</Th>
                            <Td>{cart.subtotal.formatted_with_symbol}</Td>
                        </Tr>
                        <Tr>
                            <Th bg={useColorModeValue('gray.300', 'gray.600')} >Delivery Charges</Th>
                            <Td>&#8377;50.00</Td>
                        </Tr>
                        <Tr>
                            <Th bg={useColorModeValue('gray.300', 'gray.600')} >Total</Th>
                            <Td fontWeight={'500'} >&#8377;{Number(cart.subtotal.raw + 50).toFixed(2)}</Td>
                        </Tr>
                    
                        
                    </Tbody>
                    
                </Table>
            </Box>
            
          </GridItem>
        </SimpleGrid>
        )}
        
        </Container>
      </Box>

    )
}

CheckoutPage.layout = 'default';

export default CheckoutPage;