import React, { useEffect } from 'react'
import iconeFechar from '../imagens/x.svg'
import iconeSucesso from '../imagens/icons8-check.svg'
import iconeCopiar from '../imagens/icons8-restore-down-26.png'

export default function ModalConectar({discord, funcFechar}) {
  useEffect(()=>{
    document.body.onkeydown = (e)=>{fechar(e)};
  }, [])

  function fechar(e) {
    if(e.repeat) return;
    if(e.key == "Escape")
      funcFechar();
  }

  return (
    <div className="modalAnuncioFora" onClick={funcFechar}>
      <div className="modalAnuncio" onClick={(e)=>e.stopPropagation()}>

        <img className='botaoCopiar botaoFechar' src={iconeFechar} onClick={funcFechar}/>
        <div className='modalConectarInterior'>
          <img src={iconeSucesso}/>
          <div className='centralizado'>
            <h2>Let's play!</h2>
            <p>Agora é só começar a jogar!</p>
          </div>
          <div className='centralizado'>
            <strong>Adicione no Discord:</strong>
          <div className='discord'>
            <strong>{discord}</strong>
            {window.isSecureContext &&
              <img src={iconeCopiar} className='botaoCopiar' onClick={()=>navigator.clipboard.writeText(discord)}/>
            }
          </div>
          </div>
        </div>

      </div>
    </div>
  )
}