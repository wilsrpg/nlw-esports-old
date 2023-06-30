import React, { useEffect, useState } from 'react'
import lupa from '../assets/magnifying-glass-plus-reverse.svg'
import ModalParaCriarAnuncio from './ModalParaCriarAnuncio';

export default function CaixaParaPublicarAnuncio() {
  const [exibindoModal, definirExibindoModal] = useState(false);
  
  return (
    <>
    <div className='caixa nlw-gradient'>
      <div>
        <div>
          <strong>Não encontrou seu duo?</strong>
          <p>Publique um anúncio para encontrar novos players!</p>
        </div>
        <button
          className='botao-publicar'
          onClick={()=>definirExibindoModal(true)}
        >
          <img className='lupa' src={lupa} />
          Publicar anúncio
        </button>
      </div>
    </div>
    {exibindoModal && <ModalParaCriarAnuncio fechar={()=>{definirExibindoModal(false)}}/>}
    </>
  )
}