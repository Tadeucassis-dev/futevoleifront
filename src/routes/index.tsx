import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import { Home } from "../pages/Home";
import AlunoList from "../pages/AlunoList";
import AlunoForm from "../pages/AlunoForm";
import Signin from "../pages/Signin";
import Register from "../pages/Register";
import theme from "../theme";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Layout } from "../components/Layout";
import Notifications from "../pages/Notifications";

export function AppRoutes() {
  const isAuthenticated = !!localStorage.getItem("jwt_token"); // Verifica se o token está armazenado

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
        <Box minH="100vh" display="flex" flexDirection="column" m={0} p={0}>
          
          <Box as="main" flex="1" m={0} p={0}>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/signin" element={<Signin />} />
              <Route path="/register" element={<Register />} />
              

              {/* Rotas protegidas */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/alunos"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AlunoList />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/notificacoes"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/alunos/novo"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AlunoForm />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </Box>
          <Footer />
        </Box>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}