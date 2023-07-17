import { StatusBar } from 'expo-status-bar';
import { Background } from './src/components/Background';
import { Carregando } from './src/components/Carregando';
import { Rotas } from './src/rotas';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';

export default function App() {
  const [carregouFontes] = useFonts({Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black});

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />
      {carregouFontes ? <Rotas/> : <Carregando/>}
    </Background>
  );
}