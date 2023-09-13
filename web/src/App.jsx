import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import carregando from './imagens/loading.svg'
import BarraSuperior from './componentes/BarraSuperior'
//import BarraInferior from './componentes/BarraInferior'
import PaginaInicial from './paginas/PaginaInicial'
import Jogos from './paginas/Jogos'
import Anuncios from './paginas/Anuncios'
//import Perfil from './paginas/Perfil'
import Conta from './paginas/Conta'
import Configuracoes from './paginas/Configuracoes'
import Registrar from './paginas/Registrar'
import PaginaNaoEncontrada from './paginas/PaginaNaoEncontrada'
import Entrar from './paginas/Entrar'
import NovoAnuncio from './paginas/NovoAnuncio'
import MeusAnuncios from './paginas/MeusAnuncios'

/*falta:
-na publicação, atrelar id do usuário ao anúncio
-separar nome do usuário do nome no jogo
-cadastrar jogo?
-no servidor, trocar jogos/anúncios por jogos2/anúncios2 (do banco de dados) e fazer as adaptações
-sessão em cookie
-exibir anúncios com várias disponibilidades
-ajeitar chamarAtencao
-ajeitar ModalConectar
*/

export const contexto = createContext();

export default function App() {
  const [usuarioLogado, definirUsuarioLogado] = useState();
  const [aguardando, definirAguardando] = useState(true);
  
  useEffect(()=>{
    if (localStorage.getItem("idDoUsuarioLogado"))
      definirUsuarioLogado({
        id: localStorage.getItem("idDoUsuarioLogado"),
        nome: localStorage.getItem("usuarioLogado")
      });
    definirAguardando(false);
  }, [contexto])

  return (
    <contexto.Provider value={{usuarioLogado, definirUsuarioLogado}}>
      {/*{aguardando ?
        <div className='conteudo'>
          <img className='carregando' src={carregando}/>
        </div>
      :*/}
      {!aguardando &&
        <BrowserRouter>
          <BarraSuperior/>
          <Switch>
            <Route exact path="/">
              <PaginaInicial/>
            </Route>
            <Route path="/registrar">
              <Registrar/>
            </Route>
            <Route path="/entrar">
              <Entrar/>
            </Route>
            <Route path="/conta">
              <Conta/>
            </Route>
            {/*<Route path="/usuarios/:nome">
              <Perfil />
            </Route>*/}
            {/*<Route path="/amigos">
              <Amigos/>
            </Route>*/}
            <Route path="/meusanuncios">
              <MeusAnuncios/>
            </Route>
            <Route path="/configuracoes">
              <Configuracoes/>
            </Route>
            {/*<Route path="/usuarios/:nome/anuncios">
              <Anuncios />
            </Route>*/}
            {/*<Route path="/jogos/:nome"> //página de informações do jogo
              <Jogos />
            </Route>*/}
            <Route path="/jogos">
              <Jogos/>
            </Route>
            <Route path="/anuncios">
              <Anuncios/>
            </Route>
            <Route path="/novoanuncio">
              <NovoAnuncio/>
            </Route>
            <Route>
              <PaginaNaoEncontrada/>
            </Route>
          </Switch>
          {/*<BarraInferior/>*/}
        </BrowserRouter>
      }
    </contexto.Provider>
  )
}