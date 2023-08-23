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
  const [resultadosPorPagina, definirResultadosPorPagina] = useState(10);
  const [ordenarPor, definirOrdenarPor] = useState('');
  //const [emOrdem, definirEmOrdem] = useState('');
  //let resultadosPorPagina = 10;
  const [anunciosPorPagina, definirAnunciosPorPagina] = useState();
  const [discord, definirDiscord] = useState('');
  const urlAtual = useLocation();
  //console.log('carregou');
  //console.log(filtros);

  useEffect(()=>{
    if (filtros) {
      if (filtros.resultadosPorPagina)
        definirResultadosPorPagina(filtros.resultadosPorPagina);
      else
        definirResultadosPorPagina(10);
      if (filtros && filtros.ordenarPor)
        definirOrdenarPor(filtros.ordenarPor);
      if (filtros && filtros.emOrdem)
        document.getElementById('emOrdem').value = filtros.emOrdem;
    }
    //if (!filtros)
    //  return;
    //urlNaMinhaCasa = contexto2.hostCasa;
    //urlNaCasaDeWisney = contexto2.hostWisney;
    //console.log('ef filtros');
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
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (''+erro == 'AggregateError: No Promise in Promise.any was resolved')
        console.log('Não foi possível se comunicar com o servidor.');
      if (componenteExiste)
        definirErroAoObterDados(true);
    });
  }, [filtros,urlAtual])

  useEffect(()=>{
    if (!anuncios)
      return;
    //console.log('reorganizando anúncios');
    //console.log(anuncios);
    document.getElementById('resultadosPorPagina').value = resultadosPorPagina;
    const arr = [];
    for (let i = 0; i < anuncios.length / resultadosPorPagina; i++)
      arr.push('');
    definirPaginas(arr);
    definirPaginaAtual(1);
  }, [anuncios,resultadosPorPagina])

  useEffect(()=>{
    if (!anuncios)
      return;
    //console.log('mudando página');
    //console.log(anuncios);
    definirAnunciosPorPagina(anuncios.slice((paginaAtual-1)*resultadosPorPagina,paginaAtual*resultadosPorPagina));
  }, [anuncios,paginas,paginaAtual])

  useEffect(()=>{
    if (!anuncios)
      return;
    let criterio = ordenarPor;
    let ordem = 1;
    if (!criterio)
      criterio = 'dataDeCriacao';
    if(!document.getElementById('emOrdem').value)
      ordem = -1;
    //console.log(typeof anuncios[0][ordem]);
    //if (ordem == )
    //  ordem = '';
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
    //console.log(a[0]);
    //console.log(a[a.length-1]);
    //console.log('novo array:');
    //console.log(a);
    definirAnuncios(a);
  }, [ordenarPor])

  //useEffect(()=>{
  //  if (!anuncios)
  //    return;
    
  //  definirAnuncios(anuncios.reverse());
  //}, [anuncios,emOrdem])

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
      <div className='flex flexColumn opcoesDePagina'>
        <div className='flex'>
          {/*<form className='flex' onSubmit={e=>{
            e.preventDefault();
            let n = document.getElementById('resultadosPorPagina').value;
            if (n > 0)
              definirResultadosPorPagina(n);
          }}>*/}
            <label htmlFor="resultadosPorPagina">Resultados por página</label>
            <input  id="resultadosPorPagina" name="resultadosPorPagina" type="tel" maxLength="3" size='1' pattern='\d+' required //value={resultadosPorPagina}
              onBlur={e=>{
                let n = e.target.value;
                if (n > 0)
                  definirResultadosPorPagina(n);
                else
                  e.target.value = resultadosPorPagina;
              }}
              onKeyDown={e=>{
                if (e.repeat)
                  return;
                if (e.key == 'Enter') {
                  let n = e.target.value;
                  if (n > 0)
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
          <select id="ordenarPor" name="ordenarPor" onChange={e=>definirOrdenarPor(e.target.value)}>
            <option value="">Data de publicação</option>
            <option value="nomeDoJogo">Nome do jogo</option>
            <option value="nomeDoUsuario">Nome do jogador</option>
            <option value="tempoDeJogoEmAnos">Tempo de jogo</option>
            <option value="diasQueJoga">Dia que joga</option>
            <option value="deHora">Hora que começa</option>
            <option value="ateHora">Hora que termina</option>
            <option value="usaChatDeVoz">Chat de voz</option>
          </select>
          <select id="emOrdem" name="emOrdem"
            onChange={e=>{
              if (e.target.value)
                definirAnuncios([...anuncios.reverse()])
            }}
          >
            <option value="">Decrescente</option>
            <option value="crescente">Crescente</option>
          </select>
        </div>
      </div>

      <h2>Resultados</h2>
      {anuncios &&
        (anuncios.length == 0 ?
          <p>Nenhum anúncio encontrado.</p>
        :
          <p>{anuncios.length} anúncio{anuncios.length > 1 ? 's' : ''} encontrado{anuncios.length > 1 ? 's' : ''}.</p>
        )
      }
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