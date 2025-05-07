import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
