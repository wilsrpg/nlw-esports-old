import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Background } from './src/components/Background';
import { Carregando } from './src/components/Carregando';

export default function App() {
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        //backgroundColor='transparent'
        //translucent
      />
      <TelaInicial/>
    </Background>
  );
}