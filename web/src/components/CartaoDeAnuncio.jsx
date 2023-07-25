import React from 'react'

export default function CartaoDeAnuncio({anuncio, funcConectar}) {
  return (
    <div>
      <p>Nome ou apelido</p>
      <p>{anuncio.nomeDoUsuario}</p>
      <p>Tempo de jogo</p>
      <p>{anuncio.tempoDeJogoEmAnos} ano(s)</p>
      <p>Disponibilidade</p>
      <p>{anuncio.diasQueJoga.length + " dia(s) • " + anuncio.deHora + " - " + anuncio.ateHora}</p>
      <p>Chamada de voz</p>
      <p>{anuncio.usaChatDeVoz ? "Sim" : "Não"}</p>
      <button onClick={funcConectar}>
        Conectar
      </button>
    </div>
  )
}