import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom';
import { contexto } from '../App';
import iconeMenu from '../imagens/icons8-menu.svg'
import iconeUsuario from '../imagens/user-circle-svgrepo-com.svg'
import FormularioDeEntradaNoCabecalho from './FormularioDeEntradaNoCabecalho';
import { SERVIDOR } from '../../../enderecoDoServidor';

export default function BarraSuperior() {
  const contexto2 = useContext(contexto);
  const paginaAtual = useLocation();
  const historico = useHistory();
  const larguraDeColapso = 768;
  const [telaEstreita, definirTelaEstreita] = useState(window.innerWidth <= larguraDeColapso);
  const [exibindoMenuDaPaginaSuspenso, definirExibindoMenuDaPaginaSuspenso] = useState(false);
  const [exibindoMenuDoUsuarioSuspenso, definirExibindoMenuDoUsuarioSuspenso] = useState(false);

  useEffect(()=>{
    window.onresize = ()=>{
      if (window.innerWidth <= larguraDeColapso)
        definirTelaEstreita(true);
      else
        definirTelaEstreita(false);
    };
    window.onclick = fecharMenus;
    document.body.addEventListener("keydown",e=>fecharMenusPeloTeclado(e),{once:true});
  }, [])

  useEffect(()=>{
    fecharMenus();
  }, [paginaAtual,telaEstreita])

  function fecharMenusPeloTeclado(e) {
    if (e.repeat)
      return;
    if (e.key == "Escape")
      fecharMenus();
  }

  async function fecharMenus() {
    definirExibindoMenuDaPaginaSuspenso(false);
    definirExibindoMenuDoUsuarioSuspenso(false);
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

  function sair() {
    definirExibindoMenuDoUsuarioSuspenso(false);
    //localStorage.removeItem("usuarioLogado");
    //localStorage.removeItem("idDoUsuarioLogado");
    //document.cookie = "tokenDaSessao=;expires=0;path=/";
    //contexto2.definirUsuarioLogado();
    //historico.push('/entrar');
    const tokenDaSessao = getCookie('tokenDaSessao');
    //console.log(tokenDaSessao);
    if (!tokenDaSessao) {
      contexto2.definirUsuarioLogado();
      historico.push('/entrar');
    } else {
      const dados = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tokenDaSessao}),
      };
      fetch(SERVIDOR+`/excluirsessao`, dados)
      .then(resp=>resp.json())
      .then(resp=>{
        if (resp.erro)
          definirMensagem(resp.erro);
        else {
          //localStorage.removeItem("idDoUsuarioLogado");
          //localStorage.removeItem("usuarioLogado");
          //document.cookie = "tokenDaSessao=0;expires=0;samesite=lax;httponly=true;path=/";
          document.cookie = "tokenDaSessao=0;expires=0;samesite=lax;path=/";
          contexto2.definirUsuarioLogado();
          historico.push('/entrar');
        }
      })
      .catch(erro=>{
        console.log(erro);
        definirMensagem(''+erro);
      });
    }
  }

  function exibirMenuDaPagina(e) {
    e.stopPropagation();
    definirExibindoMenuDoUsuarioSuspenso(false);
    definirExibindoMenuDaPaginaSuspenso(!exibindoMenuDaPaginaSuspenso);
  }

  function exibirMenuDoUsuario(e) {
    e.stopPropagation();
    definirExibindoMenuDaPaginaSuspenso(false);
    definirExibindoMenuDoUsuarioSuspenso(!exibindoMenuDoUsuarioSuspenso);
  }

  function OpcoesDoMenuDaPagina() {
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

  function OpcoesDoMenuDoUsuario() {
    return (
      <>
      <Link to='/conta'>
        Conta
      </Link>
      {/*<Link to={`/usuarios/${contexto2.usuarioLogado}`}>
        Meu perfil
      </Link>*/}
      {/*<Link to='/amigos'>
        Amigos
      </Link>*/}
      <Link to='/meusanuncios'>
        Meus anúncios
      </Link>
      <Link to='/configuracoes'>
        Configurações
      </Link>
      <a onClick={sair}>
        Sair
      </a>
      </>
    )
  }

  return (
    <>
    <header className='cabecalho'>
      <div className='barraSuperior'>
        <nav>
          {telaEstreita ?
            <img className='botaoCopiar' src={iconeMenu} onClick={e=>exibirMenuDaPagina(e)}/>
          :
            <OpcoesDoMenuDaPagina/>
          }
        </nav>

        {telaEstreita || contexto2.usuarioLogado ?
          <div className='flex'>
            {contexto2.usuarioLogado && <span className='nomeDoUsuario'>{contexto2.usuarioLogado.nome}</span>}
            <img className='botaoCopiar' src={iconeUsuario} onClick={e=>exibirMenuDoUsuario(e)}/>
          </div>
        :
          <FormularioDeEntradaNoCabecalho funcFecharMenu={()=>definirExibindoMenuDoUsuarioSuspenso(false)} horizontal/>
        }
      </div>

      {exibindoMenuDaPaginaSuspenso &&
        <div className='gambiarra'>
          <div className='invisivel'>
          </div>
          <div className='menuSuspenso' onClick={e=>e.stopPropagation()}>
            <OpcoesDoMenuDaPagina/>
          </div>
        </div>
      }

      {exibindoMenuDoUsuarioSuspenso &&
        <div className='gambiarra direita'>
          <div className='invisivel'>
          </div>
          <div className='menuSuspenso' onClick={e=>e.stopPropagation()}>
            {contexto2.usuarioLogado ?
              <OpcoesDoMenuDoUsuario/>
            :
              <FormularioDeEntradaNoCabecalho funcFecharMenu={()=>definirExibindoMenuDoUsuarioSuspenso(false)}/>
            }
          </div>
        </div>
      }
    </header>
    </>
  )
}