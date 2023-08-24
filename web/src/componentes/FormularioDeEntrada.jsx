import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { contexto } from '../App';
import carregando from '../imagens/loading.svg'

export default function FormularioDeEntrada({funcFecharMenu, horizontal}) {
  //let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const urlNaMinhaCasa = contexto2.hostCasa;
  const urlNaCasaDeWisney = contexto2.hostWisney;
  const historico = useHistory();
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');

  //useEffect(()=>{
  //  return ()=>componenteExiste = false;
  //}, [])

  function validarEntrada(e) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.target));
    if (!dados.nomeDoUsuario) {
      document.getElementById("nomeDoUsuarioCabecalho").focus();
      //if (componenteExiste)
        definirMensagem('Digite seu nome de usuário.');
      return;
    }
    if (!dados.senha) {
      document.getElementById("senhaCabecalho").focus();
      //if (componenteExiste)
        definirMensagem('Digite sua senha.');
      return;
    }
    //if (componenteExiste) {
      definirMensagem('');
      definirAguardando(true);
    //}
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
        funcFecharMenu();
        sessionStorage.setItem("usuarioLogado", resp.nome);
        //if (componenteExiste)
          contexto2.definirUsuarioLogado(resp.nome);
        historico.push('/conta');
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (''+erro == 'AggregateError: No Promise in Promise.any was resolved') {
        console.log('Não foi possível se comunicar com o servidor.');
        //if (componenteExiste)
          definirMensagem('Não foi possível se comunicar com o servidor.');
      } else //if (componenteExiste)
        definirMensagem(''+erro);
    //})
    //.finally(()=>{
      //if (componenteExiste)
      //  definirAguardando(false);
    });
  }

  return (
    <div>
      <form className={horizontal ? 'flex' : 'flex flexColumn'} onSubmit={e=>validarEntrada(e)}>
        <input id='nomeDoUsuarioCabecalho' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')}/>
        <input id='senhaCabecalho' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')}/>
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