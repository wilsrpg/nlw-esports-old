import React, { useContext, useEffect, useState } from 'react'
import { contexto } from '../App';
import CartaoDeAnuncio from './CartaoDeAnuncio';
import carregando from '../imagens/loading.svg'
import ModalConectar from './ModalConectar';
import { useLocation } from 'react-router-dom';

export default function ResultadosDaPesquisa({filtros}) {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const urlNaMinhaCasa = contexto2.hostCasa;
  const urlNaCasaDeWisney = contexto2.hostWisney;
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [paginas, definirPaginas] = useState(['']);
  const [paginaAtual, definirPaginaAtual] = useState(1);
  const [anuncios, definirAnuncios] = useState();
  const [resultadosPorPagina, definirResultadosPorPagina] = useState();
  const [ordenarPor, definirOrdenarPor] = useState('');
  const [emOrdem, definirEmOrdem] = useState('');
  const [anunciosPorPagina, definirAnunciosPorPagina] = useState();
  const [discord, definirDiscord] = useState('');
  const urlAtual = useLocation();

  useEffect(()=>{
    return ()=>componenteExiste = false;
  }, [])

  useEffect(()=>{
    //urlNaMinhaCasa = contexto2.hostCasa;
    //urlNaCasaDeWisney = contexto2.hostWisney;
    let endereco;
    const abortista = new AbortController();
    //if (jogoNomeUrl)
    //  endereco = `/jogos/${jogoNomeUrl}/anuncios`;
    //else
      endereco = `/anuncios`;
    const dados = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(filtros),
      signal: abortista.signal
    };
    //console.log(filtros);
    //console.log(dados.body);
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, dados);
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, dados);
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      if (componenteExiste) {
        definirErroAoObterDados(false);
        definirAnuncios(dados);
        
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
      if (''+erro == 'AggregateError: No Promise in Promise.any was resolved')
        console.log('Não foi possível se comunicar com o servidor.');
      if (componenteExiste)
        definirErroAoObterDados(true);
    });
  }, [urlAtual,filtros])

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
    let ordem = 1;
    if (!criterio)
      criterio = 'dataDeCriacao';
    if(!emOrdem)
      ordem = -1;
    const a = [...anuncios.sort((a,b)=>{
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

  function obterDiscord(anuncioId) {
    const endereco = `/anuncios/${anuncioId}/discord`;
    const abortista = new AbortController();
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      if (componenteExiste) {
        //definirErroAoObterDados(false);
        definirDiscord(dados.discord);
      }
    })
    .catch(erro=>{
      console.log(erro);
      const msgErro = ''+erro;
      if (msgErro == 'AggregateError: No Promise in Promise.any was resolved')
        console.log('Não foi possível se comunicar com o servidor.');
      //if (componenteExiste)
      //  definirErroAoObterDados(true);
      alert(msgErro == 'AggregateError: No Promise in Promise.any was resolved'
        ? 'Não foi possível se comunicar com o servidor.' : msgErro);
    });
  }

  return (
    <div className='resultadosDaPesquisa'>
      <div className='flex cabecalho'>
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
        <div className='flex flexColumn opcoesDePagina'>
          <div className='flex'>
            {/*<form className='flex' onSubmit={e=>{
              e.preventDefault();
              let n = document.getElementById('resultadosPorPagina').value;
              if (n > 0)
                definirResultadosPorPagina(n);
            }}>*/}
              <label htmlFor="resultadosPorPagina2">Resultados por página</label>
              <input  id="resultadosPorPagina2" //name="resultadosPorPagina2"
                type="tel" maxLength="3" size='1' pattern='\d+' required
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
            {/*</form>*/}

            <div className='flex paginas'>
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
          <div className='flex'>
            <label>Ordenar por</label>
            <select value={ordenarPor} onChange={e=>definirOrdenarPor(e.target.value)}>
              <option value="">Data de publicação</option>
              <option value="nomeDoJogo">Nome do jogo</option>
              <option value="nomeDoUsuario">Nome do jogador</option>
              <option value="tempoDeJogoEmAnos">Tempo de jogo</option>
              <option value="diasQueJoga">Dia que joga</option>
              <option value="deHora">Hora que começa</option>
              <option value="ateHora">Hora que termina</option>
              <option value="usaChatDeVoz">Chat de voz</option>
            </select>
            <select value={emOrdem} onChange={e=>definirEmOrdem(e.target.value)}>
              <option value="">Decrescente</option>
              <option value="crescente">Crescente</option>
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
            key={i}
            //jogo={(()=>{
            //  let jogoIndice;
            //  //console.log(anuncio);
            //  //console.log(anuncio.jogoId);
            //  //console.log('||');
            //  jogos.some((jogo,j)=>{
            //    //console.log(jogo.id);
            //    if (jogo.id == anuncio.jogoId)
            //      jogoIndice = j;
            //  })
            //  //console.log(jogos[jogoIndice]);
            //  return jogos[jogoIndice];
            //})()}
            nomeDoJogo={anuncio.nomeDoJogo}
            anuncio={anuncio}
            funcConectar={()=>obterDiscord(anuncio.id)}
          />
        )
      }
      {discord && <ModalConectar discord={discord} funcFechar={()=>definirDiscord('')}/>}
    </div>
    </div>
  )
}