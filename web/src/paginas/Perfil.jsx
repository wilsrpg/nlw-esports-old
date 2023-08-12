import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { contexto } from '../App';
import '../App.css'

export default function Perfil() {
  const contexto2 = useContext(contexto);
  const {nome} = useParams();

  return (
    <div className='tudo'>
      <h2>Perfil</h2>
      {contexto2.usuarioLogado == nome ?
        <strong>Visualizando seu perfil.</strong>
      :
        <strong>Visualizando perfil de <span className='nomeDoUsuario'>{nome}</span>.</strong>
      }
    </div>
  )
}