import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import logo from '../../assets/logo-nlw-esports.png';
import { Titulo } from '../../components/Titulo';
import { Background } from '../../components/Background';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { CartaoDeAnuncio } from '../../components/CartaoDeAnuncio';
import { useEffect, useState } from 'react';
import { Carregando } from '../../components/Carregando';

export function TelaDoJogo() {
  const rota = useRoute();
  const jogo = rota.params;
  const navegador = useNavigation();
  const [anuncios, definirAnuncios] = useState();
  //console.log(jogo);

  useEffect(()=>{
    fetch(`http://192.168.0.144:3333/jogos/${jogo.id}/anuncios`)
    .then(resp=>resp.json())
    .then(dados=>definirAnuncios(dados))
    .catch(erro=>console.log(erro));
  }, [])

  function conectar() {
    console.log("clicou em conectar");
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.cabecalho}>
          <TouchableOpacity onPress={navegador.goBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image style={styles.logo}
            source={logo}
          />
          <Entypo
            name='chevron-thin-right'
            color={THEME.COLORS.CAPTION_300}
            size={20}
          />
        </View>
        <Image
          source={{uri: jogo.urlImagem}}
          style={styles.imagemDoJogo}
          resizeMode='cover'
        />
        <Titulo
          titulo={jogo.nome}
          subtitulo="Conecte-se e comece a jogar!"
        />

        {!anuncios ? <Carregando/> :
          <FlatList
            style={styles.lista}
            contentContainerStyle={anuncios.length > 0 ? styles.listaConteudo : styles.listaConteudoVazio}
            horizontal
            //showsHorizontalScrollIndicator={false}
            data={anuncios}
            keyExtractor={item=>item.id}
            renderItem={({item})=>
              <CartaoDeAnuncio
                anuncio={item}
                funcConectar={conectar}
              />
            }
            ListEmptyComponent={()=>
              <Text style={styles.textoConteudoVazio}>
                Nenhum anúncio.
              </Text>
            }
          />
        }
      </SafeAreaView>
    </Background>
  )
}