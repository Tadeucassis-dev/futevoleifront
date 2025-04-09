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
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import fotolago from '../assets/fotolago.jpg';
import { register } from '../services/api'; // Importe o método register

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (credentials.password !== credentials.confirmPassword) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await register({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      toast({
        title: 'Cadastro bem-sucedido',
        description: `Bem-vindo, ${response.data.name}! Você pode fazer login agora.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/signin');
    } catch (error: any) {
      toast({
        title: 'Erro no cadastro',
        description:
          error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/signin');
  };

  return (
    <ChakraProvider>
      <Box
        h="85vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgImage={`url(${fotolago})`}
        bgSize="cover"
        bgPosition="center"
        bgColor="rgba(0, 0, 0, 0.7)"
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
            <Heading color="yellow.400">Criar Conta</Heading>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="yellow.400">Nome</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={credentials.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    bg="whiteAlpha.900"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="yellow.400">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    bg="whiteAlpha.900"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="yellow.400">Senha</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha"
                    bg="whiteAlpha.900"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="yellow.400">Confirmar Senha</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={credentials.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirme sua senha"
                    bg="whiteAlpha.900"
                  />
                </FormControl>

                <Button
                  type="submit"
                  color="white"
                  isLoading={isLoading}
                  loadingText="Cadastrando..."
                  bgColor="yellow.400"
                  _hover={{ bg: 'yellow.300' }}
                >
                  Cadastrar
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLoginRedirect}
                  isDisabled={isLoading}
                  bgColor="whiteAlpha.900"
                  color="black"
                >
                  Já tem conta? Faça login
                </Button>
              </Stack>
            </form>
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Register;