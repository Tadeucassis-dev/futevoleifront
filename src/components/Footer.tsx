import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <Box>
      <Flex
        bgColor="#1C1C1C"
        height="53px"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={10}
        color="white"
      >
        <Text fontSize="18px" textAlign="center">
          © 2025 Futevôlei do Lago. Todos os direitos reservados.
        </Text>

        {/* Ícones posicionados no canto direito */}
        <HStack
          spacing={2}
          position="absolute"
          right={16}
        >
          <Text fontSize="18px" textAlign="center">
            Acesse:
          </Text>
          <IconButton
            as="a"
            href="https://www.instagram.com/futevolei_dolago"
            target="_blank"
            aria-label="Instagram"
            icon={<FaInstagram />}
            variant="ghost"
            color="white"
            fontSize="2xl"
            _hover={{ color: "pink.400" }}
          />
          <IconButton
            as="a"
            href="https://wa.me/61985785880"
            target="_blank"
            aria-label="WhatsApp"
            icon={<FaWhatsapp />}
            variant="ghost"
            color="white"
            fontSize="2xl"
            _hover={{ color: "green.400" }}
          />
          <IconButton
            as="a"
            href="https://www.facebook.com/seuPerfil"
            target="_blank"
            aria-label="Facebook"
            icon={<FaFacebook />}
            variant="ghost"
            color="white"
            fontSize="2xl"
            _hover={{ color: "blue.400" }}
          />
        </HStack>
      </Flex>
    </Box>
  );
}
