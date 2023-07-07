import { FlatList, View } from 'react-native';
import { styles } from './styles';
import logo from '../../assets/logo-nlw-esports.png'
import { Titulo } from '../../components/Titulo';
import { GAMES } from '../../utils/games';

export function TelaInicial() {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
      />
      <Titulo
        titulo="titulo"
        subtitulo="sub"
      />
      <FlatList
        style={styles.lista}
        data={GAMES}
        keyExtractor={item=>item.id}
        renderItem={({item})=>
          <CartaoDeJogo
            nome={item.name}
            imagem={item.cover}
            qtdeAnuncios={item.ads}
          />
        }
        horizontal
        //showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}