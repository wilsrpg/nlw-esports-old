import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { contexto } from '../App';
import '../App.css'
import carregando from '../imagens/loading.svg'

export default function BarraDeMenu() {
  const urlNaMinhaCasa = ""+import.meta.env.VITE_IP_NA_MINHA_CASA+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = ""+import.meta.env.VITE_IP_NA_CASA_DE_WISNEY+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const abortista = new AbortController();
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const historico = useHistory();

  useEffect(()=>{
    definirMensagem('');
    //definirAguardando(false);

    //return abortista.abort();
  }, [contexto2.usuarioLogado])

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
        sessionStorage.setItem("usuarioLogado", resp.nome);
        contexto2.definirUsuarioLogado(resp.nome);
        historico.push('/conta');
      }
    })
    .catch(erro=>{
      //console.log('catch');
      console.log(erro);
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

  return (
    <header className='menu'>
      <nav>
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
      </nav>

      {contexto2.usuarioLogado ?
        <div className='flex areaDoUsuario'>
          <strong>Bem-vindo, <span className='nomeDoUsuario'>{contexto2.usuarioLogado}</span>.</strong>
          <button onClick={sair}>
            Sair
          </button>
        </div>
      :
        <div>
          <form className='flex areaDoUsuario' onSubmit={e=>validarEntrada(e)}>
            <input id='nomeDoUsuarioCabecalho' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')}/>
            <input id='senhaCabecalho' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')}/>
            {/*<input type='submit' value='Entrar'/>*/}
            <button className='botao' type='submit'>
              {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
            </button>
          </form>
          <p className='mensagemDeErro'>{mensagem}</p>
          {/*<p onClick={()=>definirMensagem('')}>{mensagem}</p>*/}
        </div>
      }
    </header>
  )
}