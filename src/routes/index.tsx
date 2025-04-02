// routes/AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Home } from '../pages/Home';
import AlunoList from '../pages/AlunoList';
import AlunoForm from '../pages/AlunoForm';
import CheckinList from '../pages/CheckinList';
import theme from '../theme';

export function AppRoutes() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" display="flex" flexDirection="column" m={0} p={0}>
          <Header />
          <Box as="main" flex="1" m={0} p={0}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/alunos" element={<AlunoList />} />
              <Route path="/alunos/novo" element={<AlunoForm />} />
              <Route path="/checkins" element={<CheckinList alunoId={1} />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
}