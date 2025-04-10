import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Switch, VStack } from '@chakra-ui/react';
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
    <Box p={4} maxW="400px" mx="auto" h="calc(100vh - 68px - 53px)" alignContent={"center"}  justifyContent={"center"}>
      
      <form onSubmit={handleSubmit}>
        <VStack >
        
          <FormControl>
            <FormLabel textAlign="center" fontSize="2xl" >Cadastro de Aluno</FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input name="nome" value={aluno.nome} onChange={handleChange} required />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={aluno.email} onChange={handleChange} required />
          </FormControl>
          <FormControl>
            <FormLabel>Telefone</FormLabel>
            <Input name="telefone" value={aluno.telefone} onChange={handleChange} required />
          </FormControl>
          <FormControl>
            <FormLabel>Data de Nascimento</FormLabel>
            <Input name="dataNascimento" type="date" value={aluno.dataNascimento} onChange={handleChange} required />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Ativo</FormLabel>
            <Switch isChecked={aluno.ativo} onChange={handleToggle} />
          </FormControl>
          <Button type="submit" colorScheme="teal">Criar Aluno</Button>
        </VStack>
      </form>
      <Box mb={4} textAlign="center" mt={6} >
        <Button colorScheme="blue" onClick={() => window.history.back()}>Voltar</Button>
      </Box>
    </Box>
    
  );
};

export default AlunoForm;