import React from "react";
import {
  Box,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Shark1 from "../assets/Shark1.jpeg"; 

export function Home() {
  const textSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });

  return (
    <Box
      h="calc(100vh - 68px - 53px)" 
      w="100%"
      bgImage={`url(${Shark1})`}
      bgSize="cover"
      bgPosition="center"
      bgBlendMode="overlay"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      zIndex="1"
      mt="68px" 
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bg: "rgba(0, 0, 0, 0.7)",
        zIndex: -1,
      }}
    >
      <VStack
        spacing={4}
        textAlign="center"
        position="relative"
        zIndex="2"
        py={{ base: 4, md: 6 }}
        px={4}
        justify="center"
        maxH="100%"
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
        {/* <Flex
          justify="center"
          w="100%"
          maxW={{ base: "90%", md: "600px" }}
          mb={4}
        >
          <Image
            src={fotolago}
            alt="Futevôlei"
            borderRadius="md"
            boxShadow="lg"
          />
        </Flex> */}
        <Text fontSize="18px" color="gray.200" mt={2}>
          Treinos incríveis, competições emocionantes e uma vibe única à beira do lago.
        </Text>
      </VStack>
    </Box>
  );
}