import { View, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { THEME } from '../../tema';

export function Carregando() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={THEME.COLORS.PRIMARY}/>
    </View>
  )
}