import React, { useContext, useEffect, useState } from 'react'
import logo from '../imagens/NLW-eSports-Logo.svg'
import carregando from '../imagens/loading.svg'
import CartaoDeJogo from '../componentes/CartaoDeJogo'
import lupa from '../imagens/magnifying-glass-plus-reverse.svg'
import ModalParaCriarAnuncio from '../componentes/ModalParaCriarAnuncio';
import ModalDeJogoSelecionado from '../componentes/ModalDeJogoSelecionado'
import { SERVIDOR } from '../../../enderecoDoServidor';
import { contexto } from '../App'
import { Link } from 'react-router-dom'

export default function App() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [recarregarJogos, definirRecarregarJogos] = useState(false);
  const [jogos, definirJogos] = useState();
  const [exibindoModalParaCriarAnuncio, definirExibindoModalParaCriarAnuncio] = useState(false);
  const [jogoProModalDeAnuncios, definirJogoProModalDeAnuncios] = useState('');

  useEffect(()=>{

    return ()=>componenteExiste = false;
  }, [])

  useEffect(()=>{
    if (exibindoModalParaCriarAnuncio && !recarregarJogos || jogoProModalDeAnuncios)
      return;
    fetch(SERVIDOR+`/jogos`)
    .then(resp=>resp.json())
    .then(dados=>{
      if (componenteExiste) {
        definirErroAoObterDados(false);
        definirJogos(dados);
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (componenteExiste)
        definirErroAoObterDados(true);
    })
    .finally(()=>{
      if (componenteExiste)
        definirRecarregarJogos(false);
    });
  }, [exibindoModalParaCriarAnuncio,recarregarJogos,jogoProModalDeAnuncios])

  return (
    <>
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
            jogos.map((jogo,i)=>
              <Link key={i} to={`/anuncios/?jogo=${jogo.nomeUrl}`}>
                <CartaoDeJogo jogo={jogo}/>
              </Link>
              //<CartaoDeJogo
              //  key={i}
              //  jogo={jogo}
              //  funcDefinirJogoProModal={definirJogoProModalDeAnuncios}
              ///>
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
          <Link to={contexto2.usuarioLogado ? '/novoanuncio' : '/entrar'}
            className={`botaoAbrirModalPraPublicar botao ${contexto2.usuarioLogado ? 'semShrink' : ''}`}
          >
          {/*<button className='botaoAbrirModalPraPublicar'
            onClick={()=>definirExibindoModalParaCriarAnuncio(true)}
          >*/}
            <img className='lupa' src={lupa}/>
            <span>{contexto2.usuarioLogado ? 'Publicar anúncio' : 'Entre para publicar um anúncio'}</span>
          {/*</button>*/}
          </Link>
        </div>
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
    </>
  )
}