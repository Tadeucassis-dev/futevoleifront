import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { getFotos, uploadFoto, deleteFoto } from "../services/api";

interface Foto {
  id: number;
  nome: string;
  url: string;
}

export function Fotos() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [titulo, setTitulo] = useState("");
  const toast = useToast();

  const carregarFotos = async () => {
    try {
      const lista = await getFotos();
      setFotos(lista as Foto[]);
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
      toast({
        title: "Erro ao carregar fotos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("foto", file);
        formData.append("titulo", titulo);
        await uploadFoto(formData);
        setFile(null);
        setTitulo("");
        carregarFotos();
        toast({
          title: "Foto enviada com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
        toast({
          title: "Erro ao fazer upload da foto.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Selecione um arquivo para enviar.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFoto(id);
      carregarFotos();
      toast({
        title: "Foto excluída com sucesso!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao excluir foto:", error);
      toast({
        title: "Erro ao excluir a foto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    carregarFotos();
  }, []);

  return (
    <Box
      p={[4, 6]}
      w="full"
      maxW="1400px"
      mx="auto"
      mt={["56px", "68px"]}
      minH="100vh"
      bg="gray.800"
      color="white"
      borderRadius="md"
    >
      <VStack spacing={6} align="start">
  <Heading size="lg">Galeria de Fotos</Heading>

  {/* FORMULÁRIO DE UPLOAD NO TOPO */}
  <Box w="full" pt={2}>
    <Heading size="md" mb={2}>Enviar nova foto</Heading>
    <Text mb={4}>Selecione uma foto e adicione um título.</Text>
    <Flex direction={["column", "row"]} gap={4} align={["stretch", "center"]}>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        bg="white"
        color="black"
        w={["100%", "auto"]}
      />
      <Input
        type="text"
        placeholder="Título da foto"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        bg="white"
        color="black"
        w={["100%", "300px"]}
      />
      <Button colorScheme="blue" onClick={handleUpload}>
        Enviar Foto
      </Button>
    </Flex>
  </Box>

  {/* GALERIA DE FOTOS */}
  <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} w="full" mt={10}>
    {fotos.map((foto) => (
      <Box
        key={foto.id}
        bg="gray.700"
        p={4}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Image
          src={`http://localhost:8080${foto.url}`}
          alt={foto.nome}
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="200px"
          mb={3}
        />
        <Text fontWeight="bold" mb={2}>
          {foto.nome}
        </Text>
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => handleDelete(foto.id)}
        >
          Excluir
        </Button>
      </Box>
    ))}
  </SimpleGrid>
</VStack>
    </Box>
  );
}

export default Fotos;
