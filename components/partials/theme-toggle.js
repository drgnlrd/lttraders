import { IconButton, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(
    <FaMoon h={5} color="gray.600" />,
    <FaSun h={5} />
  );

  return (
    <IconButton
      data-testid="theme-toggle"
      variant="ghost"
      aria-label={`Toggle ${colorMode} mode`}
      title={`Activated ${colorMode} mode`}
      icon={Icon}
      onClick={toggleColorMode}
      {...props}
    />
  );
}
