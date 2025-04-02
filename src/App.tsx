import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { AppRoutes } from "./routes";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <AppRoutes />
        </ChakraProvider>
    );
};

export default App;