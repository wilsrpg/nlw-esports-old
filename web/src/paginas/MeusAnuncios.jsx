import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { contexto } from '../App';
import ResultadosDaPesquisa from '../componentes/ResultadosDaPesquisa';
import FormularioDeEntrada from '../componentes/FormularioDeEntrada';

export default function MeusAnuncios() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const historico = useHistory();

  useEffect(()=>{
    //if (!contexto2.usuarioLogado)
    //  historico.push('/entrar');

    return ()=>componenteExiste = false;
  }, [])

  return (
    <div className='conteudo'>
      {!contexto2.usuarioLogado ?
        <FormularioDeEntrada/>
      :
        <ResultadosDaPesquisa filtros={{nome: contexto2.usuarioLogado.nome, opcoesNome: 'exatamente'}}/>
      }
    </div>
  )
}