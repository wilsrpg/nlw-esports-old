import React from 'react'

export default function CartaoDeJogo({jogo, funcDefinirIdJogo}) {
  return (
    //<a href={jogo.url}>
    <div className='cartaoJogo' onClick={()=>funcDefinirIdJogo(jogo.id)}>
      <img className='imagemDoJogo' src={jogo.urlImagem} alt={`Imagem do jogo ${jogo.nome}`}/>
      <div className='game-desc-gradient'>
        <strong>{jogo.nome}</strong>
        <p>{jogo._count.anuncios} anúncio(s)</p>
      </div>
    {/*</a>*/}
    </div>
  )
}