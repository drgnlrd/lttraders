import { useRef } from 'react';
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Icon
} from '@chakra-ui/react';
import Sidebar from './sidebar';
import { BiMenu } from 'react-icons/bi';

export default function MobileNav() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        aria-label="Navigation Menu"
        variant="ghost"
        display={['flex', null, 'none']}
        icon={<Icon as={BiMenu} h={5} />}
        onClick={onToggle}
        ref={btnRef}
      />
      <Drawer
        size="xs"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="left"
      >
        <DrawerOverlay zIndex="overlay" />
        <DrawerContent zIndex="drawer">
          <DrawerBody p={0}>
            <Sidebar w="full" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
