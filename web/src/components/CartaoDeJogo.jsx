import React from 'react'

export default function CartaoDeJogo(props) {
  //console.log(props);
  return (
    <a href={props.url}>
      <img src={props.urlImagem} alt={`Imagem do jogo ${props.nome}`} />
      <div className='game-desc-gradient'>
        <strong>{props.nome}</strong>
        <p>{props.qtdeAnuncios} anúncio(s)</p>
      </div>
    </a>
  )
}