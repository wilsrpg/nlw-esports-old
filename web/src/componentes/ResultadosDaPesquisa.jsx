import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { contexto } from '../App';
import CartaoDeAnuncio from './CartaoDeAnuncio';
import carregando from '../imagens/loading.svg'
import ModalConectar from './ModalConectar';
import { SERVIDOR } from '../../../enderecoDoServidor';

export default function ResultadosDaPesquisa({filtros}) {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [paginas, definirPaginas] = useState(['']);
  const [paginaAtual, definirPaginaAtual] = useState(1);
  const [anuncios, definirAnuncios] = useState();
  const [resultadosPorPagina, definirResultadosPorPagina] = useState(10);
  const [ordenarPor, definirOrdenarPor] = useState('');
  const [emOrdem, definirEmOrdem] = useState('');
  const [anunciosPorPagina, definirAnunciosPorPagina] = useState();
  const [discord, definirDiscord] = useState('');
  const historico = useHistory();
  const urlAtual = useLocation();
  const [botoesDeExcluirDesabilitados, definirBotoesDeExcluirDesabilitados] = useState(false);
  const [paginacao, definirPaginacao] = useState(['1']);

  useEffect(()=>{
    //const tokenDaSessao = contexto2.getCookie('tokenDaSessao');
    //este componente está presente em duas páginas, uma delas pública, por isso a condição é diferente:
    //if (!tokenDaSessao && contexto2.usuarioLogado) {
    //  document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
    //  contexto2.definirUsuarioLogado();
    //  if (urlAtual.pathname == '/meus-anuncios')
    //    historico.push('/entrar?redir='+urlAtual.pathname.slice(1));
    //  else
    //    historico.push(urlAtual.pathname);
    //  return;
    //}
    //const tokenDaSessao = contexto2.autenticarSessao();
    //tokenDaSessao.then(resp=>{
    //  //console.log('/resultadosDaPesquisa, token='+resp);
    //  //console.log(resp);
    //  if (!resp && contexto2.usuarioLogado) {
    //    document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
    //    contexto2.definirUsuarioLogado();
    //    //console.log('redirecionou');
    //    if (urlAtual.pathname == '/meus-anuncios')
    //      historico.push('/entrar?redir=meus-anuncios');
    //    else
    //      historico.push(urlAtual.pathname);
    //  }
    //});

    return ()=>componenteExiste = false;
  }, [])

  useEffect(()=>{
    const dados = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      //body: JSON.stringify(filtros),
    };
    //console.log(filtros);
    //console.log(dados.body);
    const querystring = '?' + new URLSearchParams(filtros).toString();
    //const objString = '?' + new URLSearchParams(dados.body).toString();
    //console.log(objString);

    fetch(SERVIDOR+`/anuncios`+querystring, dados)
    .then(resp=>resp.json())
    .then(resp=>{
      if (resp.erro)
        throw resp.erro;
      if (componenteExiste) {
        definirErroAoObterDados(false);
        definirAnuncios(resp.anuncios);
        //resp.totalDeAnuncios?;
        
        if (filtros.resultadosPorPagina) definirResultadosPorPagina(filtros.resultadosPorPagina);
        else definirResultadosPorPagina(10);

        if (filtros.ordenarPor) definirOrdenarPor(filtros.ordenarPor);
        else definirOrdenarPor('');

        if (filtros.emOrdem) definirEmOrdem(filtros.emOrdem);
        else definirEmOrdem('');
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (componenteExiste)
        definirErroAoObterDados(true);
    });
  //}, [urlAtual,filtros])
  }, [filtros])

  useEffect(()=>{
    if (!anuncios)
      return;
    document.getElementById('resultadosPorPagina2').value = resultadosPorPagina;
    const arr = [];
    for (let i = 0; i < anuncios.length / resultadosPorPagina; i++)
      arr.push('');
    if (componenteExiste) {
      definirPaginas(arr);
      definirPaginaAtual(1);
    }
  }, [anuncios,resultadosPorPagina])

  useEffect(()=>{
    if (!anuncios)
      return;
    if (componenteExiste)
      definirAnunciosPorPagina(anuncios.slice((paginaAtual-1)*resultadosPorPagina,paginaAtual*resultadosPorPagina));
  }, [paginas,paginaAtual])

  useEffect(()=>{
    if (!anuncios)
      return;
    let criterio = ordenarPor;
    //console.log(criterio);
    let ordem = 1;
    if (!criterio)
      criterio = 'dataDeCriacao';
    if(!emOrdem)
      ordem = -1;
    const a = [...anuncios.sort((a,b)=>{
      //console.log(a[criterio]);
      //console.log(b[criterio]);
      let x = a[criterio];
      let y = b[criterio];
      if (typeof a[criterio] == 'string') {
        x = x.toLowerCase();
        y = y.toLowerCase();
      }
      if (x < y) return -1*ordem;
      if (x > y) return 1*ordem;
      return 0;
    })];
    if (componenteExiste)
      definirAnuncios(a);
  }, [ordenarPor,emOrdem])

  function obterDiscord(idDoAnuncio) {
    const tokenDaSessao = contexto2.getCookie('tokenDaSessao');
    if (!tokenDaSessao || !contexto2.usuarioLogado) {
      alert('É preciso entrar com uma conta para conectar-se ao jogador.');
      return;
    }
    //const tokenDaSessao = contexto2.autenticarSessao();
    //tokenDaSessao.then(resp=>{
    //  //console.log('/resultadosDaPesquisa, token='+resp);
    //  //console.log(resp);
    //  if (!resp || !contexto2.usuarioLogado) {
    //    document.cookie = 'tokenDaSessao=;expires=0;samesite=lax;path=/';
    //    alert('É preciso entrar com uma conta para conectar-se ao jogador.');
    //  } else {
        const dados = {
          method: 'GET',
          headers: {'Authorization': tokenDaSessao},
        };
        fetch(SERVIDOR+`/anuncios/${idDoAnuncio}/discord`, dados)
        .then(resp=>resp.json())
        .then(resp=>{
          if (resp.erro)
            throw resp.erro;
          if (componenteExiste) {
            //definirErroAoObterDados(false);
            definirDiscord(resp.discord);
          }
        })
        .catch(erro=>{
          console.log(erro);
          //if (componenteExiste)
          //  definirErroAoObterDados(true);
          //if (erro.codigo == 401)
          //  alert('É preciso entrar com uma conta para conectar-se ao jogador.');
          //else
            alert('Erro ao conectar-se ao jogador. Verifique o console de seu navegador para mais detalhes.');
        });
    //  }
    //});
  }

  return (
    <div className='resultadosDaPesquisa flex flexColumn'>
      <div className='flex cabecalho fundoSemitransparente'>
        <div>
          {anuncios && (anuncios.length == 0 ?
            <h2>Nenhum anúncio encontrado.</h2>
          :
            <h2>{anuncios.length} anúncio{anuncios.length > 1 ? 's' : ''} encontrado{anuncios.length > 1 ? 's' : ''}.</h2>
          )}
          {anunciosPorPagina && paginas && paginas.length > 1 &&
            <p>
              {
                'Exibindo '
                +(anunciosPorPagina.length > 1 ? 'do '+((paginaAtual-1)*resultadosPorPagina + 1)+'º ao ' : '')
                +((paginaAtual-1)*resultadosPorPagina + anunciosPorPagina.length)+'º resultado:'
              }
            </p>
          }
        </div>
        {/*implementar nova paginação aki*/}
        <div className='flex flexColumn'>
          <div className='flex flexWrap opcoesDePagina'>
            <div className='flex'>
              <label htmlFor='resultadosPorPagina2'>Resultados por página</label>
              <input  id='resultadosPorPagina2' type='tel' maxLength='3' size='1' pattern='\d+' required
                defaultValue={resultadosPorPagina}
                onBlur={e=>{
                  let n = e.target.value;
                  if (n > 0 && componenteExiste)
                    definirResultadosPorPagina(n);
                  else
                    e.target.value = resultadosPorPagina;
                }}
                onKeyDown={e=>{
                  if (e.repeat)
                    return;
                  if (e.key == 'Enter') {
                    let n = e.target.value;
                    if (n > 0 && componenteExiste)
                      definirResultadosPorPagina(n);
                    else
                      e.target.value = resultadosPorPagina;
                  }
                }}
              />
            </div>

            <div className='flex flexWrap'>
              <label className={paginaAtual > 1 ? 'linkDePagina' : ''}
                onClick={paginaAtual > 1 ? ()=>{definirPaginaAtual(1)} : undefined}
              >
                «
              </label>
              <label className={paginaAtual > 1 ? 'linkDePagina' : ''}
                onClick={paginaAtual > 1 ? ()=>{definirPaginaAtual(paginaAtual-1)} : undefined}
              >
                ‹
              </label>
              {paginas.map((p,i)=>
                <label key={i} className={i+1 == paginaAtual ? 'paginaAtual' : 'linkDePagina'}
                  onClick={paginaAtual != i+1 ? ()=>definirPaginaAtual(i+1) : undefined}
                >
                  {i+1}
                </label>
              )}
              <label className={paginaAtual < paginas.length ? 'linkDePagina' : ''}
                onClick={paginaAtual < paginas.length ? ()=>{definirPaginaAtual(paginaAtual+1)} : undefined}
              >
                ›
              </label>
              <label className={paginaAtual < paginas.length ? 'linkDePagina' : ''}
                onClick={paginaAtual < paginas.length ? ()=>{definirPaginaAtual(paginas.length)} : undefined}
              >
                »
              </label>
            </div>
          </div>

          <div className='flex flexWrap opcoesDePagina'>
            <label>Ordenar por</label>
            <select value={ordenarPor} onChange={e=>definirOrdenarPor(e.target.value)}>
              <option value=''>Data de publicação</option>
              <option value='nomeDoJogo'>Nome do jogo</option>
              <option value='nomeNoJogo'>Nome do jogador</option>
              <option value='tempoDeJogoEmMeses'>Tempo de jogo</option>
              <option value='diasQueJoga'>Dia que joga</option>
              <option value='deHora'>Hora que começa</option>
              <option value='ateHora'>Hora que termina</option>
              <option value='usaChatDeVoz'>Chat de voz</option>
            </select>
            <select value={emOrdem} onChange={e=>definirEmOrdem(e.target.value)}>
              <option value=''>Decrescente</option>
              <option value='crescente'>Crescente</option>
            </select>
          </div>
        </div>
      </div>

    <div className='jogosPagina'>
      {!anuncios &&
        (!erroAoObterDados ?
          <img className='carregando' src={carregando}/>
        :
          <p>Erro ao obter dados dos anúncios do servidor.</p>
        )
      }
      {anunciosPorPagina &&
        anunciosPorPagina.map((anuncio,i)=>
          <CartaoDeAnuncio
            key={anuncio.idDoAnuncio}
            nomeDoJogo={anuncio.nomeDoJogo}
            anuncio={anuncio}
            funcConectar={()=>obterDiscord(anuncio.idDoAnuncio)}
            funcRecarregarAnuncios={()=>{
              if (componenteExiste)
                //definirAnuncioPraExcluir(anuncio.id);
                //definirIdDoAnuncioPraExcluir(anuncio.id);
                definirAnuncios(anuncios.filter(an=>an.idDoAnuncio != anuncio.idDoAnuncio));
            }}
            excluindo={botoesDeExcluirDesabilitados}
            definirExcluindo={definirBotoesDeExcluirDesabilitados}
          />
        )
      }
      {discord && <ModalConectar discord={discord} funcFechar={()=>definirDiscord('')}/>}
    </div>
    </div>
  )
}