import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    IconProps,
    Icon,
    Image,
    useColorModeValue,
    Textarea,
    useToast
  } from '@chakra-ui/react';

import { useState } from 'react';
import emailjs from 'emailjs-com';
  
  
export default function Contact(){

    const [isSending, setIsSending] = useState(false);
    const toast = useToast();
    const handleSubmit = async (e) =>{
        e.preventDefault();

        setIsSending(true);

        await emailjs.sendForm('service_avn0pvc',"template_iby5kcj", e.target, 'CCXe26uO_uksizf7E')
        .then(res=>{
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            setIsSending(false);
            toast({
                title: 'Message Sent.',
                description: 'Your Message has been sent. Thank you for reaching out to us.',
                position: 'top',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            document.getElementById('contact_form').reset();
        })
    }

    return (
      <Box position={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}>
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              zIndex={10}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
              Connect with us{' '}
              <Text
                as={'span'}
                bgGradient={useColorModeValue("linear(to-r, teal.400,green.400)","linear(to-r, red.400,pink.400)")}
                bgClip="text">
                &
              </Text>{' '}
              And get your Required tools at your DOOR STEP
            </Heading>
            <Stack direction={'row'} spacing={4} align={'center'}>
              {/* <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={useBreakpointValue({ base: 'md', md: 'lg' })}
                    position={'relative'}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: 'full',
                      height: 'full',
                      rounded: 'full',
                      transform: 'scale(1.125)',
                      bgGradient: 'linear(to-bl, red.400,pink.400)',
                      position: 'absolute',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup> */}
              <Image src={useColorModeValue('/icon-512x512.png','/light.png')} w={['50vw','20vw']} />
              <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                +
              </Text>
              <Flex
                align={'center'}
                justify={'center'}
                fontFamily={'heading'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'gray.800'}
                color={'white'}
                rounded={'full'}
                width={useBreakpointValue({ base: '44px', md: '60px' })}
                height={useBreakpointValue({ base: '44px', md: '60px' })}
                position={'relative'}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}>
                YOU
              </Flex>
            </Stack>
          </Stack>
          <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                Write To Us
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text">
                  !
                </Text>
              </Heading>
              <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                Write to us with your requirements or your thoughts on how we can help you with your requirements and our executives will connect with you.
              </Text>
            </Stack>
            <Box as={'form'} mt={10} onSubmit={(e)=>handleSubmit(e)} id={'contact_form'} >
              <Stack spacing={4}>
                <Input
                  type="text"
                  placeholder="Name"
                  name="from_name"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Input
                  placeholder="Email"
                  type={'email'}
                  name={'user_email'}
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Textarea
                  placeholder="Your Message..."
                  bg={'gray.100'}
                  name={'message'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                
              </Stack>
              <Button
                fontFamily={'heading'}
                type={'submit'}
                mt={8}
                w={'full'}
                bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)','linear(to-r, red.400,pink.500)')}
                color={'white'}
                transition={'all .3s ease-in'}
                _hover={{
                  bgGradient: useColorModeValue('linear(to-r, teal.500,green.500)','linear(to-r, red.500,pink.500)'),
                  boxShadow: 'xl',
                  transition: 'all .3s ease-in'
                }}
                isLoading={isSending === true ? true : false}>
                Submit
              </Button>
            </Box>
            form
          </Stack>
        </Container>
        <Blur
          position={'absolute'}
          top={-10}
          left={-10}
          style={{ filter: 'blur(70px)' }}
        />
      </Box>
    );
  }
  
  export const Blur = (props) => {
    return (
      <Icon
        width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
        zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
        height="560px"
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <circle cx="71" cy="61" r="111" fill="#F56565" />
        <circle cx="244" cy="106" r="139" fill="#ED64A6" />
        <circle cy="291" r="139" fill="#ED64A6" />
        <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
        <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
        <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
        <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
      </Icon>
    );
  };

