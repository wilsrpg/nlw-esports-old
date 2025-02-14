import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { THEME } from '../../tema';

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
            {props.qtdeAnuncios == 0 ? 'Nenhum' : props.qtdeAnuncios} anúncio{props.qtdeAnuncios > 1 && 's'}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}