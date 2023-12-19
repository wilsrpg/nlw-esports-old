import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom';
import { contexto } from '../App';
import carregando from '../imagens/loading.svg'
import { SERVIDOR } from '../../../enderecoDoServidor';

export default function FormularioDeEntrada({funcFecharMenu, cabecalho, suspenso}) {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const urlAtual = useLocation();
  const historico = useHistory();
  const urlParams = new URLSearchParams(urlAtual.search);
  const cabecalhoString = cabecalho ? 'Cabecalho' : '';
  //const [mensagemCabecalho, definirMensagemCabecalho] = useState('');

  useEffect(()=>{
    return ()=>componenteExiste = false;
  }, [])

  useEffect(()=>{
    //definirMensagemCabecalho('');
    if (componenteExiste)
      definirMensagem('');
    //console.log(urlAtual);
  }, [urlAtual])

  function validarEntrada(e) {
    e.preventDefault();
    if (aguardando)
      return;
    const dados = Object.fromEntries(new FormData(e.target));
    if (!dados.nomeDoUsuario) {
      document.getElementById('nomeDoUsuario'+cabecalhoString).focus();
      //if (cabecalho)
      //  definirMensagemCabecalho('Digite seu nome de usuário.');
      //else
        definirMensagem('Digite seu nome de usuário.');
      return;
    }
    if (!dados.senha) {
      document.getElementById('senha'+cabecalhoString).focus();
      //if (cabecalho)
      //  definirMensagemCabecalho('Digite sua senha.');
      //else
        definirMensagem('Digite sua senha.');
      return;
    }
    if (dados.manterSessao == 'on')
      dados.manterSessao = true;
    else
      dados.manterSessao = false;

    definirMensagem('');
    definirAguardando(true);
    tentarEntrar(dados.nomeDoUsuario, dados.senha, dados.manterSessao);
  }

  function tentarEntrar(nomeDoUsuario, senha, manterSessao) {
    const dados = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nomeDoUsuario, senha, manterSessao}),
    };
    fetch(SERVIDOR+`/sessoes`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      if (funcFecharMenu)
        funcFecharMenu();
      //localStorage.setItem('idDoUsuarioLogado', resp.id);
      //localStorage.setItem('usuarioLogado', resp.nome);
      //if (manterSessao)
        document.cookie = 'tokenDaSessao=' + resp.tokenDaSessao
                          //+ ';expires=' + new Date(resp.dataDeExpiracao).toUTCString()
                          + (resp.manterSessao ? ';expires='
                          + new Date(resp.dataDeExpiracao).toUTCString() : '')
                          + ';samesite=lax;path=/';
      //else
      //  document.cookie = 'tokenDaSessao=' + resp.tokenDaSessao + ';samesite=lax;path=/';
      //if (componenteExiste)
      contexto2.definirUsuarioLogado({
        id: resp.id,
        nome: resp.nome
      });
      if (urlParams.get('redir'))
        historico.push('/'+urlParams.get('redir'));
      else
      //if (urlAtual.pathname == '/entrar' || urlAtual.pathname == '/registrar')
        historico.push('/conta');
    })
    .catch(erro=>{
      console.log(erro);
      //if (componenteExiste)
        definirMensagem(''+erro);
        definirAguardando(false);
    //})
    //.finally(()=>{
      //if (componenteExiste)
      //  definirAguardando(false);
    });
  }

  return (
    <>
    {!cabecalho && !suspenso && <h2>Entrar</h2>}
    <div className='comEspacoParaMensagemDeErro'>
      <form className={cabecalho ? 'flex' : 'flex flexColumn'} onSubmit={e=>validarEntrada(e)}>
        <input id={'nomeDoUsuario'+cabecalhoString} name='nomeDoUsuario' placeholder='Usuário'
          onChange={()=>definirMensagem('')} onClick={()=>definirMensagem('')}
        />
        <input id={'senha'+cabecalhoString} name='senha' type='password' placeholder='Senha'
          onChange={()=>definirMensagem('')} onClick={()=>definirMensagem('')}
        />
        <div className='manterSessao'>
          <input id={'manterSessao'+cabecalhoString} name='manterSessao' type='checkbox'/>
          <label className={cabecalho ? 'reduzido' : ''} htmlFor={'manterSessao'+cabecalhoString}>
            Continuar conectado
          </label>
        </div>
        <div className={'spaceEvenly ' + (suspenso ? 'formularioDeEntradaSuspenso' : 'flex')}>
          <button className='botaoEntrar alturaBase' type='submit'>
            {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
          </button>
          <div className={!cabecalho && !suspenso ? 'registrar' : ''}>
          <Link to='/registrar'>
            Registrar-se
          </Link>
          </div>
        </div>
        {/*<p className='mensagemDeErroCentralizada'>{mensagem}</p>*/}
      </form>
      {mensagem && <p className='mensagemDeErro'>{mensagem}</p>}
    </div>
    </>
  )
}