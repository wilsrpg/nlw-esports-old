import React from 'react'

export default function CartaoDeAnuncio({jogo, anuncio, funcConectar}) {
  const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];

  return (
    <div className='cartaoAnuncio'>
      {jogo && <>
        <p>Jogo</p>
        <strong>{jogo.nome}</strong>
      </>}

      <p>Nome ou apelido</p>
      <strong>{anuncio.nomeDoUsuario}</strong>

      <p>Tempo de jogo</p>
      <strong>{anuncio.tempoDeJogoEmAnos} ano{anuncio.tempoDeJogoEmAnos > 1 && "s"}</strong>

      <p>Disponibilidade</p>
      <strong className='dias' title={anuncio.diasQueJoga.map(dia=>dias[parseInt(dia)]).join(', ')}>
        {anuncio.diasQueJoga.length} dia{anuncio.diasQueJoga.length > 1 && "s"} • {anuncio.deHora} - {anuncio.ateHora}
      </strong>

      <p>Chamada de voz</p>
      <strong>{anuncio.usaChatDeVoz ? "Sim" : "Não"}</strong>

      <button onClick={funcConectar} className="botaoPublicarAnuncio roxinho">
        Conectar
      </button>
    </div>
  )
}