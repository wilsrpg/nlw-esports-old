import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { ImagemDeFundo } from './src/componentes/ImagemDeFundo';
import { Carregando } from './src/componentes/Carregando';
import { Rotas } from './src/rotas';

export default function App() {
  const [carregouFontes] = useFonts({Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black});

  return (
    <ImagemDeFundo>
      <StatusBar
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />
        {!carregouFontes ? <Carregando/> : <Rotas/>}
    </ImagemDeFundo>
  );
}