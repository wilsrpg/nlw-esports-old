import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export function CartaoDeAnuncio({anuncio,funcConectar}) {
  return (
    <View style={styles.container}>

      <Text style={styles.rotulo}>
        Nome ou apelido
      </Text>
      <Text style={styles.valor}>
        {anuncio.nomeDoUsuario}
      </Text>

      <Text style={styles.rotulo}>
        Tempo de jogo
      </Text>
      <Text style={styles.valor}>
        {anuncio.tempoDeJogoEmAnos} ano(s)
      </Text>

      <Text style={styles.rotulo}>
        Disponibilidade
      </Text>
      <Text style={styles.valor}>
        {anuncio.diasQueJoga.length + " dia(s) • " + anuncio.deHora + " - " + anuncio.ateHora}
      </Text>

      <Text style={styles.rotulo}>
        Chamada de voz
      </Text>
      <Text style={[styles.valor, anuncio.usaChatDeVoz ? styles.verde : styles.vermelho]}>
        {anuncio.usaChatDeVoz ? "Sim" : "Não"}
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={funcConectar}
      >
        <Text style={styles.botaoTitulo}>
          Conectar
        </Text>
      </TouchableOpacity>

    </View>
  )
}