import React, { useEffect, useState } from 'react'
import './App.css'
import nlwLogo from './assets/NLW-eSports-Logo.svg'
import carregando from './assets/loading.svg'
import CartaoDeJogo from './components/CartaoDeJogo'
import lupa from './assets/magnifying-glass-plus-reverse.svg'
import ModalParaCriarAnuncio from './components/ModalParaCriarAnuncio';
import ModalDeJogoSelecionado from './components/ModalDeJogoSelecionado'

export default function App() {
  const [jogos, definirJogos] = useState();
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [exibindoModalParaCriarAnuncio, definirExibindoModalParaCriarAnuncio] = useState(false);
  const [modalDeAnunciosIdDoJogo, definirModalDeAnunciosIdDoJogo] = useState('');

  useEffect(()=>{
    //cadastro inicial dos 6 jogos pra teste
    //n prestou
    //fetch("http://localhost:3333/cadastrarjogospadrao");

    fetch("http://localhost:3333/jogos")
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

  return (
    <div className='tudo'>
      <img src={nlwLogo}/>
      <div>
        <h1 className='titulo'>
          Seu <span className="nlw-gradient">duo</span> está aqui.
        </h1>

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
                  funcDefinirIdJogo={definirModalDeAnunciosIdDoJogo}
                />
              )
            )
          }
          {/*{erroAoObterDados && <p>Erro ao obter dados dos jogos do servidor.</p>}
          {jogos &&
            (jogos.length == 0 ?
              <p>Nenhum jogo cadastrado.</p>
            :
              jogos.map((jogo,id)=>
                <CartaoDeJogo
                  key={id}
                  jogo={jogo}
                  funcDefinirIdJogo={definirModalDeAnunciosIdDoJogo}
                />
              )
            )
          }*/}
        </div>

        <div className='caixa nlw-gradient'>
          <div>
            <div>
              <strong>Não encontrou seu duo?</strong>
              <p>Publique um anúncio para encontrar novos players!</p>
            </div>
            <button className='botao-publicar roxinho' onClick={()=>definirExibindoModalParaCriarAnuncio(true)}>
              <img className='lupa' src={lupa}/>
              Publicar anúncio
            </button>
          </div>
        </div>

        {exibindoModalParaCriarAnuncio &&
          <ModalParaCriarAnuncio
            funcFechar={()=>definirExibindoModalParaCriarAnuncio(false)}
          />
        }
        
        {modalDeAnunciosIdDoJogo &&
          <ModalDeJogoSelecionado
            jogoId={modalDeAnunciosIdDoJogo}
            funcFechar={()=>definirModalDeAnunciosIdDoJogo('')}
          />
        }
      </div>
    </div>
  )
}