import { View, Text } from 'react-native';
import { styles } from './styles';

export function Titulo({titulo, subtitulo}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {titulo}
      </Text>
      <Text style={styles.subtitulo}>
        {subtitulo}
      </Text>
    </View>
  )
}