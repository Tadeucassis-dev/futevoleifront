// theme.ts


const theme = extendTheme({
  // Configurações personalizadas do tema, se houver
  colors: {
    brand: {
      500: '#1a202c',
    },
  },
});

export default theme;

function extendTheme(arg0: {
    // Configurações personalizadas do tema, se houver
    colors: { brand: { 500: string; }; };
}) {
    throw new Error("Function not implemented.");
}
