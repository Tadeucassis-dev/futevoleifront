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
  py={[8, 12]}
  mt={['56px', '68px']} // Alinha com a altura do header
  borderRadius="md"
  boxShadow="lg"
  bgColor={'#fff'}
>
      <VStack spacing={[4, 6]} as="form" onSubmit={handleSubmit} >
        <FormControl >
          <FormLabel
            textAlign="center"
            fontSize={['xl', '2xl']} // xl em celulares, 2xl em telas maiores
            fontWeight="bold"
            color="#000"
          >
            Cadastro de Aluno
          </FormLabel>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['sm', 'md']} color="#000">Nome</FormLabel>
          <Input
            name="nome"
            value={aluno.nome}
            onChange={handleChange}
            required
            size={['sm', 'md']} // Menor em celulares
            borderRadius="md"
            color="#000"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['sm', 'md']} color="#000">Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={aluno.email}
            onChange={handleChange}
            required
            size={['sm', 'md']}
            borderRadius="md"
            color="#000"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['sm', 'md']} color="#000">Telefone</FormLabel>
          <Input
            name="telefone"
            value={aluno.telefone}
            onChange={handleChange}
            required
            size={['sm', 'md']}
            borderRadius="md"
            color="#000"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['sm', 'md']} color="#000">Data de Nascimento</FormLabel>
          <Input
            name="dataNascimento"
            type="date"
            value={aluno.dataNascimento}
            onChange={handleChange}
            required
            size={['sm', 'md']}
            borderRadius="md"
            color="#000"
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0" fontSize={['sm', 'md']} color="#000">
            Ativo
          </FormLabel>
          <Switch
            isChecked={aluno.ativo}
            onChange={handleToggle}
            borderRadius="md"
            colorScheme="green"
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="yellow"
          width="full"
          size={['md', 'lg']} // Menor em celulares
          borderRadius="md"
        >
          Cadastrar
        </Button>
      </VStack>
      <Box textAlign="center" mt={[4, 6]} bgColor="transparent">
        <Button
          colorScheme="yellow.400"
          bgColor={'yellow.400'}
          _hover={{ bgColor: 'yellow.300' }}
          color="#000"
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