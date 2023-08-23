import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom';
import { contexto } from '../App';
import iconeMenu from '../imagens/icons8-menu.svg'
import iconeUsuario from '../imagens/user-circle-svgrepo-com.svg'
import FormularioDeEntrada from './FormularioDeEntrada';

export default function BarraSuperior() {
  const contexto2 = useContext(contexto);
  //const urlNaMinhaCasa = contexto2.hostCasa;
  //const urlNaCasaDeWisney = contexto2.hostWisney;
  //const [aguardando, definirAguardando] = useState(false);
  //const [mensagem, definirMensagem] = useState('');
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

  function sair() {
    definirExibindoMenuDoUsuarioSuspenso(false);
    sessionStorage.removeItem("usuarioLogado");
    contexto2.definirUsuarioLogado();
    historico.push('/entrar');
    /*const endereco = `/sair`;
    const dados = {
      method: "POST",
      //headers: {"Content-Type": "application/json"},
      //body: JSON.stringify({nomeDoUsuario}),
      signal: abortista.signal
    };
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, dados);
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, dados);
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then((resp)=>{
      abortista.abort();
      if (resp.erro)
        definirMensagem(resp.erro);
      else {
        sessionStorage.removeItem("usuarioLogado");
        definirUsuarioLogado();
      }
    })
    .catch(erro=>{
      console.log(erro);
      definirMensagem(''+erro);
    });*/
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
      <Link to={`/usuarios/${contexto2.usuarioLogado}`}>
        Meu perfil
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
            {contexto2.usuarioLogado && <span className='nomeDoUsuario'>{contexto2.usuarioLogado}</span>}
            <img className='botaoCopiar' src={iconeUsuario} onClick={e=>exibirMenuDoUsuario(e)}/>
          </div>
        :
          <FormularioDeEntrada funcFecharMenu={()=>definirExibindoMenuDoUsuarioSuspenso(false)} horizontal/>
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
              <FormularioDeEntrada funcFecharMenu={()=>definirExibindoMenuDoUsuarioSuspenso(false)}/>
            }
          </div>
        </div>
      }
    </header>
    </>
  )
}