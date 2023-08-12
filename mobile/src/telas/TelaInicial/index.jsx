import { FlatList, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { ImagemDeFundo } from '../../componentes/ImagemDeFundo';
import logo from '../../imagens/logo-nlw-esports.png'
import { Titulo } from '../../componentes/Titulo';
import { Carregando } from '../../componentes/Carregando';
import { CartaoDeJogo } from '../../componentes/CartaoDeJogo';
import { IP_NA_MINHA_CASA, IP_NA_CASA_DE_WISNEY, PORTA_DO_SERVIDOR } from '@env'

export function TelaInicial() {
  const urlNaMinhaCasa = ""+IP_NA_MINHA_CASA+":"+PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = ""+IP_NA_CASA_DE_WISNEY+":"+PORTA_DO_SERVIDOR;
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const navegador = useNavigation();
  //const [carregarJogos, definirCarregarJogos] = useState(true);
  //const [recarregarJogos, definirRecarregarJogos] = useState(false);
  //const recarregarJogosAoVoltarRef = useRef(true);
  const [jogos, definirJogos] = useState();
  //console.log(recarregarJogosAoVoltarRef.current);

  /*useFocusEffect(useCallback(()=>{}));


  useEffect(()=>{
    //if (rota.params && rota.params.recarregarAoVoltar) {
    //if (recarregarJogos) {
    if (recarregarJogosAoVoltarRef.current) {
      definirCarregarJogos(true);
      //rota.params.recarregarAoVoltar = false;
      //definirRecarregarJogos(false);
      //recarregarJogosAoVoltarRef.current = false;
    }
    recarregarJogosAoVoltarRef.current = !recarregarJogosAoVoltarRef.current;
    console.log("dentro:"+recarregarJogosAoVoltarRef.current);
  })*/

  //useEffect(()=>{
  //useFocusEffect(useCallback(()=>{
  useFocusEffect(useCallback(()=>{
    //if (!carregarJogos)
      //return;
    //console.log("carregando...");
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
      if (!jogos)
        definirErroAoObterDados(true);
      console.log(erro);
    });
    //.finally(()=>definirCarregarJogos(false));
  }, []))
  //}, [carregarJogos])

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