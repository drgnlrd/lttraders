import {
    Box,
    Flex,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    VStack,
    useColorModeValue,
    Icon,
    Img
  } from '@chakra-ui/react';
  import { NavLink } from '../partials/nav-link';
  import {
    BiTachometer,
    BiCart,
    BiFolder,
    BiCalendar,
    BiCog,
    BiBarChart,
    
  } from 'react-icons/bi';
  
  const SidebarLink = ({ href, children, icon }) => (
    <NavLink href={href}>
      <Flex align="center">
        <Icon as={icon} mr={3} w={6} />
        <Text fontSize="sm" fontWeight="medium">
          {children}
        </Text>
      </Flex>
    </NavLink>
  );
  
  function PageLinks() {
    return (
      <VStack w="full" spacing={1}>
        <SidebarLink href="/admin" icon={BiTachometer}>
          Dashboard
        </SidebarLink>
        <SidebarLink href="/admin/products" icon={BiCart}>
          Products
        </SidebarLink>
        {/* <SidebarLink href="/dashboard/projects" icon={BiFolder}>
          Projects
        </SidebarLink> */}
        <SidebarLink href="/admin/orders" icon={BiCalendar}>
          Orders
        </SidebarLink>
        <SidebarLink href="/admin/settings" icon={BiCog}>
          Settings
        </SidebarLink>
        {/* <SidebarLink href="/dashboard/reports" icon={BiBarChart}>
          Reports
        </SidebarLink> */}
      </VStack>
    );
  }
  
  function SidebarContainer(props) {
    return (
      <Box
        as="aside"
        position="fixed"
        top={0}
        w={64}
        insexX={0}
        h="full"
        {...props}
      />
    );
  }
  
  export default function Sidebar(props) {
    const bgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <SidebarContainer bg={bgColor}>
        <Flex w="full" align="center" h={16} p={3}>
          <Flex boxSize="full" align="center" px={3}>
            <Flex boxSize="full" align="center">
              <Img
                h={14}
                src={'/ecomlogothumb.png'}
                w="auto"
                display={{ base: 'block', lg: 'none' }}
              />
  
              <Img
                h={14}
                src={ useColorModeValue('./ecomlogowhite.png', './ecomlogo.png') }
                w="auto"
                display={{ base: 'none', lg: 'block' }}
              />
            </Flex>
          </Flex>
        </Flex>
        <VStack
          as="nav"
          aria-label="Main navigation"
          position="relative"
          h="calc(100vh - 4rem)"
          p={3}
          overflowY="auto"
          {...props}
        >
          <PageLinks />
        </VStack>
      </SidebarContainer>
    );
  }
  