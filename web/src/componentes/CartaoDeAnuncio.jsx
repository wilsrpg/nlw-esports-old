import React from 'react'

export default function CartaoDeAnuncio({nomeDoJogo, anuncio, funcConectar}) {
  const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];

  return (
    <div id={anuncio.idDoAnuncio} className='cartaoAnuncio'>
      {nomeDoJogo &&
        <>
        <p>Jogo</p>
        <strong>{nomeDoJogo}</strong>
        </>
      }

      <p>Nome ou apelido</p>
      <strong>{anuncio.nomeDoUsuario}</strong>

      <p>Tempo de jogo</p>
      <strong>
        {anuncio.tempoDeJogoEmAnos >= 1 &&
          anuncio.tempoDeJogoEmAnos + ' ano' + (anuncio.tempoDeJogoEmAnos >= 2 ? 's' : '')
        }
        {anuncio.tempoDeJogoEmAnos == 0 && 'Zero'}
      </strong>

      <p>Disponibilidade</p>
        <strong>
          {anuncio.diasQueJoga.join() == '0,1,2,3,4,5,6' ?
            'Todo dia, de ' + anuncio.deHora + ' a ' + anuncio.ateHora
          :
            anuncio.diasQueJoga.join() == '1,2,3,4,5' ?
              'De segunda a sexta, de ' + anuncio.deHora + ' a ' + anuncio.ateHora
            :
              anuncio.diasQueJoga.join() == '0,6' ?
                'Sábado e domingo, de ' + anuncio.deHora + ' a ' + anuncio.ateHora
              :
                //anuncio.diasQueJoga.map(dia=>
                //  dias[dia]+', de '+anuncio.deHora+' a '+anuncio.ateHora+'\n'
                //)
                (anuncio.diasQueJoga.length > 1 ?
                  (anuncio.diasQueJoga.map(dia=>dias[dia]).filter((d,j)=>j<anuncio.diasQueJoga.length-1).join(', ') + ' e ')
                :
                  ''
                )
                + dias[anuncio.diasQueJoga[anuncio.diasQueJoga.length-1]]
                + ', de ' + anuncio.deHora + ' a ' + anuncio.ateHora
          }
        </strong>

      <p>Chamada de voz</p>
      <strong>{anuncio.usaChatDeVoz ? 'Sim' : 'Não'}</strong>

      <button onClick={funcConectar} className='botaoPublicarAnuncio roxinho'>
        Conectar
      </button>
    </div>
  )
}