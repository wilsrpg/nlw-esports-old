import React, { useContext, useEffect, useState } from 'react'
import { SERVIDOR } from '../../../enderecoDoServidor';
import { contexto } from '../App';
import iconeLixeira from '../imagens/icons8-trash vermelha.svg'
import carregando from '../imagens/loading.svg'
//import { useLocation } from 'react-router-dom';

export default function CartaoDeAnuncio({nomeDoJogo, anuncio, funcConectar, funcExcluir, excluindo, definirExcluindo}) {
  //let compMontado = useRef(true);
  //let componenteExiste = hook;
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
  const [aguardando, definirAguardando] = useState(false);
  //const [excluindo, definirExcluindo] = useState(false);
  //const [excluindoAnuncio, definirExcluindoAnuncio] = useState(false);
  //const urlAtual = useLocation();
  //const [preparandoExclusao, definirPreparandoExclusao] = useState(false);

  useEffect(()=>{
    //console.log(urlAtual.pathname);
    return ()=>componenteExiste = false;
  }, [])

  //useEffect(()=>{
  //  return ()=>componenteExiste = false;
  //}, [])

  //useEffect(()=>{
  //  if (componenteExiste && preparandoExclusao){
  //    //funcExcluir();
  //    definirAguardandoExcluir(true);
  //    //alert('Anúncio excluído.');
  //  }
  //}, [preparandoExclusao])

  //useEffect(()=>{
  //  if (componenteExiste && excluindoAnuncio){
  //    funcExcluir();
  //    definirAguardandoExcluir(false);
  //    //alert('Anúncio excluído.');
  //  }
  //}, [excluindoAnuncio])

  async function validarExclusaoDoAnuncio() {
    //definirAguardandoExcluir(true);
    document.getElementById(anuncio.idDoAnuncio).style.borderColor = 'red';
    if (!confirm('Confirma exclusão do anúncio?')) {
      if (document.getElementById(anuncio.idDoAnuncio))
        document.getElementById(anuncio.idDoAnuncio).style.borderColor = '';
        //if (componenteExiste)
        //  definirAguardandoExcluir(false);
      return;
    }
    if (componenteExiste) {
      definirExcluindo(true);
      definirAguardando(true);
    }
    excluirAnuncio();
  }

  async function excluirAnuncio() {
    const dados = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({idDoAnuncio: anuncio.idDoAnuncio}),
    };
    fetch(SERVIDOR+`/excluiranuncio`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      //if (componenteExiste)
      //definirAnuncioPraExcluir();
      if (document.getElementById(anuncio.idDoAnuncio))
        document.getElementById(anuncio.idDoAnuncio).style.borderColor = '';
      if (componenteExiste)
      //  definirExcluindoAnuncio(true);
        funcExcluir();
      alert('Anúncio excluído.');
    })
    .catch(erro=>{
      console.log(erro);
      alert(''+erro);
    })
    .finally(()=>{
      if (componenteExiste) {
        definirExcluindo(false);
        definirAguardando(false);
      }
    });
  }

  //async function definirAnuncioPraExcluir() {
  //  //console.log(urlAtual.pathname);
  //  //console.log('hook='+hook);
  //  if (componenteExiste) {
  //    definirExcluindoAnuncio(true);
  //    //definirAguardandoExcluir(false);
  //    //funcExcluir();
  //    //alert('Anúncio excluído.');
  //  }
  //}

  return (
    <div id={anuncio.idDoAnuncio} className='cartaoAnuncio'>
      {contexto2.usuarioLogado && contexto2.usuarioLogado.id == anuncio.idDoUsuario &&
        <img className='botaoCopiar botaoFechar'
          src={aguardando ? carregando : iconeLixeira}
          onClick={excluindo ? undefined : validarExclusaoDoAnuncio}
        />
      }
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
      {/*<strong className='cursorAjuda'
        title={anuncio.diasQueJoga.map((dia,i)=>{
          let d = dias[parseInt(dia)];
          if (i == 0)
            d = d[0].toUpperCase()+d.slice(1);
          return d;
        }).join(', ')}
      >
        {anuncio.diasQueJoga.length} dia{anuncio.diasQueJoga.length > 1 && "s"} • {anuncio.deHora} - {anuncio.ateHora}
      </strong>*/}
      {anuncio.disponibilidades.map((disp,i)=>
        <strong key={i}>
          {disp.dias.join() == '0,1,2,3,4,5,6' ?
            'Todo dia, de ' + disp.horaDeInicio + ' a ' + disp.horaDeTermino
          :
            disp.dias.join() == '1,2,3,4,5' ?
              'De segunda a sexta, de ' + disp.horaDeInicio + ' a ' + disp.horaDeTermino
            :
              disp.dias.join() == '0,6' ?
                'Sábado e domingo, de ' + disp.horaDeInicio + ' a ' + disp.horaDeTermino
              :
                //disp.dias.map(dia=>
                //  dias[dia]+', de '+disp.horaDeInicio+' a '+disp.horaDeTermino+'\n'
                //)
                (disp.dias.length > 1 ?
                  (disp.dias.map(dia=>dias[dia]).filter((d,j)=>j<disp.dias.length-1).join(', ') + ' e ')
                :
                  ''
                )
                + dias[disp.dias.at(-1)]
                + ', de ' + disp.horaDeInicio + ' a ' + disp.horaDeTermino
          }
        </strong>
      )}

      <p>Chamada de voz</p>
      <strong>{anuncio.usaChatDeVoz ? "Sim" : "Não"}</strong>

      <button onClick={funcConectar} className="botaoPublicarAnuncio roxinho">
        Conectar
      </button>
    </div>
  )
}