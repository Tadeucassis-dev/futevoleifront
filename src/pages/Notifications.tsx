import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Aluno } from '../types';
import { getAlunos, sendManualNotification } from '../services/api';

const Notifications: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [mensagem, setMensagem] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const data = await getAlunos();
        setAlunos(data);
      } catch (error: any) {
        console.error('Erro ao carregar alunos:', error);
        toast({
          title: 'Erro',
          description: error.response?.data || 'Erro ao carregar alunos',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAlunos();
  }, [toast]);

  const handleSendNotification = async (alunoId: number, alunoNome: string) => {
    if (!mensagem.trim()) {
      toast({
        title: 'Aviso',
        description: 'Digite uma mensagem antes de enviar',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await sendManualNotification(alunoId, mensagem);
      toast({
        title: 'Sucesso',
        description: response,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setMensagem('');
    } catch (error: any) {
      console.error('Erro ao enviar notificação:', error);
      toast({
        title: 'Erro',
        description: error.response?.data || 'Erro ao enviar notificação',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClearMessage = () => {
    setMensagem('');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" color="yellow.400" />
      </Box>
    );
  }

  return (
    <Box
      p={[4, 6]}
      w={['90%', '80%', '1400px']}
      maxW="1400px"
      mx="auto"
      mt={['56px', '68px']}
      minH="100vh"
      bg="gray.800"
      color="white"
      borderRadius="md"
    >
      <VStack spacing={6} align="stretch">
        <Heading as="h2" size="lg" textAlign="center">
          Gerenciar Notificações
        </Heading>
        <Text textAlign="center" color="gray.300">
          Notificações automáticas (aniversários e vencimentos) são enviadas diariamente às 8h.
        </Text>

        <Box>
          <FormControl mb={4}>
            <FormLabel color="white">Enviar Notificação Manual</FormLabel>
            <HStack>
              <Input
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Digite a mensagem"
                bg="gray.700"
                color="white"
                borderColor="gray.600"
                _hover={{ borderColor: 'yellow.400' }}
                _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px yellow.400' }}
              />
              <Button
                colorScheme="yellow"
                variant="outline"
                onClick={handleClearMessage}
                isDisabled={!mensagem}
              >
                Limpar
              </Button>
            </HStack>
          </FormControl>
        </Box>

        <Box
          bg="gray.700"
          borderRadius="md"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.600"
          overflowX="auto"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="yellow.400">Nome</Th>
                <Th color="yellow.400">Email</Th>
                <Th color="yellow.400">Vencimento</Th>
                <Th color="yellow.400" textAlign="center">
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {alunos.map((aluno, index) => (
                <Tr
                  key={aluno.id}
                  bg={index % 2 === 0 ? 'gray.800' : 'gray.900'}
                  _hover={{ bg: 'gray.600' }}
                >
                  <Td>{aluno.nome}</Td>
                  <Td>{aluno.email}</Td>
                  <Td>{aluno.diaVencimentoMensalidade ?? 'Não definido'}</Td>
                  <Td textAlign="center">
                    <Button
                      colorScheme="yellow"
                      size="sm"
                      onClick={() => handleSendNotification(aluno.id, aluno.nome)}
                    >
                      Enviar Mensagem
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

export default Notifications;