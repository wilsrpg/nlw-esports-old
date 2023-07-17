import { FlatList, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import logo from '../../assets/logo-nlw-esports.png'
import { Titulo } from '../../components/Titulo';
import { CartaoDeJogo } from '../../components/CartaoDeJogo';
import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function TelaInicial() {
  const [jogos, definirJogos] = useState([]);
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const navegador = useNavigation();

  useEffect(()=>{
    fetch('http://192.168.0.144:3333/jogos')
    .then(resp=>resp.json())
    .then(dados=>{
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

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logo}
          style={styles.logo}
        />
        <Titulo
          titulo="Encontre seu duo!"
          subtitulo="Selecione o jogo que deseja jogar."
        />
        <FlatList
          contentContainerStyle={styles.lista}
          horizontal
          //showsHorizontalScrollIndicator={false}
          data={jogos}
          keyExtractor={item=>item.id}
          renderItem={({item})=>
            <CartaoDeJogo
              nome={item.nome}
              urlImagem={item.urlImagem}
              qtdeAnuncios={item._count.anuncios}
              onPress={()=>irParaTelaDoJogo(item)}
            />
          }
        />
      </SafeAreaView>
    </Background>
  )
}