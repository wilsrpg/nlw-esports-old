import React, { useContext, useEffect, useState } from 'react'
import { SERVIDOR } from '../../../enderecoDoServidor';
import { contexto } from '../App';
import iconeLixeira from '../imagens/icons8-trash vermelha.svg'
import carregando from '../imagens/loading.svg'

export default function CartaoDeAnuncio({
  nomeDoJogo, anuncio, funcConectar, funcRecarregarAnuncios, excluindo, definirExcluindo
}) {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
  //const [aguardando, definirAguardando] = useState(false);
  const [confirmandoExclusaoDoAnuncio, definirConfirmandoExclusaoDoAnuncio] = useState(false);

  useEffect(()=>{
    //definirExcluindo(false);
    //definirAguardando(false);
    //definirConfirmandoExclusaoDoAnuncio(false);

    return ()=>componenteExiste = false;
  }, [])

  async function confirmarExclusaoDoAnuncio() {
    definirConfirmandoExclusaoDoAnuncio(true);
    document.getElementById(anuncio.idDoAnuncio).style.borderColor = 'red';
  }

  useEffect(()=>{
    if (componenteExiste && confirmandoExclusaoDoAnuncio){
      if (confirm('Confirma exclusão do anúncio?')) {
        if (componenteExiste) {
          definirExcluindo(true);
          //definirAguardando(true);
        }
        excluirAnuncio();
      } else {
        document.getElementById(anuncio.idDoAnuncio).style.borderColor = '';
        if (componenteExiste)
          definirConfirmandoExclusaoDoAnuncio(false);
      }
    }
  }, [confirmandoExclusaoDoAnuncio])

  async function excluirAnuncio() {
    const tokenDaSessao = getCookie('tokenDaSessao');
    const dados = {
      method: 'DELETE',
      //headers: {'Content-Type': 'application/json'},
      headers: {'Authorization': tokenDaSessao},
      //body: JSON.stringify({idDoAnuncio: anuncio.idDoAnuncio}),
    };
    //fetch(SERVIDOR+`/excluir-anuncio`, dados)
    fetch(SERVIDOR+`/anuncios/${anuncio.idDoAnuncio}`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      if (document.getElementById(anuncio.idDoAnuncio))
        document.getElementById(anuncio.idDoAnuncio).style.borderColor = '';
      if (componenteExiste)
        funcRecarregarAnuncios();
      alert('Anúncio excluído.');
    })
    .catch(erro=>{
      console.log(erro);
      alert('Erro ao excluir anúncio. Verifique o console de seu navegador para mais detalhes.');
      if (document.getElementById(anuncio.idDoAnuncio))
        document.getElementById(anuncio.idDoAnuncio).style.borderColor = '';
      if (componenteExiste)
        definirConfirmandoExclusaoDoAnuncio(false);
    })
    .finally(()=>{
      if (componenteExiste) {
        //definirAguardando(false);
        //definirConfirmandoExclusaoDoAnuncio(false);
        definirExcluindo(false);
        //    //definirAguardando(false); //aqui causa memory leak
      }
    });
  }

  function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  return (
    <div id={anuncio.idDoAnuncio} className='cartaoAnuncio'>
      {contexto2.usuarioLogado && contexto2.usuarioLogado.id == anuncio.idDoUsuario &&
        <img className='botaoCopiar botaoFechar'
          src={excluindo ? carregando : iconeLixeira}
          onClick={excluindo ? undefined : confirmarExclusaoDoAnuncio}
        />
      }
      {nomeDoJogo &&
        <>
        <p>Jogo</p>
        <strong>{nomeDoJogo}</strong>
        </>
      }

      <p>Nome ou apelido</p>
      <strong>{anuncio.nomeNoJogo}</strong>

      <p>Tempo de jogo</p>
      <strong>
        {anuncio.tempoDeJogoEmMeses >= 12 &&
          (Math.floor(anuncio.tempoDeJogoEmMeses/12) + ' ano' + (anuncio.tempoDeJogoEmMeses >= 24 ? 's' : ''))}
        {anuncio.tempoDeJogoEmMeses >= 12 && anuncio.tempoDeJogoEmMeses%12 > 0 && ' e '}
        {anuncio.tempoDeJogoEmMeses % 12 > 0 &&
          anuncio.tempoDeJogoEmMeses % 12 + (anuncio.tempoDeJogoEmMeses % 12 > 1 ? ' meses' : ' mês')}
        {anuncio.tempoDeJogoEmMeses == 0 && 'Zero'}
      </strong>

      <p>Disponibilidade</p>
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
      <strong>{anuncio.usaChatDeVoz ? 'Sim' : 'Não'}</strong>

      <button onClick={funcConectar} className='botaoPublicarAnuncio roxinho'>
        Conectar
      </button>
    </div>
  )
}