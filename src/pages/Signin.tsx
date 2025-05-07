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
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Ajuste o caminho para sua service
import fotolago from '../assets/fotolago.jpg';
import { useAuth } from '../context/AuthContext';

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
  const { login: authLogin } = useAuth();

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
      const response = await login(credentials);
      const { token } = response.data; // O backend retorna { "token": "jwt_aqui" }
  
      authLogin(token);
  
      toast({
        title: 'Login bem-sucedido',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
  
      /* authLogin(token); */
      navigate('/*'); // Redireciona para a página inicial após o login
    } catch (error: any) {
      toast({
        title: 'Erro no login',
        description: error.response?.data?.error || 'Erro desconhecido',
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
        h="100vh" // Altura total da tela
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgImage={`url(${fotolago})`}
        bgSize="cover"
        bgPosition="center"
        bgColor="rgba(0, 0, 0, 0.7)" // Cor de fundo com opacidade
        bgBlendMode="overlay"
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