import React, { useEffect, useState } from 'react'
import './App.css'
import logo from './imagens/NLW-eSports-Logo.svg'
import carregando from './imagens/loading.svg'
import CartaoDeJogo from './componentes/CartaoDeJogo'
import lupa from './imagens/magnifying-glass-plus-reverse.svg'
import ModalParaCriarAnuncio from './componentes/ModalParaCriarAnuncio';
import ModalDeJogoSelecionado from './componentes/ModalDeJogoSelecionado'

export default function App() {
  const urlNaMinhaCasa = 'http://192.168.1.33:3000';
  const urlNaCasaDeWisney = 'http://192.168.0.193:3000';
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [recarregarJogos, definirRecarregarJogos] = useState(false);
  const [jogos, definirJogos] = useState();
  const [exibindoModalParaCriarAnuncio, definirExibindoModalParaCriarAnuncio] = useState(false);
  const [jogoProModalDeAnuncios, definirJogoProModalDeAnuncios] = useState('');

  useEffect(()=>{
    if (exibindoModalParaCriarAnuncio && !recarregarJogos || jogoProModalDeAnuncios)
      return;
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
      console.log(erro);
      if (''+erro == 'AggregateError: No Promise in Promise.any was resolved')
        console.log('Não foi possível se comunicar com o servidor.');
      definirErroAoObterDados(true);
    })
    .finally(()=>definirRecarregarJogos(false));
  }, [exibindoModalParaCriarAnuncio,recarregarJogos,jogoProModalDeAnuncios])

  return (
    <div className='conteudo'>
      <img src={logo}/>
      <h1>Seu <span className="gradienteNlwGay">duo</span> está aqui.</h1>

      <div className='jogos'>
        {!jogos ?
          (!erroAoObterDados ?
            <img className='carregando' src={carregando}/>
          :
            <p>Erro ao obter dados dos jogos do servidor.</p>
          )
        :
          (jogos.length == 0 ?
            <p>Nenhum jogo cadastrado.</p>
          :
            jogos.map((jogo,id)=>
              <CartaoDeJogo
                key={id}
                jogo={jogo}
                funcDefinirJogoProModal={definirJogoProModalDeAnuncios}
              />
            )
          )
        }
      </div>

      <div className='caixaAtras gradienteNlwGay'>
        <div className='caixaFrente'>
          <div>
            <strong>Não encontrou seu duo?</strong>
            <p>Publique um anúncio para encontrar novos players!</p>
          </div>
          <button className='botaoAbrirModalPraPublicar roxinho' onClick={()=>definirExibindoModalParaCriarAnuncio(true)}>
            <img className='lupa' src={lupa}/>
            <span>Publicar anúncio</span>
          </button>
        </div>
      </div>

      {exibindoModalParaCriarAnuncio &&
        <ModalParaCriarAnuncio
          funcRecarregarJogos={()=>definirRecarregarJogos(true)}
          funcFechar={()=>definirExibindoModalParaCriarAnuncio(false)}
        />
      }

      {jogoProModalDeAnuncios &&
        <ModalDeJogoSelecionado
          jogo={jogoProModalDeAnuncios}
          funcFechar={()=>definirJogoProModalDeAnuncios('')}
        />
      }
    </div>
  )
}