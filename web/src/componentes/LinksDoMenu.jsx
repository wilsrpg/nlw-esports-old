import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'

export default function LinksDoMenu() {

  return (
    <>
    <Link to='/'>
      Página Inicial
    </Link>
    <Link to='/jogos'>
      Jogos
    </Link>
    <Link to='/anuncios'>
      Anúncios
    </Link>
    </>
  )
}