import { FlatList, Image, ScrollView, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { ImagemDeFundo } from '../../componentes/ImagemDeFundo';
import { Cabecalho } from '../../componentes/Cabecalho';
import { Titulo } from '../../componentes/Titulo';
import { Carregando } from '../../componentes/Carregando';
import { CartaoDeAnuncio } from '../../componentes/CartaoDeAnuncio';
import { ModalConectar } from '../../componentes/ModalConectar';
import { IP_NA_MINHA_CASA, IP_NA_CASA_DE_WISNEY, PORTA_DO_SERVIDOR } from '@env'

export function TelaDoJogo() {
  const urlNaMinhaCasa = ""+IP_NA_MINHA_CASA+":"+PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = ""+IP_NA_CASA_DE_WISNEY+":"+PORTA_DO_SERVIDOR;
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const rota = useRoute();
  const jogo = rota.params;
  const [anuncios, definirAnuncios] = useState();
  const [discord, definirDiscord] = useState('');

  useEffect(()=>{
    const endereco = `/jogos/${jogo.id}/anuncios`;
    const abortista = new AbortController();
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      definirErroAoObterDados(false);
      definirAnuncios(dados);
    })
    .catch(erro=>{
      definirErroAoObterDados(true);
      console.log(erro);
    });
  }, [])

  async function obterDiscord(anuncioId) {
    const endereco = `/anuncios/${anuncioId}/discord`;
    const abortista = new AbortController();
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      definirErroAoObterDados(false);
      definirDiscord(dados.discord);
    })
    .catch(erro=>{
      definirErroAoObterDados(true);
      console.log(erro);
    });
  }

  return (
    <ImagemDeFundo>
      <SafeAreaView style={styles.container}>
        <Cabecalho/>
        <ScrollView contentContainerStyle={styles.scrollConteudo}>
          <Image
            source={{uri: jogo.urlImagem}}
            style={styles.imagemDoJogo}
            resizeMode='cover'
          />
          <Titulo
            titulo={jogo.nome}
            subtitulo="Conecte-se e comece a jogar!"
          />

          {erroAoObterDados ?
            <Text style={styles.textoConteudoVazio}>
              Erro ao obter dados dos anúncios do servidor.
            </Text>
          :
            !anuncios ? <Carregando/> :
            <>
              {anuncios.length > 0 &&
                <Text style={styles.textoConteudoVazio}>
                  {anuncios.length} anúncio{anuncios.length > 1 ? 's' : ''}
                </Text>
              }
              <FlatList
                style={styles.lista}
                contentContainerStyle={anuncios.length > 0 ? styles.listaConteudo : styles.listaConteudoVazio}
                horizontal
                data={anuncios}
                keyExtractor={item=>item.id}
                renderItem={({item})=>
                  <CartaoDeAnuncio
                    anuncio={item}
                    funcConectar={()=>obterDiscord(item.id)}
                  />
                }
                ListEmptyComponent={()=>
                  <Text style={styles.textoConteudoVazio}>
                    Nenhum anúncio publicado.
                  </Text>
                }
              />
            </>
          }
          {/*{discord.length > 0 &&*/}
            <ModalConectar
              discord={discord}
              funcFechar={()=>definirDiscord('')}
            />
          {/*}*/}
        </ScrollView>
      </SafeAreaView>
    </ImagemDeFundo>
  )
}