import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { contexto } from '../App';
import carregando from '../imagens/loading.svg'
import { SERVIDOR } from '../../../enderecoDoServidor';

export default function FormularioDeEntradaNoCabecalho({funcFecharMenu, horizontal}) {
  //let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const historico = useHistory();
  const urlAtual = useLocation();
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const urlParams = new URLSearchParams(urlAtual.search);

  //useEffect(()=>{
  //  return ()=>componenteExiste = false;
  //}, [])

  useEffect(()=>{
    definirMensagem('');
    //console.log(urlAtual);
  }, [urlAtual])

  function validarEntrada(e) {
    e.preventDefault();
    if (aguardando)
      return;
    const dados = Object.fromEntries(new FormData(e.target));
    if (!dados.nomeDoUsuario) {
      document.getElementById('nomeDoUsuarioCabecalho').focus();
      //if (componenteExiste)
        definirMensagem('Digite seu nome de usuário.');
      return;
    }
    if (!dados.senha) {
      document.getElementById('senhaCabecalho').focus();
      //if (componenteExiste)
        definirMensagem('Digite sua senha.');
      return;
    }
    //console.log(dados.manterSessao);
    if (dados.manterSessao == 'on')
      dados.manterSessao = true;
    else
      dados.manterSessao = false;

    //if (componenteExiste) {
      definirMensagem('');
      definirAguardando(true);
    //}
    tentarEntrar(dados.nomeDoUsuario, dados.senha, dados.manterSessao);
  }

  function tentarEntrar(nomeDoUsuario, senha, manterSessao) {
    const dados = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nomeDoUsuario, senha, manterSessao}),
    };
    fetch(SERVIDOR+`/sessoes`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      funcFecharMenu();
      //localStorage.setItem('idDoUsuarioLogado', resp.id);
      //localStorage.setItem('usuarioLogado', resp.nome);
      //if (manterSessao)
      //  setCookie('tokenDaSessao', resp.tokenDaSessao, 30);
        document.cookie = 'tokenDaSessao=' + resp.tokenDaSessao
                          //+ ';expires=' + new Date(resp.dataDeExpiracao).toUTCString()
                          + (resp.manterSessao ? ';expires=' + new Date(resp.dataDeExpiracao).toUTCString() : '')
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
    <div>
      <form className={horizontal ? 'flex' : 'flex flexColumn'} onSubmit={e=>validarEntrada(e)}>
        <input id='nomeDoUsuarioCabecalho' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')} onClick={()=>definirMensagem('')}/>
        <input id='senhaCabecalho' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')} onClick={()=>definirMensagem('')}/>
        <div className='manterSessao'>
          <input id='manterSessaoCabecalho' name='manterSessao' type='checkbox'/>
          <label htmlFor='manterSessaoCabecalho'>Continuar conectado</label>
        </div>
        <div className={horizontal ? 'flex' : 'formularioDeEntradaSuspenso'}>
          <button className='botaoEntrar alturaBase' type='submit'>
            {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
          </button>
          <Link to='/registrar'>
            Registrar-se
          </Link>
        </div>
      </form>
      <p className='mensagemDeErro'>{mensagem}</p>
    </div>
  )
}