import React from 'react'

export default function CartaoDeJogo({jogo, funcDefinirJogoProModal}) {
  return (
    <div className='cartaoJogo' onClick={funcDefinirJogoProModal ? ()=>funcDefinirJogoProModal(jogo) : undefined}>
      <img className='imagemDoJogo' src={jogo.urlImagem} alt={`Imagem do jogo ${jogo.nome}`}/>
      <div className='gradientePretoEmbaixo'>
        <strong>{jogo.nome}</strong>
        <p>{jogo._count.anuncios} anúncio{jogo._count.anuncios > 1 && 's'}</p>
      </div>
    </div>
  )
}