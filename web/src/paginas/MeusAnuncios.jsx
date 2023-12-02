import React, { useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { contexto } from '../App';
import ResultadosDaPesquisa from '../componentes/ResultadosDaPesquisa';
//import FormularioDeEntrada from '../componentes/FormularioDeEntrada';
import BotaoParaPublicarAnuncio from '../componentes/BotaoParaPublicarAnuncio';

export default function MeusAnuncios() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const historico = useHistory();
  const urlAtual = useLocation();

  useEffect(()=>{
    document.title = 'Meus anúncios - NLW eSports';
    const tokenDaSessao = contexto2.getCookie('tokenDaSessao');
    if (!tokenDaSessao || !contexto2.usuarioLogado) {
      document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
      contexto2.definirUsuarioLogado();
      historico.push('/entrar?redir='+urlAtual.pathname.slice(1));
      return;
    }
    //contexto2.autenticarSessao()
    //.then(resp=>{
    //  //console.log(resp);
    //  if (!resp || !contexto2.usuarioLogado) {
    //    document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
    //    historico.push('/entrar?redir='+urlAtual.pathname.slice(1));
    //  }
    //});

    return ()=>componenteExiste = false;
  }, [])

  return (
    <div className='conteudo'>
      {/*{!contexto2.usuarioLogado ?
        <FormularioDeEntrada/>
      :*/}
      {contexto2.usuarioLogado &&
        <>
        <h2>Meus anúncios</h2>
        <BotaoParaPublicarAnuncio/>
        <ResultadosDaPesquisa
          filtros={contexto2.usuarioLogado ? {idDoUsuario: contexto2.usuarioLogado.id} : {}}
        />
        </>
      }
    </div>
  )
}