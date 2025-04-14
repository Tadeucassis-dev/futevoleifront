import { extendTheme } from '@chakra-ui/react';



const theme = extendTheme({
  styles: {
    global: {
      // Define a cor de fundo para o body
      body: {
        bg: '#2c2c2c', // Substitua pela cor desejada, ex.: '#f0f0f0', 'blue.100', etc.
        color: '#fff', // Opcional: define a cor do texto padrão
      },
    },
  },
});

export default theme;