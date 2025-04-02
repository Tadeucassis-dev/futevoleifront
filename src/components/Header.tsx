// components/Header.tsx
import React from 'react';
import { Box, Text, IconButton, useDisclosure, border } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Sidebar } from './Sidebar';

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box as="header" bg="#1C1C1C" p="12px" textAlign="center">
        <IconButton
          aria-label="Abrir menu"
          icon={<HamburgerIcon boxSize="2rem"/>}
          border={'none'}
          colorScheme="whiteAlpha"
          variant="outline"
          position="absolute"
          left="12px"
          top="16px"
          color={"yellow.400"}
          size="" // Aumenta o botão (sm, md, lg)
          onClick={onOpen}
        />
        <Text fontSize="3xl" color="yellow.400" fontWeight="bold">
         Futevôlei do Lago
        </Text>
      </Box>
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </>
  );
}