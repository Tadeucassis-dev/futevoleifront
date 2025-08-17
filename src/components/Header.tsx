import React from "react";
import { Box, Text, IconButton, Flex } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export function Header({ onOpen }: { onOpen: () => void }) {
  return (
    <Box
      as="header"
      bg="#1C1C1C"
      p="4px"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      h="68px" // Altura fixa
    >
      <Flex align="center" justify="space-between" px={4}>
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
          <Text color="yellow.400" fontSize="lg">
            Menu
          </Text>
        </Flex>
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
        
      </Flex>
    </Box>
  );
}