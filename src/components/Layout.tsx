import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header onOpen={onOpen} />
      <Box flex="1">{children}</Box>
      <Footer />
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}