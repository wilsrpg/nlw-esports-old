import { Modal, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { THEME } from '../../theme';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign  } from '@expo/vector-icons';
import { setStringAsync } from 'expo-clipboard';
import { Titulo } from '../Titulo';

export function ModalConectar({discord, funcFechar}) {
  const [copiando, definirCopiando] = useState(false);

  async function copiar(){
    definirCopiando(true);
    await setStringAsync(discord);
    Alert.alert('Discord copiado.', 'Nome de Discord do usuário copiado para área de transferência. Agora é só entrar em contato através do Discord.')
    definirCopiando(false);
  }

  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      visible={discord.length > 0}
    >
      <View style={styles.container}>
        <View style={styles.conteudo}>
          <TouchableOpacity
            onPress={funcFechar}
            style={styles.botaoFechar}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <AntDesign
            name="checkcircleo"
            size={64}
            color={THEME.COLORS.SUCCESS}
          />
          <Titulo
            titulo="Let's play!"
            subtitulo="Agora é só começar a jogar!"
          />
          <Text style={styles.texto}>
            Adicione no Discord:
          </Text>
          <TouchableOpacity
            style={styles.botaodiscord}
            onPress={copiar}
            disabled={copiando}
          >
            <Text style={styles.discord}>
              {copiando ? <ActivityIndicator/> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}