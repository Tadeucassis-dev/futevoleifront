import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  ListItem,
  Text,
  Spinner,
  VStack,
  List,
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
} from '@chakra-ui/react';
import { Aluno } from '../types';
import { getAlunos, createAluno, updateAluno, deleteAluno } from '../services/api';

// Interface para o formulário (opcional, para tipagem)
interface AlunoFormData {
  id?: number;
  nome: string;
  email: string;
  ativo: boolean;
}

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<AlunoFormData>({
    nome: '',
    email: '',
    ativo: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  // Buscar alunos ao carregar a página
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
  }, []);

  // Função para abrir o modal de criação
  const handleOpenCreate = () => {
    setFormData({ nome: '', email: '', ativo: true });
    setIsEditing(false);
    onOpen();
  };

  // Função para abrir o modal de edição
  const handleOpenEdit = (aluno: Aluno) => {
    setFormData({ id: aluno.id, nome: aluno.nome, email: aluno.email, ativo: aluno.ativo });
    setIsEditing(true);
    onOpen();
  };

  // Função para lidar com mudanças no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, ativo: e.target.checked }));
  };

  // Função para criar ou atualizar aluno
  const handleSubmit = async () => {
    try {
      if (isEditing && formData.id) {
        // Atualizar aluno
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
        // Criar novo aluno
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

  // Função para deletar aluno
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

  if (loading) return <Spinner size="xl" />;

  return (
    <Box
      p={4}
      maxW="600px"
      mx="auto"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      mt={20}
      mb={20}
      border="1px solid #ccc"
      borderColor="gray.200"
      bgColor="gray.50"
    >
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Lista de Alunos
      </Heading>
      <Button colorScheme="yellow" mb={4} onClick={handleOpenCreate}>
        Adicionar Aluno
      </Button>
      <List spacing={3} styleType="disc">
        {alunos.map((aluno) => (
          <ListItem
            key={aluno.id}
            p={3}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack align="start">
              <Text fontWeight="bold">{aluno.nome}</Text>
              <Text>{aluno.email}</Text>
              <Text color={aluno.ativo ? 'green.500' : 'red.500'}>
                {aluno.ativo ? 'Ativo' : 'Inativo'}
              </Text>
            </VStack>
            <Box>
              <Button
                size="sm"
                colorScheme="blue"
                mr={2}
                onClick={() => handleOpenEdit(aluno)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(aluno.id)}
              >
                Excluir
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Modal para criar/editar */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Editar Aluno' : 'Adicionar Aluno'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Nome</FormLabel>
              <Input
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Digite o nome"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite o email"
                type="email"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Ativo</FormLabel>
              <Switch
                isChecked={formData.ativo}
                onChange={handleSwitchChange}
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