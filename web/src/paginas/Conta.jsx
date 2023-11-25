import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { contexto } from '../App';
//import FormularioDeEntrada from '../componentes/FormularioDeEntrada';

export default function Conta() {
  const contexto2 = useContext(contexto);
  const historico = useHistory();

  useEffect(()=>{
    if (!contexto2.usuarioLogado)
      historico.push('/entrar');
  }, [])

  return (
    <div className='conteudo'>
      {/*{!contexto2.usuarioLogado ?
        <FormularioDeEntrada/>
      :
        <>*/}
        <h2>Conta</h2>
        <strong>Bem-vindo, <span className='nomeDoUsuario'>{contexto2.usuarioLogado.nome}</span>.</strong>
        {/*</>
      }*/}
    </div>
  )
}