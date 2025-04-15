import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Switch,
  useDisclosure,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Aluno } from '../types';
import { getAlunos, createAluno, updateAluno, deleteAluno } from '../services/api';

interface AlunoFormData {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  ativo: boolean;
}

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<AlunoFormData>({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    ativo: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await getAlunos();
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar a lista de alunos.',
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

  const handleOpenEdit = (aluno: Aluno) => {
    setFormData({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      telefone: aluno.telefone,
      dataNascimento: aluno.dataNascimento,
      ativo: aluno.ativo,
    });
    setIsEditing(true);
    onOpen();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, ativo: e.target.checked }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && formData.id) {
        const response = await updateAluno(formData.id, formData);
        setAlunos((prev) =>
          prev.map((aluno) => (aluno.id === formData.id ? response.data : aluno))
        );
        toast({
          title: 'Sucesso',
          description: 'Aluno atualizado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        const response = await createAluno(formData);
        setAlunos((prev) => [...prev, response.data]);
        toast({
          title: 'Sucesso',
          description: 'Aluno criado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o aluno.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        await deleteAluno(id);
        setAlunos((prev) => prev.filter((aluno) => aluno.id !== id));
        toast({
          title: 'Sucesso',
          description: 'Aluno excluído com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Erro ao deletar aluno:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível excluir o aluno.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleToggleActive = async (aluno: Aluno) => {
    try {
      const updatedAluno = { ...aluno, ativo: !aluno.ativo };
      const response = await updateAluno(aluno.id, updatedAluno);
      setAlunos((prev) =>
        prev.map((a) => (a.id === aluno.id ? response.data : a))
      );
      toast({
        title: 'Sucesso',
        description: `Aluno ${updatedAluno.ativo ? 'ativado' : 'desativado'} com sucesso!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do aluno.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box
      p={[4, 6]}
      w={['90%', '80%', '1400px']}
      maxW="1400px"
      mx="auto"
      mt={['56px', '68px']} // Alinha com o header
      minH="100vh"
      py={[8, 12]}
      position="relative"
    >
      <Heading as="h2" size="lg" mb={10} textAlign="center" p={4} borderRadius="md">
        Lista de Alunos
      </Heading>

      <Box
        bg="yellow.400"
        borderRadius="md"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.200"
        overflowX="auto"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={'#000'}>Nome</Th>
              <Th color={'#000'}>Email</Th>
              <Th color={'#000'}>Telefone</Th>
              <Th color={'#000'}>Nascimento</Th>
              <Th color={'#000'}>Status</Th>
              <Th color={'#000'} textAlign="center">
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            
              {alunos.map((aluno, index) => (
                <Tr
                  key={aluno.id}
                  bg={index % 2 === 0 ? 'gray.900' : 'gray.700'} 
                  _hover={{ bg: 'gray.800' }}
                >
                  <Td color="#fff">{aluno.nome}</Td>
                  <Td color="#fff">{aluno.email}</Td>
                  <Td color="#fff">{aluno.telefone}</Td>
                  <Td color="#fff">{aluno.dataNascimento}</Td>
                  <Td>
                    <Text color={aluno.ativo ? 'green.500' : 'red.500'}>
                      {aluno.ativo ? 'Ativo' : 'Inativo'}
                    </Text>
                  </Td>
                  <Td textAlign="right">
                    <HStack spacing={2} justifyContent="flex-end">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleOpenEdit(aluno)}
                        leftIcon={<EditIcon />}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(aluno.id)}
                        leftIcon={<DeleteIcon />}
                      >
                        Excluir
                      </Button>
                      <Switch
                        isChecked={aluno.ativo}
                        onChange={() => handleToggleActive(aluno)}
                        colorScheme={aluno.ativo ? 'green' : 'red'}
                        size="lg"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'#000'}>{isEditing ? 'Editar Aluno' : 'Adicionar Aluno'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Nome</FormLabel>
              <Input
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Digite o nome"
                type="text"
                color={'#000'}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Email</FormLabel>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite o email"
                type="email"
                color={'#000'}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Telefone</FormLabel>
              <Input
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="Digite o telefone"
                color={'#000'}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Data de Nascimento</FormLabel>
              <Input
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                placeholder="Digite a data de nascimento"
                type="date"
                color={'#000'}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0" color={'#000'}>Ativo</FormLabel>
              <Switch
                isChecked={formData.ativo}
                onChange={handleSwitchChange}
                colorScheme="green"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="yellow" onClick={handleSubmit}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AlunoList;