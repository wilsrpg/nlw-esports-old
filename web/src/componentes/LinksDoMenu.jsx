import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { contexto } from '../App';
import '../App.css'

export default function LinksDoMenu() {
  const contexto2 = useContext(contexto);

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
    {contexto2.usuarioLogado ?
      <>
      <Link to='/conta'>
        Conta
      </Link>
      <Link to={`/usuario/${contexto2.usuarioLogado}`}>
        Meu perfil
      </Link>
      <Link to='/configuracoes'>
        Configurações
      </Link>
      </>
    :
      <>
      <Link to='/entrar'>
        Entrar
      </Link>
      <Link to='/registrar'>
        Registrar-se
      </Link>
      </>
    }
    </>
  )
}