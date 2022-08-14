import {Box, Stack, Skeleton, Container, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState();

    const url = new URL(
        "https://api.chec.io/v1/orders"
    );

    useEffect(() => {
        let params = {
            "limit": "10",
        };
        Object.keys(params)
            .forEach(key => url.searchParams.append(key, params[key]));
        
        let headers = {
            "X-Authorization": "sk_test_4599429447c5932cf14ceaf0ab66d7780d69b74fa0cad",
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        
        fetch(url, {
            method: "GET",
            headers: headers,
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                setOrders(json.data);
            });
    }, []);

    return(
        <Box mt={'100px'}>
            <Container maxW={'container.xl'}>
                Data:
                {orders ? (
                    <>
                        <Stack>
                            {orders.map((order)=>{
                                
                                <Box width={'full'} boxShadow="md" key={order.id} >
                                    <Text>Order Id: {order.id}</Text>
                                    <Text fontSize={'xl'} fontWeight={"700"} >{order.order_value.formatted_with_symbol}</Text>
                                </Box>
                                
                            })}
                        </Stack>
                    </>
                ) : (
                    
                    <Stack>
                        <Skeleton height={'20px'} />
                        <Skeleton height={'20px'} />
                        <Skeleton height={'20px'} />
                    </Stack>
                )}
            </Container>
        </Box>
    )
}

Orders.layout = 'default';

export default Orders;