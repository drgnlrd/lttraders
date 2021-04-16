import NextLink from 'next/link';
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import ThemeToggle from '../partials/theme-toggle';
import MobileNav from './mobile-nav';

export default function Header() {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      left={[0, 0, 64]}
      right={0}
      align="center"
      h={16}
      px={[4, 6, 8]}
      bg={bgColor}
      zIndex="docked"
    >
      <Flex w="full" align="center" justify="center">
        <Flex w="full" align="center" justify="space-between">
          <Flex align="center">
            <NextLink href="/admin" passHref>
              <Button as="a" variant="ghost" px={0} fontWeight="bold">
                Admin Panel
              </Button>
            </NextLink>
          </Flex>
          <Flex>
            <ThemeToggle mr={`-${3}`} />
            <MobileNav />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
