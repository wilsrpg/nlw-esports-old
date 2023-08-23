import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CartaoDeAnuncio from '../componentes/CartaoDeAnuncio';
import carregando from '../imagens/loading.svg'
import ModalConectar from '../componentes/ModalConectar';
import FormularioDePesquisa from '../componentes/FormularioDePesquisa';
import { contexto } from '../App';
import ResultadosDaPesquisa from '../componentes/ResultadosDaPesquisa';

export default function Anuncios() {
  let componenteExiste = true;
  //const contexto2 = useContext(contexto);
  //let urlNaMinhaCasa = contexto2.hostCasa;
  //let urlNaCasaDeWisney = contexto2.hostWisney;
  //const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  //const {jogoNomeUrl} = useParams();
  //const params = useParams();
  const urlAtual = useLocation();
  const urlParams = new URLSearchParams(urlAtual.search);
  //const historico = useHistory();
  //const [jogos, definirJogos] = useState();
  //const [jogo, definirJogo] = useState();
  //const [anuncios, definirAnuncios] = useState();
  //const [discord, definirDiscord] = useState('');
  const [filtros, definirFiltros] = useState();
  //console.log(paginaAtual);
  //console.log(params);
  //console.log(contexto2);

  //useEffect(()=>{
  //  const urlParams = new URLSearchParams(paginaAtual.search);
  //  let jogoParam = urlParams.get('jogo');
  //  //console.log('jogoParam');
  //  //console.log(jogoParam);
  //  if (!jogoParam)
  //    jogoParam = 'nenhum';
  //  //document.getElementById('jogo').value = jogoParam;
  //  definirJogo(jogoParam);
  //  document.getElementById('nome').value = urlParams.get('nome');
  //  document.getElementById('discord').value = urlParams.get('discord');
  //  document.getElementById('tempoDeJogoAnos').value = urlParams.get('tempoDeJogoAnos');
  //  document.getElementById('tempoDeJogoMeses').value = urlParams.get('tempoDeJogoMeses');
  //  //document.getElementById('usaChatDeVoz').value = urlParams.get('usaChatDeVoz');

  //  let chat = urlParams.get('usaChatDeVoz');
  //  if (!chat || chat != 'sim' || chat != 'nao')
  //    chat = 'tantoFaz';
  //  document.getElementById('usaChatDeVoz').value = chat;
  //  //let parametros = paginaAtual.search.slice(1).split("&");
  //  //let ob = {};
  //  //parametros.forEach((parametro) => {
  //  //  let [k, v] = parametro?.split("=");
  //  //  ob[k] = v;
  //  //});

  //  return ()=>componenteExiste = false;
  //}, [])

  //useEffect(()=>{
  //  //if (!contexto2)
  //  //  return;
  //  //urlNaMinhaCasa = contexto2.hostCasa;
  //  //urlNaCasaDeWisney = contexto2.hostWisney;
  //  //console.log(urlNaMinhaCasa);
  //  let endereco;
  //  const abortista = new AbortController();
  //  //if (jogoNomeUrl)
  //  //  endereco = `/jogos/${jogoNomeUrl}`;
  //  //else
  //    endereco = `/jogos`;
  //  const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
  //  const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
  //  Promise.any([naCasaDeWisney,naMinhaCasa])
  //  .then(resp=>resp.json())
  //  .then(dados=>{
  //    abortista.abort();
  //    if (componenteExiste) {
  //      definirErroAoObterDados(false);
  //      //if (jogoNomeUrl)
  //      //  definirJogos([dados]);
  //      //else
  //        definirJogos(dados);
  //    }
  //  })
  //  .catch(erro=>{
  //    console.log(erro);
  //    if (''+erro == 'AggregateError: No Promise in Promise.any was resolved')
  //      console.log('Não foi possível se comunicar com o servidor.');
  //    if (componenteExiste)
  //      definirErroAoObterDados(true);
  //  });
  ////}, [jogoNomeUrl])
  //}, [])

  useEffect(()=>{
    const dados = {};
    dados.jogo = urlParams.get('jogo');
    dados.nome = urlParams.get('nome');
    dados.opcoesNome = urlParams.get('opcoesNome');
    //dados.discord = urlParams.get('discord');
    dados.opcoesTempo = urlParams.get('opcoesTempo');
    dados.tempoDeJogoAnos = urlParams.get('tempoDeJogoAnos');
    dados.tempoDeJogoMeses = urlParams.get('tempoDeJogoMeses');
    if (dados.opcoesTempo == 'entre') {
      dados.tempoDeJogoAnos2 = urlParams.get('tempoDeJogoAnos2');
      dados.tempoDeJogoMeses2 = urlParams.get('tempoDeJogoMeses2');
    }
    dados.quando = urlParams.get('quando');
    dados.de = urlParams.get('de');
    dados.ate = urlParams.get('ate');
    let l = 2;
    while (urlParams.get('quando'+l) || urlParams.get('de'+l) || urlParams.get('ate'+l)) {
      dados['quando'+l] = urlParams.get('quando'+l);
      dados['de'+l] = urlParams.get('de'+l);
      dados['ate'+l] = urlParams.get('ate'+l);
      l++;
    }
    l--;
    if (l > 1)
      dados.opcoesDisponibilidade = urlParams.get('opcoesDisponibilidade');
    dados.qtdeFiltrosDisponibilidade = 0;
    if (dados.quando || dados.de || dados.ate)
      dados.qtdeFiltrosDisponibilidade = l;
    dados.usaChatDeVoz = urlParams.get('usaChatDeVoz');
    dados.resultadosPorPagina = urlParams.get('resultadosPorPagina');
    dados.emOrdem = urlParams.get('emOrdem');
    dados.ordenarPor = urlParams.get('ordenarPor');
    //console.log(dados);
    if (componenteExiste)
      definirFiltros(dados);
  }, [urlAtual])

  //useEffect(()=>{
  //  if (!filtros)
  //    return;
  //  //urlNaMinhaCasa = contexto2.hostCasa;
  //  //urlNaCasaDeWisney = contexto2.hostWisney;
  //  let endereco;
  //  const abortista = new AbortController();
  //  //if (jogoNomeUrl)
  //  //  endereco = `/jogos/${jogoNomeUrl}/anuncios`;
  //  //else
  //    endereco = `/anuncios`;
  //  const dados = {
  //    method: "POST",
  //    headers: {"Content-Type": "application/json"},
  //    body: JSON.stringify(filtros),
  //    signal: abortista.signal
  //  };
  //  //console.log(filtros);
  //  //console.log(dados.body);
  //  const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, dados);
  //  const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, dados);
  //  Promise.any([naCasaDeWisney,naMinhaCasa])
  //  .then(resp=>resp.json())
  //  .then(dados=>{
  //    abortista.abort();
  //    if (componenteExiste) {
  //      definirErroAoObterDados(false);
  //      definirAnuncios(dados);
  //    }
  //  })
  //  .catch(erro=>{
  //    console.log(erro);
  //    if (''+erro == 'AggregateError: No Promise in Promise.any was resolved')
  //      console.log('Não foi possível se comunicar com o servidor.');
  //    if (componenteExiste)
  //      definirErroAoObterDados(true);
  //  });
  ////}, [jogoNomeUrl])
  //}, [filtros])

  //function obterDiscord(anuncioId) {
  //  const endereco = `/anuncios/${anuncioId}/discord`;
  //  const abortista = new AbortController();
  //  const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
  //  const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
  //  Promise.any([naCasaDeWisney,naMinhaCasa])
  //  .then(resp=>resp.json())
  //  .then(dados=>{
  //    abortista.abort();
  //    if (componenteExiste) {
  //      definirErroAoObterDados(false);
  //      definirDiscord(dados.discord);
  //    }
  //  })
  //  .catch(erro=>{
  //    console.log(erro);
  //    if (''+erro == 'AggregateError: No Promise in Promise.any was resolved')
  //      console.log('Não foi possível se comunicar com o servidor.');
  //    if (componenteExiste)
  //      definirErroAoObterDados(true);
  //  });
  //}

  return (
    <div className='conteudo'>
    {/*jogos &&*/ filtros && <FormularioDePesquisa /*jogos={jogos}*/ filtros={filtros}/>}
    {/*jogos && anuncios &&*/ filtros &&
      <ResultadosDaPesquisa filtros={filtros} /*anuncios={anuncios} obterDiscord={obterDiscord}*//>
      //(anuncios.length == 0 ?
      //  <p>Nenhum anúncio publicado.</p>
      //:
      //  <p>{anuncios.length} anúncio{anuncios.length > 1 ? 's' : ''}</p>
      //)
    }
    {/*<div className='jogosPagina'>
      {(!jogos || !anuncios) &&
        (!erroAoObterDados ?
          <img className='carregando' src={carregando}/>
        :
          <p>Erro ao obter dados dos anúncios do servidor.</p>
        )
      }*/}
      {/*jogos && anuncios &&
        anuncios.map((anuncio,i)=>
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
      }*/}
      {/*{discord && <ModalConectar discord={discord} funcFechar={()=>definirDiscord('')}/>}*/}
    {/*</div>*/}
    </div>
  )
}