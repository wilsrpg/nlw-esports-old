import { Modal, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign  } from '@expo/vector-icons';
import { setStringAsync } from 'expo-clipboard';
import { styles } from './styles';
import { THEME } from '../../tema';
import { Titulo } from '../Titulo';

export function ModalConectar({discord, funcFechar}) {
  const [copiando, definirCopiando] = useState(false);

  async function copiar(){
    await setStringAsync(discord);
    Alert.alert('Discord copiado.', 'Nome de Discord do usuário copiado para área de transferência. Agora é só entrar em contato através do Discord.');
    definirCopiando(false);
  }

  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      visible={discord.length > 0}
    >
      <View style={styles.container} onTouchStart={funcFechar}>
        <View style={styles.conteudo} onTouchStart={(e)=>{e.stopPropagation()}}>
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
          <View style={styles.caixaDiscord}>
            <Text style={styles.discord}>
              {discord}
            </Text>
            {copiando ?
              <ActivityIndicator/>
            :
              <TouchableOpacity
                onPress={()=>{
                  definirCopiando(true);
                  copiar();
                }}
                disabled={copiando}
              >
                <AntDesign
                  name="copy1"
                  size={20}
                  color={THEME.COLORS.SUCCESS}
                />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    </Modal>
  )
}