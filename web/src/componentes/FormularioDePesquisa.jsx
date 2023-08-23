import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { contexto } from '../App';
//import carregando from '../imagens/loading.svg'

export default function FormularioDePesquisa({filtros}) {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const urlNaMinhaCasa = contexto2.hostCasa;
  const urlNaCasaDeWisney = contexto2.hostWisney;
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [jogos, definirJogos] = useState();
  //const [jogoSelecionado, definirJogoSelecionado] = useState();
  const [opcoesTempo, definirOpcoesTempo] = useState(filtros.opcoesTempo || '');
  const [opcoesTempoEntre, definirOpcoesTempoEntre] = useState(false);
  const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
  const [diasDisponiveis, definirDiasDisponiveis] = useState(['']);
  const [aplicandoDisponilibidade, definirAplicandoDisponilibidade] = useState(false);
  //const [diasDisponiveis, definirDiasDisponiveis] = useState([{quando: '', de: '', ate: ''}]);
  //const [usaChatDeVoz, definirUsaChatDeVoz] = useState(false);
  //const [resultadosPorPagina, definirResultadosPorPagina] = useState(10);
  const historico = useHistory();
  //const [aguardando, definirAguardando] = useState(false);
  const urlAtual = useLocation();
  //const urlParams = new URLSearchParams(paginaAtual.search);
  //const params = useParams();
  //console.log(paginaAtual);
  //console.log(params);

  useEffect(()=>{
    //if (!contexto2)
    //  return;
    //urlNaMinhaCasa = contexto2.hostCasa;
    //urlNaCasaDeWisney = contexto2.hostWisney;
    //console.log(urlNaMinhaCasa);
    let endereco;
    const abortista = new AbortController();
    //if (jogoNomeUrl)
    //  endereco = `/jogos/${jogoNomeUrl}`;
    //else
      endereco = `/jogos`;
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      if (componenteExiste) {
        definirErroAoObterDados(false);
        //if (jogoNomeUrl)
        //  definirJogos([dados]);
        //else
          definirJogos(dados);
      }
    })
    .catch(erro=>{
      console.log(erro);
      if (''+erro == 'AggregateError: No Promise in Promise.any was resolved')
        console.log('Não foi possível se comunicar com o servidor.');
      if (componenteExiste)
        definirErroAoObterDados(true);
    });
  //}, [jogoNomeUrl])
  }, [])

  useEffect(()=>{
    document.getElementById('pesquisa').reset();
    //if (filtros.jogo && jogos)
    //  document.getElementById('jogo').value = filtros.jogo;
    if (filtros.opcoesNome)
      document.getElementById('opcoesNome').value = filtros.opcoesNome;
    if (filtros.nome)
      document.getElementById('nome').value = filtros.nome;
    //if (filtros.discord)
    //  document.getElementById('discord').value = filtros.discord;
    if (filtros.opcoesTempo && (filtros.tempoDeJogoAnos || filtros.tempoDeJogoMeses || filtros.tempoDeJogoAnos2 || filtros.tempoDeJogoMeses2)) {
      document.getElementById('opcoesTempo').value = filtros.opcoesTempo;
      if (filtros.opcoesTempo == 'entre' && componenteExiste)
        definirOpcoesTempoEntre(true);
    } else if (componenteExiste)
      definirOpcoesTempo('');
    if (filtros.tempoDeJogoAnos)
      document.getElementById('tempoDeJogoAnos').value = filtros.tempoDeJogoAnos;
    if (filtros.tempoDeJogoMeses)
      document.getElementById('tempoDeJogoMeses').value = filtros.tempoDeJogoMeses;
    if (filtros.quando)
      document.getElementById('quando').value = filtros.quando;
    if (filtros.de)
      document.getElementById('de').value = filtros.de;
    if (filtros.ate)
      document.getElementById('ate').value = filtros.ate;
    const arr = [''];
    for (let i = 1; i < filtros.qtdeFiltrosDisponibilidade; i++)
      arr.push('');
    if (componenteExiste) {
      //console.log('vai aplicar')
      definirDiasDisponiveis(arr);
      definirAplicandoDisponilibidade(true);
      //definirAguardando(false);
    }
    if (filtros.usaChatDeVoz)
      document.getElementById('usaChatDeVoz').value = filtros.usaChatDeVoz;
    //if (filtros.resultadosPorPagina)
    //  document.getElementById('resultadosPorPagina').value = filtros.resultadosPorPagina;
    //if (filtros.emOrdem)
    //  document.getElementById('emOrdem').value = filtros.emOrdem;
    //if (filtros.ordenarPor)
    //  document.getElementById('ordenarPor').value = filtros.ordenarPor;
  }, [filtros])

  useEffect(()=>{
    if (filtros.jogo && jogos)
      document.getElementById('jogo').value = filtros.jogo;
  }, [jogos,filtros])

  //useEffect(()=>{
  //  document.getElementById('pesquisa').reset();

  //  //let jogoParam = urlParams.get('jogo');
  //  //if (!jogoParam)
  //  //  jogoParam = 'qualquerUm';
  //  if (urlParams.get('jogo'))
  //    document.getElementById('jogo').value = urlParams.get('jogo');

  //  document.getElementById('nome').value = urlParams.get('nome');
  //  document.getElementById('discord').value = urlParams.get('discord');

  //  document.getElementById('tempoDeJogoAnos').value = urlParams.get('tempoDeJogoAnos');
  //  document.getElementById('tempoDeJogoMeses').value = urlParams.get('tempoDeJogoMeses');

  //  if (componenteExiste) {
  //    const arr = new Array;
  //    while (urlParams.get('quando'+arr.length))
  //      arr.push('');
  //    if (arr.length > 0) {
  //      definirDiasDisponiveis(arr);
  //      definirAplicandoDisponilibidade(true);
  //    } else {
  //      definirDiasDisponiveis(['']);
  //    }
  //  }

  //  //let chat = urlParams.get('usaChatDeVoz');
  //  //if (!chat || chat != 'sim' && chat != 'não')
  //  //  chat = 'tantoFaz';
  //  if (urlParams.get('usaChatDeVoz'))
  //    document.getElementById('usaChatDeVoz').value = urlParams.get('usaChatDeVoz');

  //  return ()=>componenteExiste = false;
  //}, [paginaAtual])

  useEffect(()=>{
    //console.log('opcoesTempoEntre')
    if (opcoesTempoEntre) {
      //console.log('entrou')
      if (filtros.tempoDeJogoAnos2)
        document.getElementById('tempoDeJogoAnos2').value = filtros.tempoDeJogoAnos2;
      if (filtros.tempoDeJogoMeses2)
        document.getElementById('tempoDeJogoMeses2').value = filtros.tempoDeJogoMeses2;
      if (componenteExiste)
        definirOpcoesTempoEntre(false);
    }
  }, [opcoesTempoEntre])

  useEffect(()=>{
    //console.log('aplicandoDisponilibidade')
    if (aplicandoDisponilibidade) {
      //console.log('aplicou')
      if (filtros.opcoesDisponibilidade)
        document.getElementById('opcoesDisponibilidade').value = filtros.opcoesDisponibilidade;
      for (let i = 2; i <= diasDisponiveis.length; i++) {
        document.getElementById('quando'+i).value = filtros['quando'+i];
        document.getElementById('de'+i).value = filtros['de'+i];
        document.getElementById('ate'+i).value = filtros['ate'+i];
      }
      //if (componenteExiste)
        definirAplicandoDisponilibidade(false);
    }
  }, [aplicandoDisponilibidade])

  function pesquisar(e) {
    e.preventDefault();
    if (erroAoObterDados)
      return;
    
    const dados = Object.fromEntries(new FormData(e.target));
    //console.log('dados ants d tratar:');
    //console.log(dados);
    //if (dados.jogo == 'qualquerUm')
    //  delete dados.jogo;
    if (!dados.jogo)
      delete dados.jogo;
    
    if (!dados.opcoesNome)
      delete dados.opcoesNome;
    if (!dados.nome)
      delete dados.nome;
    //if (!dados.discord)
    //  delete dados.discord;
    
    if (!dados.opcoesTempo)
      delete dados.opcoesTempo;
    if (!dados.tempoDeJogoAnos)
      delete dados.tempoDeJogoAnos;
    if (!dados.tempoDeJogoMeses)
      delete dados.tempoDeJogoMeses;
    if (!dados.tempoDeJogoAnos2)
      delete dados.tempoDeJogoAnos2;
    if (!dados.tempoDeJogoMeses2)
      delete dados.tempoDeJogoMeses2;
    
    let l = 2;
    while (dados['quando'+l]) {
      if (!dados['de'+l])
        delete dados['de'+l];
      if (!dados['ate'+l])
        delete dados['ate'+l];
      //console.log('deletou de/ate '+l);
      l++;
    }
    l--;
    //console.log('l='+l);
    for (let i = 0; i < l; i++) {
      let id = i == 0 ? '' : i+1;
      if (dados['quando'+id] == 'qualquerDia' && !dados['de'+id] && !dados['ate'+id]) {
        for (let j = i; j < l-1; j++) {
          let atual = j == 0 ? '' : j+1;
          let proximo = j+2;
          if (dados['quando'+proximo])
            dados['quando'+atual] = dados['quando'+proximo];
          if (dados['de'+proximo])
            dados['de'+atual] = dados['de'+proximo];
          if (dados['ate'+proximo])
            dados['ate'+atual] = dados['ate'+proximo];
        }
        if (l > 1) {
          delete dados['quando'+l];
          delete dados['de'+l];
          delete dados['ate'+l];
        }
        l--;
        i--;
      }
    }
    if (!dados.opcoesDisponibilidade)
      delete dados.opcoesDisponibilidade;
    if (dados.quando == 'qualquerDia' && !dados.de && !dados.ate){
      delete dados.quando;
    }
    if (!dados.de)
      delete dados.de;
    if (!dados.ate)
      delete dados.ate;

    if (!dados.usaChatDeVoz)
      delete dados.usaChatDeVoz;
    //if (!dados.resultadosPorPagina || dados.resultadosPorPagina == 10 || dados.resultadosPorPagina == 0)
    //  delete dados.resultadosPorPagina;
    //if (!dados.emOrdem)
    //  delete dados.emOrdem;
    //if (!dados.ordenarPor)
    //  delete dados.ordenarPor;
    if (document.getElementById('resultadosPorPagina').value != 10)
      dados.resultadosPorPagina = document.getElementById('resultadosPorPagina').value;
    if (document.getElementById('ordenarPor').value)
      dados.ordenarPor = document.getElementById('ordenarPor').value;
    if (document.getElementById('emOrdem').value)
      dados.emOrdem = document.getElementById('emOrdem').value;
    //console.log('dados enviados:');
    //console.log(dados);
    historico.push('/anuncios?'+new URLSearchParams(dados));
    //funcDefinirFiltros(dados);
    //if (componenteExiste)
    //  definirAguardando(false);
  }

  return (
    <div>
      <h2>Pesquise anúncios</h2>
      <form id='pesquisa' className='flex flexColumn' onSubmit={e=>pesquisar(e)}>

        <div className='jogosPagina formularioDePesquisa'>
          <div className='flex flexColumn'>
            <label>Jogo</label>
            <select disabled={!jogos} id="jogo" name="jogo"
              //value={jogoSelecionado}
              //onChange={e=>definirJogoSelecionado(e.target.value)}
            >
              <option value="">
                {!jogos ?
                  (!erroAoObterDados ? "Buscando jogos..." : "Erro ao obter dados dos jogos do servidor.")
                :
                  "Qualquer um"
                }
              </option>
              {/*<option value="">Qualquer um</option>*/}
              {jogos && jogos.map((jogo,i)=>{
                return <option key={i} value={jogo.nomeUrl}>{jogo.nome}</option>
              })}
            </select>
          </div>

          <div className='flex flexColumn'>
            <div className='flex'>
              <label htmlFor="nome">Nome no jogo</label>
              <select id="opcoesNome" name="opcoesNome">
                <option value="">contém</option>
                <option value="comecaCom">começa com</option>
                <option value="terminaCom">termina com</option>
                <option value="exatamente">exatamente</option>
                <option value="naoContem">não contém</option>
              </select>
            </div>
            <input id="nome" name="nome"/>
          </div>

          {/*<div className='flex flexColumn'>
            <label htmlFor="discord">Discord</label>
            <input id="discord" name="discord"
//onChange={e=>{if(e.target.value.match(document.getElementById('nome').value))definirOpcoesTempo('noMaximo');else definirOpcoesTempo('');}}
            />
          </div>*/}

          <div className='flex flexColumn'>
            <div className='flex'>
              <label>Joga há quanto tempo?</label>
              <select id="opcoesTempo" name="opcoesTempo" value={opcoesTempo} onChange={e=>definirOpcoesTempo(e.target.value)}>
                <option value="">no mínimo</option>
                <option value="noMaximo">no máximo</option>
                <option value="entre">entre</option>
              </select>
            </div>
            <div className='flex flexColumn'>
              <div className='flex'>
                <input id="tempoDeJogoAnos" className='tempoDeJogo' name="tempoDeJogoAnos" type="tel" maxLength="2" pattern='\d*'/>
                <label htmlFor="tempoDeJogoAnos">ano(s)</label>
                <input id="tempoDeJogoMeses" className='tempoDeJogo' name="tempoDeJogoMeses" type="tel" maxLength="2" pattern='\d*'/>
                <label htmlFor="tempoDeJogoMeses">mês(es)</label>
              </div>
              {opcoesTempo == 'entre' &&
                <div className='flex'>
                  <input id="tempoDeJogoAnos2" className='tempoDeJogo' name="tempoDeJogoAnos2" type="tel" maxLength="2" pattern='\d*'/>
                  <label htmlFor="tempoDeJogoAnos2">ano(s)</label>
                  <input id="tempoDeJogoMeses2" className='tempoDeJogo' name="tempoDeJogoMeses2" type="tel" maxLength="2" pattern='\d*'/>
                  <label htmlFor="tempoDeJogoMeses2">mês(es)</label>
                </div>
              }
            </div>
          </div>

          <div className='flex flexColumn'>
            <div className='flex'>
              <label>Disponibilidade</label>
              <button className='carregando' type='button' onClick={()=>definirDiasDisponiveis(diasDisponiveis.concat(''))}>+</button>
              {diasDisponiveis.length > 1 &&
                <select id="opcoesDisponibilidade" name="opcoesDisponibilidade">
                  <option value="">Em pelo menos um</option>
                  <option value="emTodos">Em todos</option>
                </select>
              }
            </div>
            {diasDisponiveis.map((d,i)=>{
              let id = i == 0 ? '' : i+1;
              return (
                <div key={i} className='aoLado'>
                  <select id={'quando'+id} name={'quando'+id}>
                    <option value="qualquerDia">Qualquer dia</option>
                    <option value="todoDia">Todo dia</option>
                    <option value="semana">De segunda a sexta</option>
                    <option value="finsDeSemana">Fins de semana</option>
                    {dias.map((dia,j)=>
                      <option key={j} value={dia}>{dia[0].toUpperCase()+dia.slice(1)}</option>
                    )}
                  </select>
                  <div className='flex'>
                    <label htmlFor={'de'+id}>De</label>
                    <input id={'de'+id} name={'de'+id} type="time"/>
                    <label htmlFor={'ate'+id}>Até</label>
                    <input id={'ate'+id} name={'ate'+id} type="time"/>
                    {diasDisponiveis.length > 1 &&
                      <button className='carregando' type='button'
                        onClick={()=>{
                          for(let j=i; j < diasDisponiveis.length-1; j++){
                            let atual = j == 0 ? '' : j+1;
                            let proximo = j+2;
                            document.getElementById('quando'+atual).value = document.getElementById('quando'+proximo).value;
                            document.getElementById('de'+atual).value = document.getElementById('de'+proximo).value;
                            document.getElementById('ate'+atual).value = document.getElementById('ate'+proximo).value;
                          }
                          definirDiasDisponiveis(diasDisponiveis.slice(1));
                        }}
                      >×</button>
                    }
                  </div>
                </div>
              )
            })}
          </div>

          <div className='flex flexColumn'>
            <label>Usa chat de voz</label>
            <select id="usaChatDeVoz" name="usaChatDeVoz">
              <option value="">Tanto faz</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </div>

          {/*<div className='flex flexColumn'>
            <label htmlFor="resultadosPorPagina">Resultados por página</label>
            <input id="resultadosPorPagina" name="resultadosPorPagina" type="tel" maxLength="3" pattern='\d*' defaultValue='10'/>
          </div>

          <div className='flex flexColumn'>
            <div className='flex'>
              <label>Ordenar por</label>
              <select id="ordenarPor" name="ordenarPor">
                <option value="">Data de publicação</option>
                <option value="jogo">Jogo</option>
                <option value="nomeDoUsuario">Nome do jogador</option>
                <option value="tempoDeJogo">Tempo de jogo</option>
                <option value="diaQueJoga">Dia que joga</option>
                <option value="horaQueJoga">Hora que joga</option>
                <option value="chatDeVoz">Chat de voz</option>
              </select>
            </div>
            <select id="emOrdem" name="emOrdem">
              <option value="">Em ordem decrescente</option>
              <option value="crescente">Em ordem crescente</option>
            </select>
          </div>*/}

        </div>

        <div className='flex botaoPublicarAnuncio'>
          <button type="reset" className='botaoPublicarAnuncio' onClick={()=>{
              definirOpcoesTempo('');
              definirDiasDisponiveis(['']);
            }}
          >
            Limpar
          </button>
          <button type="submit" className='botaoPublicarAnuncio' disabled={erroAoObterDados}
          //onClick={()=>definirAguardando(true)}
          >
            {/*{!aguardando ? 'Pesquisar' : <img className='carregando' src={carregando}/>}*/}
            Pesquisar
          </button>
        </div>

      </form>
    </div>
  )
}