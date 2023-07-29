import { ImageBackground } from 'react-native';
import { styles } from './styles';
import imagem from '../../imagens/background-galaxy.png';

export function ImagemDeFundo({children}) {
  return (
    <ImageBackground
      source={imagem}
      defaultSource={imagem}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  )
}