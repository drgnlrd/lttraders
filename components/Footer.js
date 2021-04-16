import {
    Box,
    chakra,
    Container,
    Link,
    Stack,
    Text,
    Icon,
    useColorModeValue,
    VisuallyHidden,
    IconButton,
    useColorMode,
    Image
} from '@chakra-ui/react';

import { FaInstagram, FaTwitter, FaYoutube, FaSun, FaMoon } from 'react-icons/fa';

const Logo = (props) => {
    return (
        <Image src="/ecomlogothumb.png" h={'60px'} w={"auto"} />
      );
};

const SocialButton = ({ children, label, href }) => {
    return(
        <chakra.button
            bg={useColorModeValue('blackAlpha.100','whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200','whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function SmallFooter() {

    const { colorMode, toggleColorMode } = useColorMode();
    return(
        <Box
            bg={useColorModeValue('gray.50','gray.900')}
            color={useColorModeValue('gray.700','gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>
                <Logo />
                <Stack direction={'row'} spacing={6}>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/products'}>Products</Link>
                    <Link href={'/contact'}>Contact</Link>
                </Stack>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200','gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{base: 'column', md: 'row'}}
                    spacing={4}
                    justify={{base:'center',md:'space-between'}}
                    align={{base:'center',md:'center'}}>
                    <Text textAlign={['center', 'left']} >&copy; 2020 Alburhan Print and Pack. All Rights Reserved. </Text>
                    <Stack direction={'row'} spacing={8} >
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label={'Twitter'} href={'#'}>
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label={'YouTube'} href={'#'}>
                                <FaYoutube />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'}>
                                <FaInstagram />
                            </SocialButton>
                        </Stack>
                        <IconButton 
                        color={useColorModeValue('blue.500','yellow.400')}
                        icon={
                            colorMode == 'light' ? <Icon as={FaMoon} w={4} h={4} /> : <Icon as={FaSun} w={4} h={4} />
                        } 
                        onClick={toggleColorMode} 
                        size={'sm'}
                        />
                        
                    </Stack>
                    
                </Container>
            </Box>
        </Box>
    )
};

