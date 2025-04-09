import React from 'react';
import { Box, Text, IconButton, useDisclosure, Flex } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Sidebar } from './Sidebar';

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box as="header" bg="#1C1C1C" p="10px" position="relative" textAlign="center">
        <Flex align="center" justify="flex-start">
          {/* Ícone e texto "Menu" à esquerda */}
          <Flex align="center">
            <IconButton
              aria-label="Abrir menu"
              icon={<HamburgerIcon boxSize="2rem" />}
              border="none"
              colorScheme="whiteAlpha"
              variant="outline"
              color="yellow.400"
              size="lg"
              onClick={onOpen}
              mr={2}
            />
            <Text color="yellow.400" fontSize="lg" >
              Menu
            </Text>
          </Flex>
        </Flex>

        {/* Título centralizado */}
        <Text
          fontSize="3xl"
          color="yellow.400"
          fontWeight="bold"
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        >
          Futevôlei do Lago
        </Text>
      </Box>
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </>
  );
}