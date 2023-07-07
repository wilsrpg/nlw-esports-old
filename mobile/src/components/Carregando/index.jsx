import { View, ActivityIndicator } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Carregando() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={THEME.COLORS.PRIMARY}/>
    </View>
  )
}