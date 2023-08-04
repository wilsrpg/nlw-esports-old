import { TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import { THEME } from '../../tema';
import logo from '../../imagens/logo-nlw-esports.png';

export function Cabecalho() {
  const navegador = useNavigation();

  return (
    <View style={styles.cabecalho}>
      <TouchableOpacity onPress={navegador.goBack}>
        <Entypo
          name='chevron-thin-left'
          color={THEME.COLORS.CAPTION_300}
          size={24}
        />
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={logo}
      />
      <View/>
      {/*<Entypo
        name='chevron-thin-right'
        color={THEME.COLORS.CAPTION_300}
        size={24}
      />*/}
    </View>
  )
}