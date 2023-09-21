import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
//import carregando from './imagens/loading.svg'
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
-cadastrar jogo?
-no servidor, trocar jogos/anúncios por jogos2/anúncios2 (do banco de dados) e fazer as adaptações
-sessão em cookie
-ajeitar chamarAtencao
-ajeitar ModalConectar
-unificar formulários de entrada
*/

export const contexto = createContext();

export default function App() {
  const [usuarioLogado, definirUsuarioLogado] = useState();
  const [aguardando, definirAguardando] = useState(true);
  
  useEffect(()=>{
    const tokenDaSessao = getCookie('tokenDaSessao');
    if (tokenDaSessao) {
      console.log('com cookie='+tokenDaSessao);
      const usuarioLogado = autenticarSessao(tokenDaSessao);
      if (usuarioLogado)
        definirUsuarioLogado({
          id: usuarioLogado.id,
          nome: usuarioLogado.nome
        });
      //else
    } else
      console.log('sem cookie');
    
    //if (localStorage.getItem('idDoUsuarioLogado'))
    //  definirUsuarioLogado({
    //    id: localStorage.getItem('idDoUsuarioLogado'),
    //    nome: localStorage.getItem('usuarioLogado')
    //  });
    definirAguardando(false);
  }, [contexto])

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  function checkACookieExists(cname) {
    if (document.cookie.split(';').some(item=>item.trim().startsWith(cname+'=')))
      return true;
    return false;
  }

  function autenticarSessao(tokenDaSessao) {
    const dados = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({tokenDaSessao})
    };
    fetch(SERVIDOR+`/autenticarsessao`, dados)
    .then(resp=>resp.json())
    .then(token=>{
      //if (componenteExiste) {
        return token;
      //}
    })
    .catch(erro=>{
      console.log(erro);
      return null;
      //if (componenteExiste)
      //  definirErroAoObterDados(true);
    });
  }

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
            <Route exact path='/'>
              <PaginaInicial/>
            </Route>
            <Route path='/registrar'>
              <Registrar/>
            </Route>
            <Route path='/entrar'>
              <Entrar/>
            </Route>
            <Route path='/conta'>
              <Conta/>
            </Route>
            {/*<Route path='/usuarios/:nome'>
              <Perfil />
            </Route>*/}
            {/*<Route path='/amigos'>
              <Amigos/>
            </Route>*/}
            <Route path='/meusanuncios'>
              <MeusAnuncios/>
            </Route>
            <Route path='/configuracoes'>
              <Configuracoes/>
            </Route>
            {/*<Route path='/usuarios/:nome/anuncios'>
              <Anuncios />
            </Route>*/}
            {/*<Route path='/jogos/:nome'> //página de informações do jogo
              <Jogos />
            </Route>*/}
            <Route path='/jogos'>
              <Jogos/>
            </Route>
            <Route path='/anuncios'>
              <Anuncios/>
            </Route>
            <Route path='/novoanuncio'>
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