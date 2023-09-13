import React, { useContext } from 'react'
import { contexto } from '../App';
import FormularioDeEntrada from '../componentes/FormularioDeEntrada';

export default function Entrar() {
  const contexto2 = useContext(contexto);

  return (
    <div className='conteudo'>
    {!contexto2.usuarioLogado ?
      <FormularioDeEntrada/>
    :
      <p>Desconecte a conta atual para entrar com uma nova.</p>
    }
    </div>
  )
}