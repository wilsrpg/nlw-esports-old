import React, { useEffect, useState } from 'react'
import CartaoDeAnuncio from './CartaoDeAnuncio';
import carregando from '../imagens/loading.svg'
import ModalConectar from './ModalConectar';
import iconeFechar from '../imagens/x.svg'

export default function ModalDeJogoSelecionado({jogo, funcFechar}) {
  const urlNaMinhaCasa = import.meta.env.VITE_IP_NA_MINHA_CASA+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = import.meta.env.VITE_IP_NA_CASA_DE_WISNEY+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
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

  useEffect(()=>{
    if(!discord)
      document.body.onkeydown = (e)=>{fechar(e)};
  }, [discord])

  function fechar(e) {
    if(e.repeat) return;
    if(e.key == "Escape")
      funcFechar();
  }

  function obterDiscord(anuncioId) {
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
    <div className={`modalAnuncioFora ${discord && ' semFundo'}`} onClick={funcFechar}>
      <div className="modalAnuncio" onClick={(e)=>e.stopPropagation()}>

        <img className='botaoCopiar botaoFechar' src={iconeFechar} onClick={funcFechar}/>
        <div className='jogoSelecionado'>
          <img className='imagemDoJogo' src={jogo.urlImagem}/>
          <div>
            <h2>{jogo.nome}</h2>
            <strong>Conecte-se e comece a jogar!</strong>
            {anuncios && anuncios.length > 0 && <p>{anuncios.length} anúncio{anuncios.length > 1 ? 's' : ''}</p>}
          </div>
        </div>

        <div className='anuncios'>
          {!anuncios ?
            (!erroAoObterDados ?
              <img className='carregando' src={carregando}/>
            :
              <p>Erro ao obter dados dos anúncios do servidor.</p>
            )
          :
            (anuncios.length == 0 ?
              <p>Nenhum anúncio publicado.</p>
            :
              anuncios.map((anuncio,id)=>
                <CartaoDeAnuncio
                  key={id}
                  anuncio={anuncio}
                  funcConectar={()=>obterDiscord(anuncio.id)}
                />
              )
            )
          }
        </div>

        {discord &&
          <ModalConectar discord={discord} funcFechar={()=>definirDiscord('')}/>
          //<div className='flex alignCenter'>
          //  <p>Discord: {discord}</p>
          //  {window.isSecureContext &&
          //    <img src={iconeCopiar} className='botaoCopiar'
          //      onClick={()=>{
          //        navigator.clipboard.writeText(discord);
          //        //definirDiscord('');
          //      }}
          //    />
          //  }
          //</div>
        }

      </div>
    </div>
  )
}