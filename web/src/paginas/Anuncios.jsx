import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import FormularioDePesquisa from '../componentes/FormularioDePesquisa';
import ResultadosDaPesquisa from '../componentes/ResultadosDaPesquisa';

export default function Anuncios() {
  let componenteExiste = true;
  const urlAtual = useLocation();
  const urlParams = new URLSearchParams(urlAtual.search);
  const [filtros, definirFiltros] = useState();

  useEffect(()=>{
    return ()=>componenteExiste = false;
  }, [])

  useEffect(()=>{
    const dados = {};
    dados.jogo = urlParams.get('jogo');
    dados.nome = urlParams.get('nome');
    dados.opcoesNome = urlParams.get('opcoesNome');
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

  return (
    <div className='conteudo'>
      {filtros &&
        <>
        <FormularioDePesquisa filtros={filtros}/>
        <ResultadosDaPesquisa filtros={filtros}/>
        </>
      }
    </div>
  )
}