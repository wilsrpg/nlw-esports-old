import { FlatList, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { ImagemDeFundo } from '../../componentes/ImagemDeFundo';
import logo from '../../imagens/logo-nlw-esports.png'
import { Titulo } from '../../componentes/Titulo';
import { Carregando } from '../../componentes/Carregando';
import { CartaoDeJogo } from '../../componentes/CartaoDeJogo';
//import { SERVIDOR } from '../../../../enderecoDoServidor';
import { SERVIDOR0 as SERVIDOR } from '@env';

export function TelaInicial() {
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const navegador = useNavigation();
  const [jogos, definirJogos] = useState();

  useFocusEffect(useCallback(()=>{
    fetch(SERVIDOR+`/jogos`)
    .then(resp=>resp.json())
    .then(dados=>{
      definirErroAoObterDados(false);
      definirJogos(dados);
    })
    .catch(erro=>{
      console.log(erro);
      if (!jogos)
        definirErroAoObterDados(true);
    });
  }, []))

  return (
    <ImagemDeFundo>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewConteudo}
        >
          <Image
            source={logo}
            style={styles.logo}
          />
          <Titulo
            titulo="Encontre seu duo!"
            subtitulo="Selecione o jogo que deseja jogar."
          />
          {erroAoObterDados ?
            <Text style={styles.textoConteudoVazio}>
              Erro ao obter dados dos jogos do servidor.
            </Text>
          :
            !jogos ? <Carregando/>
            :
              <FlatList
                style={styles.lista}
                contentContainerStyle={jogos && jogos.length > 0 ? styles.listaConteudo : styles.listaConteudoVazio}
                horizontal
                //showsHorizontalScrollIndicator={false}
                data={jogos}
                keyExtractor={item=>item.id}
                renderItem={({item})=>
                  <CartaoDeJogo
                    nome={item.nome}
                    urlImagem={item.urlImagem}
                    qtdeAnuncios={item._count.anuncios}
                    funcTocar={()=>navegador.navigate('telaDoJogo', item)}
                  />
                }
                ListEmptyComponent={()=>
                  <Text style={styles.textoConteudoVazio}>
                    Nenhum jogo cadastrado.
                  </Text>
                }
              />
          }
          <Titulo
            titulo="Não encontrou seu duo?"
            subtitulo="Publique um anúncio para encontrar novos players!"
          />
          <TouchableOpacity
            style={styles.botaoPublicarAnuncio}
            onPress={()=>navegador.navigate('telaDeCriacaoDeAnuncio')}
          >
            <SimpleLineIcons name="magnifier-add" size={24} color="white"/>
            <Text style={styles.textoPublicarAnuncio}>
              Publicar anúncio
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImagemDeFundo>
  )
}