import React, { useEffect, useState } from 'react';
import { Box, Heading, List, ListItem, Text, Spinner } from '@chakra-ui/react';
import { Checkin } from '../types';
import { getCheckinsByAluno } from '../services/api';

interface CheckinListProps {
  alunoId: number;
}

const CheckinList: React.FC<CheckinListProps> = ({ alunoId }) => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const response = await getCheckinsByAluno(alunoId);
        setCheckins(response.data);
      } catch (error) {
        console.error('Erro ao buscar check-ins:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckins();
  }, [alunoId]);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading as="h2" size="lg" mb={4}>
        Check-ins do Aluno
      </Heading>
      <List spacing={3}>
        {checkins.map((checkin) => (
          <ListItem key={checkin.id} p={3} borderWidth="1px" borderRadius="md" boxShadow="sm">
            <Text>{checkin.idAluno.nome} - {new Date(checkin.dataHora).toLocaleString()}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CheckinList;