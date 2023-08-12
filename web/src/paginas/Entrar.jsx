import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { contexto } from '../App';
import '../App.css'
import carregando from '../imagens/loading.svg'

export default function Entrar() {
  const urlNaMinhaCasa = ""+import.meta.env.VITE_IP_NA_MINHA_CASA+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = ""+import.meta.env.VITE_IP_NA_CASA_DE_WISNEY+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const abortista = new AbortController();
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const historico = useHistory();

  useEffect(()=>{
    if (contexto2.usuarioLogado)
      historico.push('/conta');

    //return abortista.abort();
  }, [])

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
      console.log(erro);
      definirMensagem(''+erro);
      definirAguardando(false);
    });
    //.finally(()=>definirAguardando(false));
  }

  function validarEntrada(e) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.target));
    if (!dados.nomeDoUsuario) {
      document.getElementById("nomeDoUsuario").focus();
      definirMensagem('Digite seu nome de usuário.');
      return;
    }
    if (!dados.senha) {
      document.getElementById("senha").focus();
      definirMensagem('Digite sua senha.');
      return;
    }
    definirMensagem('');
    definirAguardando(true);
    tentarEntrar(dados.nomeDoUsuario,dados.senha);
  }

  return (
    <div className='tudo'>
      <h2>Entrar</h2>
      <div>
        <form onSubmit={e=>validarEntrada(e)}>
          <div style={{display: 'grid', grid: 'auto/auto auto', justifyContent: 'start'}}>
            <label htmlFor='nomeDoUsuario' style={{color: 'white'}}>Usuário:</label>
            <input id='nomeDoUsuario' name='nomeDoUsuario' onChange={()=>definirMensagem('')} style={{margin: '0 0.5rem'}}/>
            <label htmlFor='senha' style={{color: 'white'}}>Senha:</label>
            <input id='senha' name='senha' type='password' onChange={()=>definirMensagem('')} style={{margin: '0 0.5rem'}}/>
          </div>
          <button className='botao' type='submit'>
            {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
          </button>
        </form>
        <p className='mensagemDeErro'>{mensagem}</p>
      </div>
    </div>
  )
}