import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { contexto } from '../App';
import carregando from '../imagens/loading.svg'
import { SERVIDOR } from '../../../enderecoDoServidor';
//import FormularioDeEntrada from '../componentes/FormularioDeEntrada';

export default function NovoAnuncio() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [jogos, definirJogos] = useState();
  const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
  //const dias = [
  //  {abrev:'D', nome:'domingo'},
  //  {abrev:'S', nome:'segunda'},
  //  {abrev:'T', nome:'terça'},
  //  {abrev:'Q', nome:'quarta'},
  //  {abrev:'Q', nome:'quinta'},
  //  {abrev:'S', nome:'sexta'},
  //  {abrev:'S', nome:'sábado'},
  //];
  //const [usaChatDeVoz, definirUsaChatDeVoz] = useState(false);
  const [publicando, definirPublicando] = useState(false);
  const historico = useHistory();
  const urlAtual = useLocation();
  const [diasDisponiveis, definirDiasDisponiveis] = useState([[false,false,false,false,false,false,false]]);

  useEffect(()=>{
    document.title = 'Publicar anúncio - NLW eSports';
    const tokenDaSessao = contexto2.getCookie('tokenDaSessao');
    if (!tokenDaSessao || !contexto2.usuarioLogado) {
      document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
      contexto2.definirUsuarioLogado();
      historico.push('/entrar?redir='+urlAtual.pathname.slice(1));
      return;
    }
    //contexto2.autenticarSessao()
    //.then(resp=>{
    //  //console.log(resp);
    //  if (!resp || !contexto2.usuarioLogado) {
    //    document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
    //    historico.push('/entrar?redir='+urlAtual.pathname.slice(1));
    //    //historico.push('/entrar');
    //  } else {
        fetch(SERVIDOR+`/jogos`)
        .then(resp=>resp.json())
        .then(resp=>{
          if (resp.erro)
            throw resp.erro;
          if (componenteExiste) {
            definirErroAoObterDados(false);
            definirJogos(resp);
          }
        })
        .catch(erro=>{
          console.log(erro);
          if (componenteExiste)
            definirErroAoObterDados(true);
        });
    //  }
    //});

    return ()=>componenteExiste = false;
  }, [])

  function publicarAnuncio(e) {
    if (publicando)
      return;
    e.preventDefault();
    if (document.getElementById('jogo').value == 'nenhum') {
      //document.getElementById('jogo').style.backgroundColor = 'red';
      document.getElementById('jogo').style.animation = 'chamarAtencao 500ms';
      document.getElementById('jogo').focus();
      setTimeout(() => {
        document.getElementById('jogo').style.animation = '';
      }, 500);
      return;
    }
    if (!document.getElementById('tempoDeJogoAnos').value && !document.getElementById('tempoDeJogoMeses').value) {
      document.getElementById('tempoDeJogo').style.animation = 'chamarAtencao 500ms';
      document.getElementById('tempoDeJogo').focus();
      setTimeout(() => {
        document.getElementById('tempoDeJogo').style.animation = '';
      }, 500);
      return;
    }
    let tdsdisps = true;
    diasDisponiveis.map((disp,i)=>{
      if (!tdsdisps)
        return;
      let id = i == 0 ? '' : i+1;
      if (!disp.some(dia=>dia)) {
        document.getElementById('quando'+id).style.animation = 'chamarAtencao 1000ms';
        //dias.map(dia=>document.getElementById(dia.dia).style.animation = 'chamarAtencaoDias 0.5s')
        setTimeout(() => {
          document.getElementById('quando'+id).style.animation = '';
          //dias.map(dia=>document.getElementById(dia.dia).style.animation = '')
        }, 1000);
        tdsdisps = false;
      }
    });
    if (!tdsdisps)
      return;
    
    const dados = Object.fromEntries(new FormData(e.target));
    let tempoDeJogoEmMeses = dados.tempoDeJogoAnos*12 + dados.tempoDeJogoMeses*1;
    //if (document.getElementById('tempoDeJogoAnos').value)
    //  tempoDeJogoEmMeses += parseInt(document.getElementById('tempoDeJogoAnos').value)*12;
    //if (document.getElementById('tempoDeJogoMeses').value)
    //  tempoDeJogoEmMeses += parseInt(document.getElementById('tempoDeJogoMeses').value);

    const disponibilidades = [];
    diasDisponiveis.map((disp,i)=>{
      const diasDisp = [];
      disp.map((dia,j)=>{
        if (dia)
          diasDisp.push(j);
      });
      let id = i == 0 ? '' : i+1;
      if (diasDisp.length)
        disponibilidades.push({dias: diasDisp.join(), horaDeInicio: dados['de'+id], horaDeTermino: dados['ate'+id]});
    });

    if (dados.usaChatDeVoz == 'on')
      dados.usaChatDeVoz = true;
    else
      dados.usaChatDeVoz = false;

    const novoAnuncio = {
      idDoJogo: dados.idDoJogo,
      idDoUsuario: contexto2.usuarioLogado.id,
      nomeNoJogo: dados.nome,
      tempoDeJogoEmMeses,
      discord: dados.discord,
      disponibilidades,
      usaChatDeVoz: dados.usaChatDeVoz,
    };

    //console.log(novoAnuncio);
    definirPublicando(true);
    tentarPublicar(novoAnuncio);
  }

  function tentarPublicar(anuncio) {
    //const tokenDaSessao = getCookie('tokenDaSessao');
    //const tokenDaSessao = contexto2.getCookie('tokenDaSessao');
    //if (!tokenDaSessao || tokenDaSessao == '0') {
    //  contexto2.definirUsuarioLogado();
    //  historico.push('/entrar');
    //  return;
    //}
    const tokenDaSessao = contexto2.getCookie('tokenDaSessao');
    if (!tokenDaSessao || !contexto2.usuarioLogado) {
      document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
      contexto2.definirUsuarioLogado();
      historico.push('/entrar?redir='+urlAtual.pathname.slice(1));
      return;
    }
    //const tokenDaSessao = contexto2.autenticarSessao();
    //tokenDaSessao.then(resp=>{
    //  //console.log('/resultadosDaPesquisa, token='+resp);
    //  //console.log(resp);
    //  if (!resp || !contexto2.usuarioLogado) {
    //    document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
    //    historico.push('/entrar?redir='+urlAtual.pathname.slice(1));
    //    //historico.push(urlAtual.pathname);
    //  } else {
        const dados = {
          method: 'PUT',
          //headers: {'Content-Type': 'application/json'},
          headers: {'Content-Type': 'application/json', 'Authorization': tokenDaSessao},
          body: JSON.stringify({anuncio})
        };
        fetch(SERVIDOR+`/anuncios`, dados)
        .then(resp=>resp.json())
        .then(resp=>{
          if (resp.erro)
            throw resp.erro;
          alert('Anúncio publicado com sucesso!');
          if (componenteExiste)
            definirPublicando(false);
          alert('Anúncio publicado com sucesso!');
        })
        .catch(erro=>{
          console.log(erro);
          if (erro.codigo == 401) {
            document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
            contexto2.definirUsuarioLogado();
            historico.push('/entrar?redir='+urlAtual.pathname.slice(1));
            //historico.push('/entrar');
          } else {
            alert('Erro ao publicar anúncio. Verifique o console de seu navegador para mais detalhes.');
            if (componenteExiste)
              definirPublicando(false);
          }
        });
    //  }
    //});
  }

  //function getCookie(cname) {
  //  let name = cname + '=';
  //  let decodedCookie = decodeURIComponent(document.cookie);
  //  let ca = decodedCookie.split(';');
  //  for(let i = 0; i < ca.length; i++) {
  //    let c = ca[i];
  //    while (c.charAt(0) == ' ') {
  //      c = c.substring(1);
  //    }
  //    if (c.indexOf(name) == 0) {
  //      return c.substring(name.length, c.length);
  //    }
  //  }
  //  return '';
  //}

  return (
    <div className='conteudo'>
      {/*{!contexto2.usuarioLogado ?
        <FormularioDeEntrada/>
      :*/}
      {contexto2.usuarioLogado &&
        <>
        <h2>Publique seu anúncio</h2>
        <form className='flex flexColumn fundoSemitransparente' onSubmit={publicarAnuncio}>

          <label>Jogo</label>
          <select disabled={!jogos} id='jogo' name='idDoJogo'
            onFocus={e=>e.target.style.backgroundColor=''}
          >
            <option value='nenhum'>
              {!jogos ?
                (!erroAoObterDados ? 'Buscando jogos...' : 'Erro ao obter dados dos jogos do servidor.')
              :
                'Selecione um jogo'
              }
            </option>
            {jogos && jogos.map((jogo,id)=>{
              return <option key={id} value={jogo.id}>{jogo.nome}</option>
            })}
          </select>

          <label htmlFor='nome'>Nome no jogo</label>
          <input id='nome' name='nome' required/>

          <div className='aoLado'>

            <div className='flex flexColumn'>
              <label htmlFor='discord'>Discord</label>
              {/*<input id='discord' name='discord' placeholder='Nome de Usuário#0000' pattern='.*[\S][#][\d]{4}' required/>*/}
              <input id='discord' name='discord' required/>
            </div>

            <div className='flex flexColumn'>
              {/*<label htmlFor='tempo de jogo'>Joga há quantos anos?</label>*/}
              {/*<input id='tempo de jogo' name='tempoDeJogo' type='tel' maxLength='2' pattern='\d*' required/>*/}
              <label>Joga há quanto tempo?</label>
              <div id='tempoDeJogo' className='flex flexWrap dias'>
                <input id='tempoDeJogoAnos' className='tempoDeJogo' name='tempoDeJogoAnos' type='tel' maxLength='2' pattern='\d*'/>
                <label htmlFor='tempoDeJogoAnos'>ano(s)</label>
                <input id='tempoDeJogoMeses' className='tempoDeJogo' name='tempoDeJogoMeses' type='tel' maxLength='2' pattern='\d*'/>
                <label htmlFor='tempoDeJogoMeses'>mês(es)</label>
              </div>
            </div>

          </div>

          <div className='flex'>
            <label>Horários disponíveis</label>
            <button className='carregando' type='button'
              onClick={()=>
                definirDiasDisponiveis(diasDisponiveis.concat([[false,false,false,false,false,false,false]]))
              }
            >
              +
            </button>
          </div>

          {diasDisponiveis.map((disp,i)=>{
            let id = i == 0 ? '' : i+1;
            return (
              <div key={i} className='aoLado'>
                <div id={'quando'+id} className='flex dias'>
                  {disp.map((dia,j)=>
                    <input
                      key={j}
                      //id={dia.nome}
                      type='button'
                      value={dias[j].slice(0,1).toUpperCase()}
                      title={dias[j]}
                      className={dia ? 'roxinho' : ''}
                      onClick={()=>{
                        document.getElementById('quando'+id).style.borderColor='#71717a';
                        definirDiasDisponiveis([
                          ...diasDisponiveis.slice(0,i),
                          //{...dia, marcado: !dia.marcado},
                          [...disp.slice(0,j), !dia, ...disp.slice(j+1)],
                          ...diasDisponiveis.slice(i+1)
                        ]);
                      }}
                    />
                  )}
                </div>
                {/*<select id={'quando'+id} name={'quando'+id}>
                  <option value='todoDia'>Todo dia</option>
                  <option value='semana'>De segunda a sexta</option>
                  <option value='finsDeSemana'>Fins de semana</option>
                  {dias.map((dia,j)=>
                    <option key={j} value={dia.nome}>{dia.nome[0].toUpperCase()+dia.nome.slice(1)}</option>
                  )}
                </select>*/}
                <div className='flex' key={i*2+1}>
                  <div className='flex'>
                    <label htmlFor={'de'+id}>De</label>
                    <input id={'de'+id} name={'de'+id} type='time' required onChange={()=>{
                      const ate = document.getElementById('ate'+id);
                      if (ate.value && ate.value <= document.getElementById('de'+id).value) {
                        //ate.style.backgroundColor = 'lightgray';
                        ate.style.cursor = 'help';
                        ate.title = 'Do dia seguinte';
                      } else {
                        //ate.style.backgroundColor = '';
                        ate.style.cursor = 'default';
                        ate.title = '';
                      }
                    }}/>
                  </div>
                  <div className='flex'>
                    <label htmlFor={'ate'+id}>Até</label>
                    <input id={'ate'+id} name={'ate'+id} type='time' required onChange={()=>{
                      const ate = document.getElementById('ate'+id);
                      if (ate.value && ate.value <= document.getElementById('de'+id).value) {
                        //ate.style.backgroundColor = 'lightgray';
                        ate.style.cursor = 'help';
                        ate.title = 'Do dia seguinte';
                      } else {
                        //ate.style.backgroundColor = '';
                        ate.style.cursor = 'default';
                        ate.title = '';
                      }
                    }}/>
                    {diasDisponiveis.length == 1 &&
                      <div className='carregando'/>
                    }
                    {diasDisponiveis.length > 1 &&
                      <button className='carregando' type='button'
                        onClick={()=>{
                          //console.log('clicou no '+i);
                          //let dispNovo = [...diasDisponiveis];
                          for(let j=i; j < diasDisponiveis.length-1; j++){
                            let atual = j == 0 ? '' : j+1;
                            let proximo = j+2;
                            //document.getElementById('quando'+atual).value = document.getElementById('quando'+proximo).value;
                            //dispNovo[j] = dispNovo[j+1];
                            //diasDisponiveis[j] = diasDisponiveis[j+1];
                            document.getElementById('de'+atual).value = document.getElementById('de'+proximo).value;
                            document.getElementById('ate'+atual).value = document.getElementById('ate'+proximo).value;
                          }
                          //console.log(dispNovo);
                          //definirDiasDisponiveis(dispNovo.slice(1));
                          definirDiasDisponiveis([
                            ...diasDisponiveis.slice(0,i),
                            //dispNovo[],
                            ...diasDisponiveis.slice(i+1)
                          ]);
                          //definirDiasDisponiveis(diasDisponiveis.slice(1));
                        }}
                      >
                        ×
                      </button>
                    }
                  </div>
                </div>
              </div>
            )
          })}

          <div className='chatDeVoz'>
            <input id='voz' name='usaChatDeVoz' type='checkbox'/>
            <label htmlFor='voz'>Costumo usar o chat de voz</label>
          </div>

          <button type='submit' disabled={publicando} className='botaoPublicarAnuncio roxinho'>
            {!publicando ? 'Publicar' : <img className='carregando' src={carregando}/>}
          </button>

        </form>
        </>
      }

    </div>
  )
}