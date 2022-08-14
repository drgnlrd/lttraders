import { SimpleGrid, Flex, Badge, chakra, Box, Image, useColorModeValue, VisuallyHidden, Button, Heading, Text } from '@chakra-ui/react'

const HomeContact = () =>{
    return (
        <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={0}
        bg={ useColorModeValue('teal.100','red.100')}
        >
        <Flex
            direction="column"
            alignItems="start"
            justifyContent="center"
            px={{ base: 4, lg: 20 }}
            py={24}
        >
            {/* <Badge
            color="white"
            px={3}
            py={1}
            mb={3}
            variant="solid"
            colorScheme="brand"
            rounded="full"
            >
            Pre Beta
            </Badge> */}
            <Heading
            as={'h1'}
            mb={6}
            fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            lineHeight="shorter"
            >
            <Text
                as={'span'}
                bgGradient={useColorModeValue("linear(to-r, teal.400,green.400)","linear(to-r, red.400,pink.400)")}
                bgClip="text">
                Need Custom Design? Contact Us.
            </Text>
            </Heading>
            <chakra.p
            pr={{ base: 0, lg: 16 }}
            mb={4}
            fontSize="sm"
            color={useColorModeValue("teal.600", "red.600")}
            letterSpacing="wider"
            >
            Get the #1 Packaging Experience with our custom Package Printing Solutions and start delivering personalized
            experiences at every stage of the customer journey.
            </chakra.p>
            <Box display={"block"}>
                <Button
                w="full"
                mt={2}
                color={'white'}
                variant="solid"
                bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.400)')}
                _hover={{
                    bgGradient: useColorModeValue('linear(to-r, teal.500,green.500)','linear(to-r, red.500,pink.500)'),
                }}
                size="lg"
                type="submit"
                >
                Get In Touch
                </Button>
            </Box>
        </Flex>
        <Box>
            <Image
            src="./bosch.png"
            alt="3 women looking at a laptop"
            fit="cover"
            w="full"
            h={{ base: 64, md: 'full' }}
            bg="gray.100"
            loading="lazy"
            />
        </Box>
        </SimpleGrid>
    );
};

export default HomeContact;