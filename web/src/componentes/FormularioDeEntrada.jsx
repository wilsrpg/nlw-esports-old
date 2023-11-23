import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { contexto } from '../App';
import carregando from '../imagens/loading.svg'
import { SERVIDOR } from '../../../enderecoDoServidor';

export default function FormularioDeEntrada() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const paginaAtual = useLocation();
  const historico = useHistory();

  useEffect(()=>{

    return ()=>componenteExiste = false;
  }, []);

  //useEffect(()=>{
  //  console.log(paginaAtual);
  //}, [paginaAtual]);

  function validarEntrada(e) {
    e.preventDefault();
    if (aguardando)
      return;
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
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nomeDoUsuario, senha, manterSessao}),
    };
    fetch(SERVIDOR+`/sessoes`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      else {
        //localStorage.setItem("idDoUsuarioLogado", resp.id);
        //localStorage.setItem("usuarioLogado", resp.nome);
        //if (manterSessao)
          document.cookie = 'tokenDaSessao=' + resp.tokenDaSessao
                            //+ ';expires=' + new Date(resp.dataDeExpiracao).toUTCString()
                            + (resp.manterSessao ? ';expires=' + new Date(resp.dataDeExpiracao).toUTCString() : '')
                            + ';samesite=lax;path=/';
          //setCookie('tokenDaSessao', resp.tokenDaSessao, 30);
        //else
        //  document.cookie = 'tokenDaSessao=' + resp.tokenDaSessao + ';samesite=lax;path=/';
        contexto2.definirUsuarioLogado({
          id: resp.id,
          nome: resp.nome
        });
        if (paginaAtual.pathname == '/entrar' || paginaAtual.pathname == '/registrar')
          historico.push('/conta');
        //historico.refresh();
      }
    })
    .catch(erro=>{
      //console.log(erro);
      if (componenteExiste) {
        definirMensagem(''+erro);
        definirAguardando(false);
      }
    });
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";samesite=lax;path=/";
  }

  return (
    <>
      <h2>Entrar</h2>
      <div>
        <form className='flex flexColumn' onSubmit={e=>validarEntrada(e)}>
          <input id='nomeDoUsuario' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')} onClick={()=>definirMensagem('')}/>
          <input id='senha' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')} onClick={()=>definirMensagem('')}/>
          <div className='manterSessao'>
            <input id="manterSessao" name="manterSessao" type="checkbox"/>
            <label htmlFor="manterSessao">Continuar conectado</label>
          </div>
          <button className='alturaBase' type='submit'>
            {aguardando ? <img className='carregando' src={carregando}/> : 'Entrar'}
          </button>
        </form>
        <p className='mensagemDeErro'>{mensagem}</p>
      </div>
    </>
  )
}