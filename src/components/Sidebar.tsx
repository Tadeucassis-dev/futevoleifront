// components/Sidebar.tsx
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="gray.800" color="white" >
        <DrawerCloseButton />
        <DrawerHeader mb={10}>Futevôlei do Lago</DrawerHeader>
        <DrawerBody>
          <VStack spacing={6} align="stretch">
            <Button
              as={NavLink}
              to="/"
              justifyContent="flex-start"
              _activeLink={{ bg: "yellow.400" }}
              _hover={{ bg: "yellow.300" }}
              onClick={onClose}
            >
              Home
            </Button>
            <Button
              as={NavLink}
              to="/fotos"
              justifyContent="flex-start"
              _activeLink={{ bg: "yellow.400" }}
              _hover={{ bg: "yellow.300" }}
              onClick={onClose}
            >
              Fotos
            </Button>
            <Button
              as={NavLink}
              to="/alunos"
              justifyContent="flex-start"
              _activeLink={{ bg: "yellow.400" }}
              _hover={{ bg: "yellow.300" }}
              onClick={onClose}
            >
              Lista de Alunos
            </Button>
            {/* <Button
              as={NavLink}
              to="/alunos/novo"
              justifyContent="flex-start"
              _activeLink={{ bg: "yellow.400" }}
              _hover={{ bg: "yellow.300" }}
              onClick={onClose}
            >
              Novo Aluno
            </Button> */}
            <Button
              as={NavLink}
              to="/notificacoes"
              justifyContent="flex-start"
              _activeLink={{ bg: "yellow.400" }}
              _hover={{ bg: "yellow.300" }}
              onClick={onClose}
            >
              Notificações
            </Button>
            <Button
              as={NavLink}
              to="/pagamentos"
              justifyContent="flex-start"
              _activeLink={{ bg: "yellow.400" }}
              _hover={{ bg: "yellow.300" }}
              onClick={onClose}
            >
              Pagamentos
            </Button>
          </VStack> 
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
