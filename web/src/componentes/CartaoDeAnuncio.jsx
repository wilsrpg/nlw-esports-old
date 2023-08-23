import React from 'react'

export default function CartaoDeAnuncio({nomeDoJogo, anuncio, funcConectar}) {
  const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];

  return (
    <div className='cartaoAnuncio'>
      {nomeDoJogo &&
        <>
        <p>Jogo</p>
        <strong>{nomeDoJogo}</strong>
        </>
      }

      <p>Nome ou apelido</p>
      <strong>{anuncio.nomeDoUsuario}</strong>

      <p>Tempo de jogo</p>
      <strong>{anuncio.tempoDeJogoEmAnos} ano{anuncio.tempoDeJogoEmAnos > 1 && "s"}</strong>

      <p>Disponibilidade</p>
      <strong className='cursorAjuda'
        title={anuncio.diasQueJoga.map((dia,i)=>{
          let d = dias[parseInt(dia)];
          if (i == 0)
            d = d[0].toUpperCase()+d.slice(1);
          return d;
        }).join(', ')}
      >
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