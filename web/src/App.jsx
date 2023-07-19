import React, { useEffect, useState } from 'react'
import './App.css'
import nlwLogo from './assets/NLW-eSports-Logo.svg'
import CartaoDeJogo from './components/CartaoDeJogo'
import CaixaParaPublicarAnuncio from './components/CaixaParaPublicarAnuncio'

export default function App() {
  const [jogos, definirJogos] = useState([]);
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);

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

  //useEffect(()=>{
  //  console.log("ef jogos");
  //  console.log(jogos);
  //}, [jogos])

  return (
    <div className='tudo'>
      <img className='nlw-logo' src={nlwLogo} />
      <div>
        <h1 className='titulo'>
          Seu <span className="nlw-gradient">duo</span> está aqui.
        </h1>

        <div className='jogos'>
          {erroAoObterDados && <p>Erro ao obter dados dos jogos.</p>}
          {jogos.map((jogo,id)=>
            <CartaoDeJogo key={id}
              nome={jogo.nome}
              url={jogo.url}
              urlImagem={jogo.urlImagem}
              qtdeAnuncios={jogo._count.anuncios}
            />
          )}
        </div>

        <CaixaParaPublicarAnuncio />
      </div>
    </div>
  )
}