import { ImageBackground, TouchableOpacity } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

export function CartaoDeJogo() {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        style={styles.cartao}
        source={props.imagem}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.f}
        >
          <Text style={styles.nome}>
            {props.nome}
          </Text>
          <Text style={styles.anuncios}>
            {props.qtdeAnuncios} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}