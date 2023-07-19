import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';

export function CartaoDeJogo(props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.funcTocar}
    >
      <ImageBackground
        style={styles.cartao}
        source={{uri: props.urlImagem}}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.rodape}
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