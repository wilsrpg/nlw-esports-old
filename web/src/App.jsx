import React, { createContext, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BarraSuperior from './componentes/BarraSuperior'
//import Rodape from './componentes/Rodape'
import PaginaInicial from './paginas/PaginaInicial'
import Jogos from './paginas/Jogos'
import Anuncios from './paginas/Anuncios'
import Perfil from './paginas/Perfil'
import Conta from './paginas/Conta'
import Configuracoes from './paginas/Configuracoes'
import Registrar from './paginas/Registrar'
import PaginaNaoEncontrada from './paginas/PaginaNaoEncontrada'
import Entrar from './paginas/Entrar'

export const contexto = createContext();

export default function App() {
  const [usuarioLogado, definirUsuarioLogado] = useState(sessionStorage.getItem("usuarioLogado"));

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
          <Route path="/configuracoes">
            <Configuracoes/>
          </Route>
          <Route path="/usuario/:nome">
            <Perfil />
          </Route>
          <Route path="/usuario/:nome/anuncios"> {/*falta*/}
            <Anuncios />
          </Route>
          <Route path="/jogos/:nome"> {/*falta*/}
            <Jogos />
          </Route>
          <Route path="/jogos">
            <Jogos/>
          </Route>
          <Route path="/anuncios/:jogoId">
            <Anuncios/>
          </Route>
          <Route path="/anuncios">
            <Anuncios/>
          </Route>
          <Route>
            <PaginaNaoEncontrada/>
          </Route>
        </Switch>
        {/*<Rodape/>*/}
      </BrowserRouter>
    </contexto.Provider>
  )
}