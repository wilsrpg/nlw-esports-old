import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { contexto } from '../App';
import '../App.css'
import carregando from '../imagens/loading.svg'

export default function Configuracoes() {
  let componenteExiste = true;
  const urlNaMinhaCasa = ""+import.meta.env.VITE_IP_NA_MINHA_CASA+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = ""+import.meta.env.VITE_IP_NA_CASA_DE_WISNEY+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const [erroAoValidar, definirErroAoValidar] = useState(false);
  const historico = useHistory();

  useEffect(()=>{
    if (!contexto2.usuarioLogado)
      historico.push('/entrar');

    return ()=>componenteExiste = false;
  }, [])

  function tentarAlterarSenha(senha,novaSenha) {
    const endereco = `/alterarsenha`;
    const abortista = new AbortController();
    const dados = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nomeDoUsuario: contexto2.usuarioLogado, senha, novaSenha}),
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
      else if (componenteExiste) {
        definirErroAoValidar(false);
        definirMensagem('Senha alterada com sucesso.');
      }
    })
    .catch(erro=>{
      console.log(erro);
      let msgErro=''+erro;
      if (msgErro == 'AggregateError: No Promise in Promise.any was resolved') {
        msgErro = 'Não foi possível se comunicar com o servidor.';
        console.log(msgErro);
      }
      if (componenteExiste)
        definirMensagem(msgErro);
    })
    .finally(()=>{
      if (componenteExiste)
        definirAguardando(false);
    });
  }

  function validarAlteracaoDeSenha(e) {
    e.preventDefault();
    definirErroAoValidar(true);
    const dados = Object.fromEntries(new FormData(e.target));
    if (!dados.senhaAtual) {
      document.getElementById("senhaAtual").focus();
      definirMensagem('Digite sua senha atual.');
      return;
    }
    if (!dados.novaSenha) {
      document.getElementById("novaSenha").focus();
      definirMensagem('Digite sua nova senha.');
      return;
    }
    if (!dados.confirmarNovaSenha) {
      document.getElementById("confirmarNovaSenha").focus();
      definirMensagem('Repita sua nova senha.');
      return;
    }
    if (dados.novaSenha != dados.confirmarNovaSenha) {
      //document.getElementById("confirmarSenha").focus();
      definirMensagem('As senhas digitadas não são iguais.');
      return;
    }
    if (dados.senhaAtual == dados.novaSenha) {
      //document.getElementById("confirmarSenha").focus();
      definirMensagem('A nova senha não pode ser igual à atual.');
      return;
    }
    definirMensagem('');
    definirAguardando(true);
    tentarAlterarSenha(dados.senhaAtual,dados.novaSenha);
  }

  return (
    <div className='conteudo'>
      <h2>Configurações</h2>
      <strong>Alterar senha</strong>
      <div>
        <form onSubmit={e=>validarAlteracaoDeSenha(e)}>
          <div
          style={{display: 'grid', grid: 'auto/auto auto', justifyContent: 'start'}}
          >
            <label htmlFor='senhaAtual'
            >Senha atual:</label>
            <input id='senhaAtual' name='senhaAtual' type='password' onChange={()=>definirMensagem('')}
              style={{margin: '0 0.5rem', height: 'fit-content'}}
            />
            <label htmlFor='novaSenha'
            >Nova senha:</label>
            <input id='novaSenha' name='novaSenha' type='password' onChange={()=>definirMensagem('')}
              style={{margin: '0 0.5rem', height: 'fit-content'}}
            />
            <label htmlFor='confirmarNovaSenha'
            >Repita a nova senha:</label>
            <input id='confirmarNovaSenha' name='confirmarNovaSenha' type='password' onChange={()=>definirMensagem('')}
              style={{margin: '0 0.5rem', height: 'fit-content'}}
            />
          </div>
          <button className='botao' type='submit'>
            {aguardando ? <img className='carregando' src={carregando}/> : 'Salvar'}
          </button>
        </form>
        <p className={erroAoValidar ? 'mensagemDeErro' : 'mensagemDeSucesso'}>{mensagem}</p>
      </div>
    </div>
  )
}