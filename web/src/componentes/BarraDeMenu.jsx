import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { contexto } from '../App';
import '../App.css'
import LinksDoMenu from './LinksDoMenu';
import carregando from '../imagens/loading.svg'
import iconeMenu from '../imagens/icons8-menu.svg'
import iconeLogin from '../imagens/user-circle-svgrepo-com.svg'

export default function BarraDeMenu() {
  const urlNaMinhaCasa = ""+import.meta.env.VITE_IP_NA_MINHA_CASA+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = ""+import.meta.env.VITE_IP_NA_CASA_DE_WISNEY+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const historico = useHistory();
  const larguraDeColapso = 768;
  const [larguraDaTela, definirLarguraDaTela] = useState(window.innerWidth);
  const [exibindoMenuSuspenso, definirExibindoMenuSuspenso] = useState(false);
  const [exibindoLoginSuspenso, definirExibindoLoginSuspenso] = useState(false);

  useEffect(()=>{
    window.onresize = ()=>definirLarguraDaTela(window.innerWidth);
    document.body.onclick = fecharMenus;
    //document.body.onkeydown = e=>fecharMenu(e);
    //window.addEventListener("resize",()=>definirLarguraDaTela(window.innerWidth));
    //document.body.addEventListener("click",()=>definirExibindoMenuSuspenso(false));
    document.body.addEventListener("keydown",e=>fecharMenu(e),{once:true});
  }, [])

  useEffect(()=>{
    if(larguraDaTela > larguraDeColapso)
      fecharMenus()
  }, [larguraDaTela])

  useEffect(()=>{
    definirMensagem('');
    //definirAguardando(false);
  }, [contexto2.usuarioLogado])

  function fecharMenu(e) {
    if (e.repeat)
      return;
    if (e.key == "Escape")
      fecharMenus();
  }

  function fecharMenus() {
    definirExibindoMenuSuspenso(false);
    definirExibindoLoginSuspenso(false);
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
      //console.log(resp);
      abortista.abort();
      if (resp.erro)
        throw resp.erro;
      else {
        definirExibindoLoginSuspenso(false);
        sessionStorage.setItem("usuarioLogado", resp.nome);
        contexto2.definirUsuarioLogado(resp.nome);
        historico.push('/conta');
      }
    })
    .catch(erro=>{
      //console.log('catch');
      console.log(erro);
      if (''+erro == 'AggregateError: No Promise in Promise.any was resolved')
        definirMensagem('Não foi possível se comunicar com o servidor.');
      else
        definirMensagem(''+erro);
      //definirAguardando(false);
    })
    .finally(()=>definirAguardando(false));
  }

  function sair() {
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
      //console.log(resp);
      abortista.abort();
      if (resp.erro)
        definirMensagem(resp.erro);
      else {
        sessionStorage.removeItem("usuarioLogado");
        definirUsuarioLogado();
      }
    })
    .catch(erro=>{
      //console.log('catch');
      console.log(erro);
      definirMensagem(''+erro);
    });*/
  }

  function exibirMenu(e) {
    e.stopPropagation();
    definirExibindoLoginSuspenso(false);
    definirExibindoMenuSuspenso(!exibindoMenuSuspenso);
  }

  function exibirLogin(e) {
    e.stopPropagation();
    definirExibindoMenuSuspenso(false);
    definirExibindoLoginSuspenso(!exibindoLoginSuspenso);
  }

  return (
    <>
    <header className='cabecalho'>
      <div className='barraSuperior'>
      <nav>
        {larguraDaTela <= larguraDeColapso ?
          <img className='botaoMenu'src={iconeMenu} onClick={e=>exibirMenu(e)}/>
        :
          <LinksDoMenu/>
        }
      </nav>

      {contexto2.usuarioLogado ?
        <div className='flex areaDoUsuario'>
          <span className='nomeDoUsuario'>{contexto2.usuarioLogado}</span>
          <button onClick={sair}>
            Sair
          </button>
        </div>
      :
        <>
        {larguraDaTela <= larguraDeColapso ?
          <img className='botaoMenu'src={iconeLogin} onClick={e=>exibirLogin(e)}/>
        :
          <div>
            <form className='flex areaDoUsuario' onSubmit={e=>validarEntrada(e)}>
              <input id='nomeDoUsuarioCabecalho' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')}/>
              <input id='senhaCabecalho' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')}/>
              <button className='botao' type='submit'>
                {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
              </button>
            </form>
            <p className='mensagemDeErro'>{mensagem}</p>
          </div>
        }
        </>
      }
      </div>
    {exibindoMenuSuspenso &&
    <div className='gambiarra'>
      <div className='invisivel'>
      </div>
      <div className='menuSuspenso'>
        <LinksDoMenu/>
      </div>
    </div>
    }
    {exibindoLoginSuspenso &&
    <div className='gambiarra direita'>
      <div className='invisivel'>
      </div>
      <div className='menuSuspenso' onClick={e=>e.stopPropagation()}>
        <div>
        <form className='flex flexColumn' onSubmit={e=>validarEntrada(e)}>
          <input id='nomeDoUsuarioCabecalho' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')}/>
          <input id='senhaCabecalho' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')}/>
          <button className='botao' type='submit'>
            {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
          </button>
        </form>
        <p className='mensagemDeErro'>{mensagem}</p>
        </div>
      </div>
    </div>
    }
    </header>
  </>
  )
}