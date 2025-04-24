import { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  List,
  ListItem,
  Image,
  Text,
  Divider,
  useToast,
  Spinner,
  Container,
} from '@chakra-ui/react';
import axios from 'axios';
import { Payment } from '../types';

const App = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const fetchPayments = async () => {
    if (!studentId) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira o ID do aluno.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get<Payment[]>(`/payments/student/${studentId}`);
      setPayments(response.data);
      toast({
        title: 'Sucesso',
        description: 'Pagamentos carregados com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar pagamentos.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createPayment = async () => {
    if (!studentId || !amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira um ID válido e um valor maior que zero.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post<Payment>('/payments', {
        studentId: parseInt(studentId),
        amount: parseFloat(amount),
      });
      setPayments([...payments, response.data]);
      setAmount('');
      toast({
        title: 'Sucesso',
        description: 'Pagamento PIX gerado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao criar pagamento.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkStatus = async (paymentId: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get<Payment>(`/payments/status/${paymentId}`);
      setSelectedPayment(response.data);
      toast({
        title: 'Sucesso',
        description: 'Status do pagamento atualizado.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao verificar status.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={24} >
      <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" borderWidth="1px" bgColor={"gray.700"}>
        <Heading as="h1" size="xl" mb={6} textAlign="center" color='yellow.400'>
          Sistema de Pagamentos - Alunos
        </Heading>
        <VStack spacing={6}>
          <FormControl isRequired>
            <FormLabel>ID do Aluno</FormLabel>
            <Input
              type="number"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Digite o ID do aluno"
              size="lg"
              focusBorderColor="brand.500"
            />
            <Button
              mt={4}
              colorScheme="brand"
              size="lg"
              onClick={fetchPayments}
              isDisabled={!studentId || isLoading}
              leftIcon={isLoading ? <Spinner size="sm" /> : undefined}
            >
              Carregar Pagamentos
            </Button>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Valor (R$)</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Digite o valor"
              size="lg"
              focusBorderColor="brand.500"
            />
            <Button
              mt={4}
              colorScheme="green"
              size="lg"
              onClick={createPayment}
              isDisabled={!studentId || !amount || isLoading}
              leftIcon={isLoading ? <Spinner size="sm" /> : undefined}
            >
              Gerar Pagamento PIX
            </Button>
          </FormControl>
        </VStack>
        <Divider my={8} />
        <Heading as="h2" size="md" mb={4}>
          Pagamentos
        </Heading>
        {isLoading && !payments.length ? (
          <Box textAlign="center">
            <Spinner size="lg" color="brand.500" />
          </Box>
        ) : payments.length === 0 ? (
          <Text color="gray.500">Nenhum pagamento encontrado.</Text>
        ) : (
          <List spacing={4}>
            {payments.map((payment) => (
              <ListItem key={payment.id} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                <Text fontWeight="bold">Valor: R$ {payment.amount.toFixed(2)}</Text>
                <Text>Status: {payment.status}</Text>
                {payment.qrCode && (
                  <Box mt={4}>
                    <Image src={payment.qrCode} alt="QR Code" boxSize="150px" mx="auto" />
                    <Button
                      mt={4}
                      colorScheme="purple"
                      size="md"
                      onClick={() => checkStatus(payment.id)}
                      isDisabled={isLoading}
                    >
                      Verificar Status
                    </Button>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        )}
        {selectedPayment && (
          <Box mt={8} p={4} bg="brand.50" borderRadius="md">
            <Heading as="h3" size="sm" mb={4}>
              Status do Pagamento
            </Heading>
            <Text><strong>ID:</strong> {selectedPayment.id}</Text>
            <Text><strong>Valor:</strong> R$ {selectedPayment.amount.toFixed(2)}</Text>
            <Text><strong>Status:</strong> {selectedPayment.status}</Text>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;