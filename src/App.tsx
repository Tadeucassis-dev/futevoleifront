import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AlunoList from './components/AlunoList';
import CheckinList from './components/CheckinList';
import AlunoForm from './components/AlunoForm';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <h1>Futevolei do Lago</h1>
        <AlunoForm />
        <AlunoList />
        <CheckinList alunoId={1} />
      </div>
    </ChakraProvider>
  );
};

export default App;