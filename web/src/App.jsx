import React, { createContext, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import BarraSuperior from './componentes/BarraSuperior'
//import BarraInferior from './componentes/BarraInferior'
import PaginaInicial from './paginas/PaginaInicial'
import Jogos from './paginas/Jogos'
import Anuncios from './paginas/Anuncios'
import Perfil from './paginas/Perfil'
import Conta from './paginas/Conta'
import Configuracoes from './paginas/Configuracoes'
import Registrar from './paginas/Registrar'
import PaginaNaoEncontrada from './paginas/PaginaNaoEncontrada'
import Entrar from './paginas/Entrar'
import NovoAnuncio from './paginas/NovoAnuncio'
import MeusAnuncios from './paginas/MeusAnuncios'

/*falta:
-na página inicial, mostrar só os 5 jogos com anúncios mais recentes
-na publicação, atrelar id do usuário ao anúncio
-na publicação, poder colocar várias disponibilidades
-cadastrar jogo?
-separar nome do usuário do nome no jogo
-no servidor, trocar jogos/anúncios por jogos2/anúncios2 e fazer as adaptações
-
*/

export const contexto = createContext();

export default function App() {
  const [usuarioLogado, definirUsuarioLogado] = useState({
    id: sessionStorage.getItem("IdDoUsuarioLogado"),
    nome: sessionStorage.getItem("usuarioLogado")
  });

  return (
    <contexto.Provider value={{usuarioLogado, definirUsuarioLogado}}>
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
    </contexto.Provider>
  )
}