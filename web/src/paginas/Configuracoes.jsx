import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { contexto } from '../App';
import carregando from '../imagens/loading.svg'
import { SERVIDOR } from '../../../enderecoDoServidor';
import FormularioDeEntrada from '../componentes/FormularioDeEntrada';

export default function Configuracoes() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const [aguardando, definirAguardando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const [erroAoValidar, definirErroAoValidar] = useState(false);
  const [confirmandoExclusaoDaConta, definirConfirmandoExclusaoDaConta] = useState(false);
  const [aguardandoExcluir, definirAguardandoExcluir] = useState(false);
  const [mensagemExcluir, definirMensagemExcluir] = useState('');
  const historico = useHistory();

  useEffect(()=>{
    //if (!contexto2.usuarioLogado)
    //  historico.push('/entrar');

    return ()=>componenteExiste = false;
  }, [])

  function validarAlteracaoDeSenha(e) {
    e.preventDefault();
    if (aguardando)
      return;
    definirErroAoValidar(true);
    const dados = Object.fromEntries(new FormData(e.target));
    if (!dados.senhaAtual) {
      document.getElementById('senhaAtual').focus();
      definirMensagem('Digite sua senha atual.');
      return;
    }
    if (!dados.novaSenha) {
      document.getElementById('novaSenha').focus();
      definirMensagem('Digite sua nova senha.');
      return;
    }
    if (!dados.confirmarNovaSenha) {
      document.getElementById('confirmarNovaSenha').focus();
      definirMensagem('Repita sua nova senha.');
      return;
    }
    if (dados.novaSenha != dados.confirmarNovaSenha) {
      //document.getElementById('confirmarSenha').focus();
      definirMensagem('As senhas digitadas não são iguais.');
      return;
    }
    if (dados.senhaAtual == dados.novaSenha) {
      //document.getElementById('confirmarSenha').focus();
      definirMensagem('A nova senha não pode ser igual à atual.');
      return;
    }
    definirMensagem('');
    definirAguardando(true);
    tentarAlterarSenha(dados.senhaAtual,dados.novaSenha);
  }

  function tentarAlterarSenha(senha,novaSenha) {
    const tokenDaSessao = getCookie('tokenDaSessao');
    const dados = {
      method: 'POST',
      //headers: {'Content-Type': 'application/json'},
      headers: {'Content-Type': 'application/json', 'Authorization': tokenDaSessao},
      body: JSON.stringify({id: contexto2.usuarioLogado.id, senha, novaSenha}),
    };
    fetch(SERVIDOR+`/usuarios/senha`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      if (componenteExiste) {
        definirErroAoValidar(false);
        definirMensagem('Senha alterada com sucesso.');
      }
    })
    .catch(erro=>{
      //console.log(erro);
      if (componenteExiste)
        definirMensagem(''+erro);
    })
    .finally(()=>{
      if (componenteExiste)
        definirAguardando(false);
    });
  }

  function validarExclusaoDaConta() {
    const senha = document.getElementById('confirmarSenhaParaExclusaoDaConta').value;
    if (!senha) {
      definirMensagemExcluir('Digite sua senha.');
      document.getElementById('confirmarSenhaParaExclusaoDaConta').focus();
      return;
    }
    if (confirm('Excluir permanentemente esta conta? Esta ação é irreversível.')) {
      definirAguardandoExcluir(true);
      tentarExcluirConta(senha);
    }
  }

  function tentarExcluirConta(senha) {
    const tokenDaSessao = getCookie('tokenDaSessao');
    const dados = {
      method: 'DELETE',
      //headers: {'Content-Type': 'application/json'},
      headers: {'Content-Type': 'application/json', 'Authorization': tokenDaSessao},
      body: JSON.stringify({senha}),
    };
    fetch(SERVIDOR+`/usuarios/${contexto2.usuarioLogado.id}`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      if (componenteExiste) {
        //localStorage.removeItem('usuarioLogado');
        //localStorage.removeItem('idDoUsuarioLogado');
        document.cookie = 'tokenDaSessao=0;expires=0;samesite=lax;path=/';
        contexto2.definirUsuarioLogado();
        alert('Conta excluída.');
        historico.push('/entrar');
      }
    })
    .catch(erro=>{
      console.log(erro);
      definirAguardandoExcluir(false);
      definirMensagemExcluir(''+erro);
    });
  }

  function desconectarOutrosDispositivos() {
    if (!confirm('Desconectar conta de todos os outros dispositivos?'))
      return;
    const tokenDaSessao = getCookie('tokenDaSessao');
    const dados = {
      method: 'DELETE',
      //headers: {'Content-Type': 'application/json'},
      headers: {'Authorization': tokenDaSessao},
      //body: JSON.stringify({id: contexto2.usuarioLogado.id, tokenDaSessao}),
    };
    fetch(SERVIDOR+`/outras-sessoes/${contexto2.usuarioLogado.id}`, dados)
    //fetch(SERVIDOR+`/outras-sessoes/${contexto2.usuarioLogado.id}/${tokenDaSessao}`, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      if (componenteExiste) {
        if (resp.qtdeSessoesDesconectadas == 0)
          alert('Esta conta não está conectada em outros dispositivos.');
        else
          alert('Esta conta foi desconectada de '+resp.qtdeSessoesDesconectadas+' outro(s) dispositivo(s).');
      }
    })
    .catch(erro=>{
      console.log(erro);
      alert('Erro ao tentar desconectar outros dispositivos. Verifique o console de seu navegador para mais\
        detalhes.');
    });
  }
  
  function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  return (
    <div className='conteudo'>
      {!contexto2.usuarioLogado ?
        <FormularioDeEntrada/>
      :
        <>
        <h2>Configurações</h2>
        <strong>Alterar senha</strong>
        <div>
          <form className='flex flexColumn' onSubmit={e=>validarAlteracaoDeSenha(e)}>
            <input id='senhaAtual' name='senhaAtual' type='password' placeholder='Senha atual' onChange={()=>definirMensagem('')}/>
            <input id='novaSenha' name='novaSenha' type='password' placeholder='Nova senha' onChange={()=>definirMensagem('')}/>
            <input id='confirmarNovaSenha' name='confirmarNovaSenha' type='password' placeholder='Repita a nova senha' onChange={()=>definirMensagem('')}/>
            <button className='alturaBase' type='submit'>
              {aguardando ? <img className='carregando' src={carregando}/> : 'Salvar'}
            </button>
          </form>
          <p className={erroAoValidar ? 'mensagemDeErro' : 'mensagemDeSucesso'}>{mensagem}</p>
        </div>

        <strong>Desconectar outros dispositivos</strong>
        <button className='alturaBase' onClick={desconectarOutrosDispositivos}>Desconectar</button>

        <strong>Excluir conta</strong>
        {!confirmandoExclusaoDaConta ?
          <button className='excluirConta alturaBase' onClick={()=>definirConfirmandoExclusaoDaConta(true)}>
            Excluir minha conta
          </button>
        :
          <>
          <p>Digite sua senha novamente antes de prosseguir com esta operação.</p>
          <div>
            <div className='flex flexColumn'>
              <input id='confirmarSenhaParaExclusaoDaConta' type='password' placeholder='Senha atual' onChange={()=>definirMensagemExcluir('')}/>
              <button className='excluirConta alturaBase' onClick={validarExclusaoDaConta}>
                {aguardandoExcluir ? <img className='carregando' src={carregando}/> : 'Excluir minha conta'}
              </button>
              <button className='alturaBase' onClick={()=>{
                definirConfirmandoExclusaoDaConta(false);
                definirMensagemExcluir('');
              }}>
                Cancelar
              </button>
            </div>
            <p className='mensagemDeErro'>{mensagemExcluir}</p>
          </div>
          </>
        }
        </>
      }
    </div>
  )
}