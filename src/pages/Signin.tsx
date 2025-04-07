// Signin.tsx
import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Assumindo que você usa react-router

interface LoginCredentials {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Chamada ao backend - substitua pela sua URL de API
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      const { token } = data;

      // Armazenar o token JWT (exemplo usando localStorage)
      localStorage.setItem('jwt_token', token);

      toast({
        title: 'Login bem-sucedido',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirecionar para a página principal
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Erro no login',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        <Box
          bg="#1c1c1c"
          p={8}
          borderRadius="md"
          boxShadow="md"
          w="full"
          maxW="md"
        >
          <VStack spacing={6}>
            <Heading color="yellow.400">Bem-vindo</Heading>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color={'yellow.400'}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    bg={'whiteAlpha.900'}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color={'yellow.400'}>Senha</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha"
                    bg={'whiteAlpha.900'}
                  />
                </FormControl>

                <Button
                  type="submit"
                  color={'white'}
                  isLoading={isLoading}
                  loadingText="Entrando..."
                  bgColor={'yellow.400'}
                  _hover={{ bg: 'yellow.300' }}
                >
                  Entrar
                </Button>

                <Button
                  variant="outline"
                  colorScheme="blue"
                  onClick={handleRegisterRedirect}
                  isDisabled={isLoading}
                  bgColor={'whiteAlpha.900'}
                  color={'black'}
                >
                  Não tem conta? Cadastre-se
                </Button>
              </Stack>
            </form>
            <Text fontSize="sm" color="white">
              Esqueceu sua senha?{' '}
              <Text as="span" color="blue.500" cursor="pointer">
                Recuperar
              </Text>
            </Text>
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Signin;