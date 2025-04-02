import { Text } from '@chakra-ui/react';

export function Header() {
    return (    
        <header style={{ background: '	#1C1C1C', padding: '12px', textAlign: 'center' }}>
            <Text fontSize="2xl" color="white">Bem-vindo ao Futevôlei do Lago</Text>
        </header>
    );
}