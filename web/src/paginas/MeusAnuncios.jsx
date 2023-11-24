import React, { useContext, useEffect } from 'react'
import { contexto } from '../App';
import ResultadosDaPesquisa from '../componentes/ResultadosDaPesquisa';
import FormularioDeEntrada from '../componentes/FormularioDeEntrada';
import BotaoParaPublicarAnuncio from '../componentes/BotaoParaPublicarAnuncio';

export default function MeusAnuncios() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);

  useEffect(()=>{
    return ()=>componenteExiste = false;
  }, [])

  return (
    <div className='conteudo'>
      {!contexto2.usuarioLogado ?
        <FormularioDeEntrada/>
      :
        <>
        <BotaoParaPublicarAnuncio/>
        <ResultadosDaPesquisa filtros={{idDoUsuario: contexto2.usuarioLogado.id}}/>
        </>
      }
    </div>
  )
}