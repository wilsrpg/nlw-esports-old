import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { contexto } from '../App';
import carregando from '../imagens/loading.svg'
import { SERVIDOR } from '../../../enderecoDoServidor';

export default function Registrar() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const historico = useHistory();

  useEffect(()=>{
    document.title = 'Criar nova conta - NLW eSports';
    //if (contexto2.usuarioLogado)
    //  historico.push('/conta');

    return ()=>componenteExiste = false;
  }, [])

  function validarRegistro(e) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.target));
    if (!dados.nomeDoUsuario) {
      document.getElementById('nomeDoUsuario').focus();
      definirMensagem('Digite seu nome de usuário.');
      return;
    }
    if (!dados.senha) {
      document.getElementById('senha').focus();
      definirMensagem('Digite sua senha.');
      return;
    }
    if (!dados.confirmarSenha) {
      document.getElementById('confirmarSenha').focus();
      definirMensagem('Confirme sua senha.');
      return;
    }
    if (dados.senha != dados.confirmarSenha) {
      definirMensagem('As senhas digitadas não são iguais.');
      return;
    }
    definirMensagem('');
    definirAguardando(true);
    tentarRegistrar(dados.nomeDoUsuario,dados.senha);
  }

  function tentarRegistrar(nomeDoUsuario, senha) {
    const dados = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nomeDoUsuario, senha}),
    };
    fetch(SERVIDOR+`/usuarios`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      //localStorage.setItem('idDoUsuarioLogado', resp.id);
      //localStorage.setItem('usuarioLogado', resp.nome);
      //setCookie('tokenDaSessao', resp.tokenDaSessao, 30);
      //contexto2.definirUsuarioLogado(resp);
      //historico.push('/conta');
      alert('Conta criada com sucesso. Entre com seu nome de usuário e senha para acessar o sistema.');
      historico.push('/entrar');
    })
    .catch(erro=>{
      console.log(erro);
      if (componenteExiste) {
        definirMensagem(''+erro);
        definirAguardando(false);
      }
    });
  }

  return (
    <div className='conteudo'>
      {!contexto2.usuarioLogado ?
        <>
        <h2>Criar nova conta</h2>
        <div>
          <form className='flex flexColumn' onSubmit={e=>validarRegistro(e)}>
            <input id='nomeDoUsuario' name='nomeDoUsuario' placeholder='Usuário' onChange={()=>definirMensagem('')}/>
            <input id='senha' name='senha' type='password' placeholder='Senha' onChange={()=>definirMensagem('')}/>
            <input id='confirmarSenha' name='confirmarSenha' onChange={()=>definirMensagem('')} type='password' placeholder='Repita a senha'/>
            <button className='alturaBase' type='submit'>
              {aguardando ? <img className='carregando' src={carregando}/> : 'Registrar'}
            </button>
          </form>
          <p className='mensagemDeErro'>{mensagem}</p>
        </div>
        </>
      :
        <p>Desconecte a conta atual para registrar uma nova.</p>
      }
    </div>
  )
}