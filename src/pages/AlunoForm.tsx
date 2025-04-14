import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Switch, VStack } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Aluno } from '../types';
import { createAluno } from '../services/api';

const AlunoForm: React.FC = () => {
  const [aluno, setAluno] = useState<Partial<Aluno>>({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    ativo: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAluno((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setAluno((prev) => ({ ...prev, ativo: !prev.ativo }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAluno(aluno as Aluno);
      alert('Aluno criado com sucesso!');
      setAluno({ nome: '', email: '', telefone: '', dataNascimento: '', ativo: true });
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      alert('Erro ao criar aluno.');
    }
  };

  return (
    <Box
  p={[4, 6]}
  w={['90%', '80%', '400px']}
  maxW="400px"
  mx="auto"
  minH="100vh"
  py={[8, 12]}
  mt={['56px', '68px']} // Alinha com a altura do header
  bgColor="#4c4c4c"
  borderRadius="md"
  boxShadow="lg"
>
      <VStack spacing={[4, 6]} as="form" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel
            textAlign="center"
            fontSize={['xl', '2xl']} // xl em celulares, 2xl em telas maiores
            fontWeight="bold"
          >
            Cadastro de Aluno
          </FormLabel>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['sm', 'md']}>Nome</FormLabel>
          <Input
            name="nome"
            value={aluno.nome}
            onChange={handleChange}
            required
            size={['sm', 'md']} // Menor em celulares
            borderRadius="md"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['sm', 'md']}>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={aluno.email}
            onChange={handleChange}
            required
            size={['sm', 'md']}
            borderRadius="md"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['sm', 'md']}>Telefone</FormLabel>
          <Input
            name="telefone"
            value={aluno.telefone}
            onChange={handleChange}
            required
            size={['sm', 'md']}
            borderRadius="md"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['sm', 'md']}>Data de Nascimento</FormLabel>
          <Input
            name="dataNascimento"
            type="date"
            value={aluno.dataNascimento}
            onChange={handleChange}
            required
            size={['sm', 'md']}
            borderRadius="md"
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0" fontSize={['sm', 'md']}>
            Ativo
          </FormLabel>
          <Switch
            isChecked={aluno.ativo}
            onChange={handleToggle}
            size={['md', 'lg']} // Menor em celulares
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="yellow"
          width="full"
          size={['md', 'lg']} // Menor em celulares
          borderRadius="md"
        >
          Criar Aluno
        </Button>
      </VStack>
      <Box textAlign="center" mt={[4, 6]} bgColor="transparent">
        <Button
          bgColor="yellow.400"
          colorScheme="yellow"
          variant="outline"
          onClick={() => window.history.back()}
          size={['sm', 'md']} // Menor em celulares
          p={[2, 3]}
          borderRadius="md"
        >
          <ArrowBackIcon boxSize={[4, 6]} /> {/* Menor em celulares */}
        </Button>
      </Box>
    </Box>
  );
};

export default AlunoForm;