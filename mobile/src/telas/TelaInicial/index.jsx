import { FlatList, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import logo from '../../assets/logo-nlw-esports.png'
import { Titulo } from '../../components/Titulo';
import { CartaoDeJogo } from '../../components/CartaoDeJogo';
import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';
import { Carregando } from '../../components/Carregando';
import { SimpleLineIcons } from '@expo/vector-icons';
import {IP_NA_MINHA_CASA, IP_NA_CASA_DE_WISNEY, PORTA_DO_SERVIDOR } from '@env'

export function TelaInicial() {
  const urlNaMinhaCasa = ""+IP_NA_MINHA_CASA+":"+PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = ""+IP_NA_CASA_DE_WISNEY+":"+PORTA_DO_SERVIDOR;
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const navegador = useNavigation();
  const [jogos, definirJogos] = useState();

  useEffect(()=>{
    const endereco = `/jogos`;
    const abortista = new AbortController();
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      definirErroAoObterDados(false);
      definirJogos(dados);
    })
    .catch(erro=>{
      definirErroAoObterDados(true);
      console.log(erro);
    })
  }, [])

  function irParaTelaDoJogo(jogo) {
    //console.log(jogo);
    navegador.navigate('telaDoJogo', jogo);
  }
  
  function irParaTelaDeCriacaoDeAnuncio() {
    navegador.navigate('telaDeCriacaoDeAnuncio');
  }

  return (
    <Background>
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
                    funcTocar={()=>irParaTelaDoJogo(item)}
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
            onPress={irParaTelaDeCriacaoDeAnuncio}
          >
            <SimpleLineIcons name="magnifier-add" size={24} color="white"/>
            <Text style={styles.textoPublicarAnuncio}>
              Publicar anúncio
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Background>
  )
}