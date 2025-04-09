import { Flex, Text } from "@chakra-ui/react";

export function Footer() {
    return (
        <Flex bgColor={"#1C1C1C"} height={"53px"} alignItems="center" justifyContent="center" color="white" >
            <div className="container mx-auto text-center">
                <Text fontSize={"18px"}>&copy; 2025 Futevôlei do Lago. Todos os direitos reservados.</Text>
            </div>
        </Flex>
    );
}

