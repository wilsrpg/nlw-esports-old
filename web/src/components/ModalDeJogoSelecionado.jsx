import React, { useEffect, useState } from 'react'
import CartaoDeAnuncio from './CartaoDeAnuncio';
import carregando from '../assets/loading.svg'

export default function ModalDeJogoSelecionado({jogoId, funcFechar}) {
  const [anuncios, definirAnuncios] = useState();
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [discord, definirDiscord] = useState('');

  useEffect(()=>{
    document.body.onkeydown = (e)=>{fechar(e)};
    fetch(`http://localhost:3333/jogos/${jogoId}/anuncios`)
    .then(resp=>resp.json())
    .then(dados=>{
      definirErroAoObterDados(false);
      definirAnuncios(dados);
    })
    .catch(erro=>{
      definirErroAoObterDados(true);
      console.log(erro);
    });
  }, [])

  function fechar(e) {
    if(e.repeat) return;
    if(e.key == "Escape")
      funcFechar();
  }

  async function obterDiscord(anuncioId) {
    fetch(`http://localhost:3333/anuncios/${anuncioId}/discord`)
    .then(resp=>resp.json())
    .then(dados=>{
      definirErroAoObterDados(false);
      definirDiscord(dados.discord);
    })
    .catch(erro=>{
      definirErroAoObterDados(true);
      console.log(erro);
    });
  }

  return (
    <div className="modalAnuncioFora" onClick={funcFechar}>
      <div className="modalAnuncio" onClick={(e)=>e.stopPropagation()}>

        <h2>Conecte-se e comece a jogar!</h2>

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
                  funcConectar={()=>{obterDiscord(anuncio.id);console.log("clicou em conectar")}}
                />
              )
            )
          }
          {/*{erroAoObterDados && <p>Erro ao obter dados dos anúncios do servidor.</p>}
          {anuncios &&
            (anuncios.length == 0 ?
              <p>Nenhum anúncio publicado.</p>
            :
              anuncios.map((anuncio,id)=>
                <CartaoDeAnuncio
                  key={id}
                  anuncio={anuncio}
                  funcConectar={()=>{obterDiscord(anuncio.id);console.log("clicou em conectar")}}
                />
              )
            )
          }*/}
        </div>

        {discord && <p>Discord: {discord}</p>}

      </div>
    </div>
  )
}