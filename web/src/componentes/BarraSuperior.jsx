import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom';
import { contexto } from '../App';
import '../App.css'
import carregando from '../imagens/loading.svg'
import iconeMenu from '../imagens/icons8-menu.svg'
import iconeUsuario from '../imagens/user-circle-svgrepo-com.svg'

export default function BarraSuperior() {
  const urlNaMinhaCasa = ""+import.meta.env.VITE_IP_NA_MINHA_CASA+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = ""+import.meta.env.VITE_IP_NA_CASA_DE_WISNEY+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
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
    definirMensagem('');
    definirExibindoMenuDaPaginaSuspenso(false);
    definirExibindoMenuDoUsuarioSuspenso(false);
  }

  function validarEntrada(e) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.target));
    if (!dados.nomeDoUsuario) {
      document.getElementById("nomeDoUsuarioCabecalho").focus();
      definirMensagem('Digite seu nome de usuário.');
      return;
    }
    if (!dados.senha) {
      document.getElementById("senhaCabecalho").focus();
      definirMensagem('Digite sua senha.');
      return;
    }
    definirMensagem('');
    definirAguardando(true);
    tentarEntrar(dados.nomeDoUsuario,dados.senha);
  }

  function tentarEntrar(nomeDoUsuario, senha) {
    const endereco = `/entrar`;
    const abortista = new AbortController();
    const dados = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nomeDoUsuario, senha}),
      signal: abortista.signal
    };
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, dados);
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, dados);
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(resp=>{
      abortista.abort();
      if (resp.erro)
        throw resp.erro;
      else {
        definirExibindoMenuDoUsuarioSuspenso(false);
        sessionStorage.setItem("usuarioLogado", resp.nome);
        contexto2.definirUsuarioLogado(resp.nome);
        historico.push('/conta');
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (''+erro == 'AggregateError: No Promise in Promise.any was resolved') {
        console.log('Não foi possível se comunicar com o servidor.');
        definirMensagem('Não foi possível se comunicar com o servidor.');
      } else
        definirMensagem(''+erro);
    })
    .finally(()=>definirAguardando(false));
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
      <Link to={`/usuario/${contexto2.usuarioLogado}`}>
        Meu perfil
      </Link>
      <Link to='/configuracoes'>
        Configurações
      </Link>
      <a className='ponteiro' onClick={sair}>
        Sair
      </a>
      </>
    )
  }

  //deu problema nos focus e nas re-renderizações
  //function FormularioDeEntrada() {
  //  return (
  //    <div>
  //      <form className={'flex ' + (telaEstreita ? 'flexColumn' : 'areaDoUsuario')} onSubmit={e=>validarEntrada(e)}>
  //        <input id='nomeDoUsuarioCabecalho' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')}/>
  //        <input id='senhaCabecalho' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')}/>
  //        <div className='flex'>
  //          <button className='botao' type='submit'>
  //            {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
  //          </button>
  //          <button>
  //            <Link to='/registrar'>
  //              Registrar-se
  //            </Link>
  //          </button>
  //        </div>
  //      </form>
  //      <p className='mensagemDeErro'>{mensagem}</p>
  //    </div>
  //  )
  //}

  return (
    <>
    <header className='cabecalho'>
      <div className='barraSuperior'>
        <nav>
          {telaEstreita ?
            <img className='botaoMenu'src={iconeMenu} onClick={e=>exibirMenuDaPagina(e)}/>
          :
            <OpcoesDoMenuDaPagina/>
          }
        </nav>

        {telaEstreita || contexto2.usuarioLogado ?
          <div className='flex areaDoUsuario'>
            {contexto2.usuarioLogado && <span className='nomeDoUsuario'>{contexto2.usuarioLogado}</span>}
            <img className='botaoMenu'src={iconeUsuario} onClick={e=>exibirMenuDoUsuario(e)}/>
          </div>
        :
          //<FormularioDeEntrada/>
          <div>
            <form className={'flex ' + (telaEstreita ? 'flexColumn' : 'areaDoUsuario')} onSubmit={e=>validarEntrada(e)}>
              <input id='nomeDoUsuarioCabecalho' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')}/>
              <input id='senhaCabecalho' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')}/>
              <div className='flex'>
                <button className='botao' type='submit'>
                  {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
                </button>
                <button>
                  <Link to='/registrar'>
                    Registrar-se
                  </Link>
                </button>
              </div>
            </form>
            <p className='mensagemDeErro'>{mensagem}</p>
          </div>
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
              //<FormularioDeEntrada/>
              <div>
                <form className={'flex ' + (telaEstreita ? 'flexColumn' : 'areaDoUsuario')} onSubmit={e=>validarEntrada(e)}>
                  <input id='nomeDoUsuarioCabecalho' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')}/>
                  <input id='senhaCabecalho' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')}/>
                  <div className='flex'>
                    <button className='botao' type='submit'>
                      {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
                    </button>
                    <button>
                      <Link to='/registrar'>
                        Registrar-se
                      </Link>
                    </button>
                  </div>
                </form>
                <p className='mensagemDeErro'>{mensagem}</p>
              </div>
            }
          </div>
        </div>
      }
    </header>
    </>
  )
}