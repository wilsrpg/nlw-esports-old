import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import CartaoDeJogo from '../componentes/CartaoDeJogo';
import carregando from '../imagens/loading.svg'

export default function Jogos() {
  let componenteExiste = true;
  const urlNaMinhaCasa = ""+import.meta.env.VITE_IP_NA_MINHA_CASA+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = ""+import.meta.env.VITE_IP_NA_CASA_DE_WISNEY+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
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
      if (componenteExiste) {
        definirErroAoObterDados(false);
        definirJogos(dados);
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (componenteExiste)
        definirErroAoObterDados(true);
    });

    return ()=>componenteExiste = false;
  }, [])

  return (
    <div className='jogosPagina'>
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
            <Link key={i} to={`/anuncios/${jogo.id}`}>
              <CartaoDeJogo jogo={jogo}/>
            </Link>
          )
        )
      }
    </div>
  )
}