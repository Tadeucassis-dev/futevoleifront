// components/Sidebar.tsx
import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="gray.800" color="white">
        <DrawerCloseButton />
        <DrawerHeader>Futevôlei do Lago</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="stretch">
            <Button
              as={NavLink}
              to="/"
              variant="ghost"
              justifyContent="flex-start"
              _activeLink={{ bg: 'gray.700' }}
              onClick={onClose}
            >
              Home
            </Button>
            <Button
              as={NavLink}
              to="/alunos"
              variant="ghost"
              justifyContent="flex-start"
              _activeLink={{ bg: 'gray.700' }}
              onClick={onClose}
            >
              Lista de Alunos
            </Button>
            <Button
              as={NavLink}
              to="/alunos/novo"
              variant="ghost"
              justifyContent="flex-start"
              _activeLink={{ bg: 'gray.700' }}
              onClick={onClose}
            >
              Novo Aluno
            </Button>
            <Button
              as={NavLink}
              to="/checkins"
              variant="ghost"
              justifyContent="flex-start"
              _activeLink={{ bg: 'gray.700' }}
              onClick={onClose}
            >
              Check-ins
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}