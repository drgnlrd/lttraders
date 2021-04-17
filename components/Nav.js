import {
    Box,
    Flex,
    Text,
    Heading,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Img,
    useColorMode,
    Image,
    chakra,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar
} from '@chakra-ui/react';

import {
    MdMenu,
    MdClear,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight,
    MdShoppingBasket,
} from 'react-icons/md';

import { useEffect, useState } from 'react'

import { commerce } from '../lib/commerce';

import userbase from 'userbase-js';

import { useRouter } from 'next/router';



// import { useEffect } from 'react';
const initialFormData = Object.freeze({
    username: "",
    password: "",
    email: "",
    
})



export default function WithSubnavigation(){

    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const getInitialState = () =>{
        if (typeof window !== 'undefined'){
            return localStorage.getItem('userbaseCurrentSession');
        }
        
    }
    const [ cart, setCart ] = useState();
    const [checked, setChecked] = useState(false);
    const [user, setUser] = useState(getInitialState);
    const [formData, updateFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [remember, setRemember] = useState('local');

    

    const handleCheck = () => {
        setChecked(!checked);
        if(checked === true){
            setRemember('local');
        }
        else{
            setRemember('none');
        }
    };

    useEffect(async () => {
        await commerce.cart.retrieve().then((res)=>{
            console.log(res);
            setCart(res);
        });

    }, []);

    const handleChange=(e)=>{
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(checked === true){
            setRemember('local');
        }
        else{
            setRemember('none');
        }

        await userbase.signIn({
            username: formData.username,
            password: formData.password,
            rememberMe: remember,
        }).then((res)=>{
            setUser(res);
            console.log(res);
            setLoading(false)
            onModalClose();
        }).catch(error=>{
            alert(error.message);
            setLoading(false)
        })

    }

    const handleSignUp = async (e) => {
        
        

        e.preventDefault();
        setLoading(true);

        if(checked === true){
            setRemember('local');
        }
        else{
            setRemember('none');
        }

        await userbase.signUp({
            username: formData.username,
            password: formData.password,
            email: formData.email,
            rememberMe: remember,
        }).then((res)=>{
            setUser(res);
            console.log(res);
            setLoading(false)
            onModalClose();
        }).catch(error=>{
            alert(error.message);
            setLoading(false);
        })
    }

    const handleLogout = async () =>{
        await userbase.signOut().then(()=>{
            setUser(null);
            localStorage.removeItem('userbaseCurrentSession');
            router.reload();
        }).catch(error=>{
            alert(error.message);
        })
        
    }

    return(
        <Box position={'fixed'} top={0} w={'100%'} zIndex={'99'}>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600','white')}
                minH={'65px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'} 
                >
                <SignInModal 
                    handleChange={handleChange} 
                    handleSignIn={handleSignIn}
                    handleSignUp={handleSignUp}
                    handleCheck={handleCheck}
                    isLoading={loading}
                    checked={checked}
                    onClose={onModalClose} 
                    onOpen={onModalOpen} 
                    isOpen={isModalOpen} 
                />

                <Flex
                    flex={{base: 1, md: 'auto'}}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    
                    <IconButton 
                        onClick={onToggle}
                        icon={
                            isOpen ? <Icon as={MdClear} w={4} h={4} /> : <Icon as={MdMenu} w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800','white')}>
                        <Flex display={{ base: 'none', md: 'flex' }} >
                            {colorMode == "light" ? <Image src="/ecomlogowhite.png" h="60px" w="auto" /> : <Image src="/ecomlogo.png" h="65px" w="auto" /> }
                        </Flex>
                        <Flex display={{ base: 'flex', md: 'none' }} >
                            <Image src="/ecomlogothumb.png" h="40px" w="auto" />
                        </Flex>
                        
                    </Text>
                    <Flex display={{base: 'none', md: 'flex' }} alignItems={'center'} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{base:1, md:0}}
                    justify={'flex-end'}
                    direction={'row'}
                    alignItems={'center'}
                    spacing={[1,6,6]}>
                    <IconButton 
                        as={'a'}
                        href={'/cart'}
                        icon={
                            <>
                                <Icon as={MdShoppingBasket} w={6} h={6} />
                                <chakra.span
                                    pos="absolute"
                                    top="-1px"
                                    right="-1px"
                                    px={2}
                                    py={1}
                                    fontSize="xs"
                                    fontWeight="bold"
                                    lineHeight="none"
                                    color="red.100"
                                    transform="translate(50%,-50%)"
                                    bg="red.600"
                                    rounded="full"
                                    >
                                    {cart ? cart.total_items : `~`}
                                </chakra.span>
                            </>
                            }
                        variant={'ghost'}
                    />
                    {user ? (
                        <>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}>
                                <Avatar
                                size={'sm'}
                                src={
                                    'https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png'
                                }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={'a'} href={'/orders'} >Orders</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                        </>
                    ) : (
                        <>
                        <Button
                            as={'a'}
                            fontSize={'sm'}
                            fontWeight={400}
                            variant={'link'}
                            href={'#'}
                            onClick={onModalOpen}>
                            Sign In
                        </Button>
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.400)')}
                            href={'#'}
                            _hover={{
                                bgGradient: useColorModeValue('linear(to-r, teal.500,green.500)','linear(to-r, red.500,pink.500)'),
                            }}
                            onClick={onModalOpen}>
                            Sign Up
                        </Button>
                        </>
                    )}
                    
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity >
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const SignInModal = ({isOpen, onClose, onOpen, handleChange, handleSignIn, handleSignUp, handleCheck, checked, isLoading}) =>{
    return(
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Tabs isFitted variant={'enclosed'} >
                        <TabList>
                            <Tab>Sign In</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Stack spacing={4}>
                                    <FormControl id="email">
                                        <FormLabel>User Name</FormLabel>
                                        <Input 
                                            name={'username'}
                                            id={'username'}
                                            onChange={(e)=>handleChange(e)}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>
                                        <Input name={'password'}
                                            id={'password'}
                                            onChange={(e)=>handleChange(e)}
                                            type="password" />
                                    </FormControl>
                                    <Stack spacing={10}>
                                        <Stack
                                            direction={{ base: 'column', sm: 'row' }}
                                            align={'start'}
                                            justify={'space-between'}>
                                            <Checkbox onClick={handleCheck} checked={checked} >Remember me</Checkbox>
                                            <Link color={'blue.400'}>Forgot password?</Link>
                                        </Stack>
                                        <Button
                                            bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.400)')} 
                                            _hover={{
                                                bgGradient: useColorModeValue('linear(to-r, teal.500,green.500)','linear(to-r, red.500,pink.500)')
                                            }}
                                            color={'white'}
                                            onClick={(e)=>handleSignIn(e)}
                                            isLoading={isLoading == true ? true : false}>
                                            Sign in
                                        </Button>
                                        <Button onClick={onClose} >
                                            Close
                                        </Button>
                                    </Stack>
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Stack spacing={4}>
                                    <FormControl id="firstname">
                                        <FormLabel>User Name</FormLabel>
                                        <Input 
                                            name={'username'}
                                            id={'username'}
                                            onChange={(e)=>handleChange(e)}
                                            type="text" />
                                    </FormControl>
                                    <FormControl id="email">
                                        <FormLabel>Email address</FormLabel>
                                        <Input 
                                            name={'email'}
                                            id={'email'}
                                            onChange={(e)=>handleChange(e)}
                                            type="email"/>
                                    </FormControl>
                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>
                                        <Input 
                                            name={'password'}
                                            id={'password'}
                                            onChange={(e)=>handleChange(e)}
                                            type="password" />
                                    </FormControl>
                                    <Stack spacing={10}>
                                        <Stack
                                            direction={{ base: 'column', sm: 'row' }}
                                            align={'start'}
                                            justify={'space-between'}>
                                            <Checkbox checked={checked} onCLick={handleCheck}>Remember me</Checkbox>
                                            <Link color={'blue.400'}>Forgot password?</Link>
                                        </Stack>
                                        <Button
                                            bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.400)')} 
                                            _hover={{
                                                bgGradient: useColorModeValue('linear(to-r, teal.500,green.500)','linear(to-r, red.500,pink.500)')
                                            }}
                                            color={'white'}
                                            onClick={(e)=>handleSignUp(e)}
                                            isLoading={isLoading == true ? true : false}>
                                            Sign Up
                                        </Button>
                                        <Button onClick={onClose} >
                                            Close
                                        </Button>
                                    </Stack>
                                </Stack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

const DesktopNav = () =>{
    return(
        <Stack direction={'row'} spacing={4} alignItems={'center'} ml={2} >
            {NAV_ITEMS.map((navItem)=> (
                <Box key={navItem.label} >
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ? navItem.href : '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={useColorModeValue('gray.600','gray.200')}
                                _hover={{
                                    textDecoration: 'none',
                                    color: useColorModeValue('gray.800','white'),
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>
                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={useColorModeValue('white','gray.800')}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child)=>(
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>

                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) =>{
    return(
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('teal.50','gray.900') }}>
            <Stack direction={'row'} align={'center'} >
                <Box>
                    <Text 
                        transition={'all .3s ease'}
                        _groupHover={{color: useColorModeValue('teal.400','red.400')}}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'} >{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon as={MdKeyboardArrowRight} color={useColorModeValue('teal.400','red.400')} w={5} h={5} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return(
        <Stack
            bg={useColorModeValue('white','gray.800')}
            p={4}
            display={{md:'none'}}>
            {NAV_ITEMS.map((navItem)=>(
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({label, children, href}) =>{
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href?href:'#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon 
                        as={MdKeyboardArrowDown} 
                        transition={'all .25s ease-in-out'} 
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0 !important', }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200','gray.700')}
                    align={'start'}>
                    {children && 
                        children.map((child)=>(
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                    ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Categories',
        children: [
            
            {
                label: 'Cake Boxes',
                subLabel: 'Made For Bakeries Or Solo Passionists',
                href: '/categories/cake-boxes',
            },
            {
                label: 'Chocolate Boxes',
                subLabel: 'To Present Your Creations Beautifully',
                href: '/categories/chocolate-boxes',
            },
            {
                label: 'Sweet Boxes',
                subLabel: 'For All Kinds Of Festive Celebrations',
                href: '/categories/sweet-boxes',
            },
        ],
    },
    {
        label: 'All Products',
        href: '/products',
    },
    {
        label: 'Contact',
        href: '/contact',
    },

    
];
// const NAV_ITEMS = [
//     {
//         label: 'Inspiration',
//         children: [
//             {
//                 label: 'Explore Design Work',
//                 subLabel: 'Trending Design to inspire you',
//                 href: '#',
//             },
//             {
//                 label: 'New & Noteworthy',
//                 subLabel: 'Up-and-coming Designers',
//                 href: '#',
//             },
//         ],
//     },
//     {
//         label: 'Find Work',
//         children: [
//             {
//                 label: 'Job Board',
//                 subLabel: 'Find your dream design job',
//                 href: '#',
//             },
//             {
//                 label: 'Freelance Projects',
//                 subLabel: 'An exclusive list for contract work',
//                 href: '#',
//             },
//         ],
//     },
//     {
//         label: 'Learn Design',
//         href: '#',
//     },
//     {
//         label: 'Hire Designers',
//         href: '#',
//     },
    
// ];