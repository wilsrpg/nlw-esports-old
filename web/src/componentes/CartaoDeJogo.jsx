import React from 'react'

export default function CartaoDeJogo({jogo, funcDefinirJogoProModal}) {
  return (
    //<a href={jogo.url}>
    <div className='cartaoJogo' onClick={()=>funcDefinirJogoProModal(jogo)}>
      <img className='imagemDoJogo' src={jogo.urlImagem} alt={`Imagem do jogo ${jogo.nome}`}/>
      <div className='game-desc-gradient'>
        <strong>{jogo.nome}</strong>
        <p>{jogo._count.anuncios} anúncio{jogo._count.anuncios > 1 && 's'}</p>
      </div>
    {/*</a>*/}
    </div>
  )
}