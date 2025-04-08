
import React from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  Image,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import raiz from '../assets/raiz.png';


export function Home() {
  const textSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <Box
      h="calc(100vh - 129px)"
      w="100vw"
      m={0}
      p={0}
      bg="gray.900"
      color="white"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgSize="cover"
        bgPosition="center"
        opacity={0.3}
        zIndex="1"
      />
      <VStack
        spacing={6}
        textAlign="center"
        position="relative"
        zIndex="2"
        py={{ base: 8, md: 12 }}
        px={4}
        justify="center"
        h="100%"
        w="100%"
      >
        <Text
          fontSize={textSize}
          maxW="800px"
          fontWeight="medium"
          color="gray.200"
        >
          Junte-se à comunidade mais vibrante de futevôlei! Treine, jogue e viva a emoção do esporte na areia!
        </Text>
        <Flex
          justify="center"
          w="100%"
          maxW={{ base: '90%', md: '600px' }}
          mb={4}
        >
          <Image
            src={raiz} 
            alt="Jogadores de futevôlei na praia"
            borderRadius="md"
            boxShadow="lg"
            objectFit="cover"
            w="100%"
            h={{ base: '200px', md: '300px' }}
          />
        </Flex>
        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <Button
            as={NavLink}
            to="/alunos/novo"
            size={buttonSize}
            colorScheme="yellow"
            variant="solid"
            fontWeight="bold"
            _hover={{ transform: 'scale(1.05)', transition: '0.2s' }}
          >
            Faça Parte do Time
          </Button>
          
        </Flex>
        <Text fontSize="18px" color="gray.200" mt={4}>
          Treinos incríveis, competições emocionantes e uma vibe única à beira do lago.
        </Text>
      </VStack>
    </Box>
  );
}