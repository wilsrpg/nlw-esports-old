import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { contexto } from '../App';
import CartaoDeJogo from '../componentes/CartaoDeJogo';
import carregando from '../imagens/loading.svg'

export default function Jogos() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const urlNaMinhaCasa = contexto2.hostCasa;
  const urlNaCasaDeWisney = contexto2.hostWisney;
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
      if (''+erro == 'AggregateError: No Promise in Promise.any was resolved')
        console.log('Não foi possível se comunicar com o servidor.');
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
            <Link key={i} to={`/anuncios/${jogo.nomeUrl}`}>
              <CartaoDeJogo jogo={jogo}/>
            </Link>
          )
        )
      }
    </div>
  )
}