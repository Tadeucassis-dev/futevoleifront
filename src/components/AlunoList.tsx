import React, { useEffect, useState } from 'react';
import { Box, Heading, ListItem, Text, Spinner, VStack, List } from '@chakra-ui/react';
import { Aluno } from '../types';
import { getAlunos } from '../services/api';

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await getAlunos();
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlunos();
  }, []);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading as="h2" size="lg" mb={4}>
        Lista de Alunos
      </Heading>
      <List spacing={3} styleType="disc">
        {alunos.map((aluno) => (
          <ListItem key={aluno.id} p={3} borderWidth="1px" borderRadius="md" boxShadow="sm">
            <VStack align="start">
              <Text fontWeight="bold">{aluno.nome}</Text>
              <Text>{aluno.email}</Text>
              <Text color={aluno.ativo ? 'green.500' : 'red.500'}>
                {aluno.ativo ? 'Ativo' : 'Inativo'}
              </Text>
            </VStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AlunoList;