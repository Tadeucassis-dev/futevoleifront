import { Flex, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Flex
      bgColor="#1C1C1C"
      height="53px"
      alignItems="center"
      justifyContent="center"
      color="white"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={10}
    >
      <Text fontSize="18px">© 2025 Futevôlei do Lago. Todos os direitos reservados.</Text>
    </Flex>
  );
}