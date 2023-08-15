import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CartaoDeAnuncio from '../componentes/CartaoDeAnuncio';
import carregando from '../imagens/loading.svg'
import ModalConectar from '../componentes/ModalConectar';

export default function Anuncios() {
  let componenteExiste = true;
  const urlNaMinhaCasa = import.meta.env.VITE_IP_NA_MINHA_CASA+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = import.meta.env.VITE_IP_NA_CASA_DE_WISNEY+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const {jogoId} = useParams();
  const [jogos, definirJogos] = useState();
  const [anuncios, definirAnuncios] = useState();
  const [discord, definirDiscord] = useState('');
  //const [usuarioLogado, definirUsuarioLogado] = useState(sessionStorage.getItem("usuarioLogado"));

  useEffect(()=>{

    return ()=>componenteExiste = false;
  }, [])

  useEffect(()=>{
    let endereco;
    const abortista = new AbortController();
    if(jogoId)
      endereco = `/jogos/${jogoId}`;
    else
      endereco = `/jogos`
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      if (componenteExiste) {
        definirErroAoObterDados(false);
        if(jogoId)
          definirJogos([dados]);
        else
          definirJogos(dados);
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (componenteExiste)
        definirErroAoObterDados(true);
    });
  }, [jogoId])

  useEffect(()=>{
    let endereco;
    const abortista = new AbortController();
    if(jogoId)
      endereco = `/jogos/${jogoId}/anuncios`;
    else
      endereco = `/anuncios`
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      if (componenteExiste) {
        definirErroAoObterDados(false);
        definirAnuncios(dados);
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (componenteExiste)
        definirErroAoObterDados(true);
    });
  }, [jogoId])

  function obterDiscord(anuncioId) {
    const endereco = `/anuncios/${anuncioId}/discord`;
    const abortista = new AbortController();
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      if (componenteExiste) {
        definirErroAoObterDados(false);
        definirDiscord(dados.discord);
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (componenteExiste)
        definirErroAoObterDados(true);
    });
  }

  return (
    <>
    {!jogos || !anuncios ?
      (!erroAoObterDados ?
        <img className='carregando' src={carregando}/>
      :
        <p>Erro ao obter dados dos anúncios do servidor.</p>
      )
    :
      (anuncios.length == 0 ?
        <p>Nenhum anúncio publicado.</p>
      :
        <p>{anuncios.length} anúncio{anuncios.length > 1 ? 's' : ''}</p>
      )
    }
    <div className='jogosPagina'>
      {jogos && anuncios &&
        anuncios.map((anuncio,i)=>
          <CartaoDeAnuncio
            key={i}
            jogo={(()=>{
              let jogoIndice;
              //console.log(anuncio);
              //console.log(anuncio.jogoId);
              //console.log('||');
              jogos.some((jogo,j)=>{
                //console.log(jogo.id);
                if(jogo.id == anuncio.jogoId)
                  jogoIndice = j;
              })
              //console.log(jogos[jogoIndice]);
              return jogos[jogoIndice];
            })()}
            anuncio={anuncio}
            funcConectar={()=>obterDiscord(anuncio.id)}
          />
        )
      }
      {discord && <ModalConectar discord={discord} funcFechar={()=>definirDiscord('')}/>}
    </div>
    </>
  )
}