import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { contexto } from '../App';
import carregando from '../imagens/loading.svg'
import { SERVIDOR } from '../../../enderecoDoServidor';

export default function Entrar() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const historico = useHistory();

  useEffect(()=>{
    if (contexto2.usuarioLogado)
      historico.push('/conta');

    return ()=>componenteExiste = false;
  }, [])

  function tentarEntrar(nomeDoUsuario, senha) {
    const dados = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nomeDoUsuario, senha}),
    };
    fetch(SERVIDOR+`/entrar`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      else {
        sessionStorage.setItem("idDoUsuarioLogado", resp.id);
        sessionStorage.setItem("usuarioLogado", resp.nome);
        contexto2.definirUsuarioLogado(resp);
        historico.push('/conta');
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (componenteExiste) {
        definirMensagem(''+erro);
        definirAguardando(false);
      }
    });
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
    <div className='conteudo'>
      <h2>Entrar</h2>
      <div>
        <form className='flex flexColumn' onSubmit={e=>validarEntrada(e)}>
          <input id='nomeDoUsuario' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')}/>
          <input id='senha' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')}/>
          <button className='alturaBase' type='submit'>
            {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
          </button>
        </form>
        <p className='mensagemDeErro'>{mensagem}</p>
      </div>
    </div>
  )
}