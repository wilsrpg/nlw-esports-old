import { View, Text, ViewProps } from 'react-native';
import { styles } from './styles';

export function Titulo(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {props.titulo}
      </Text>
      <Text style={styles.subtitulo}>
        {props.subtitulo}
      </Text>
    </View>
  )
}