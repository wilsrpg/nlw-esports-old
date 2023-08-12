import React, { useEffect, useState } from 'react'
import carregando from '../imagens/loading.svg'
import iconeFechar from '../imagens/x.svg'

export default function ModalParaCriarAnuncio({funcRecarregarJogos,funcFechar}) {
  const urlNaMinhaCasa = import.meta.env.VITE_IP_NA_MINHA_CASA+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const urlNaCasaDeWisney = import.meta.env.VITE_IP_NA_CASA_DE_WISNEY+":"+import.meta.env.VITE_PORTA_DO_SERVIDOR;
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [jogos, definirJogos] = useState();
  const [dias, definirDias] = useState([
    {abrev:'D', dia:'domingo', marcado:false},
    {abrev:'S', dia:'segunda', marcado:false},
    {abrev:'T', dia:'terça', marcado:false},
    {abrev:'Q', dia:'quarta', marcado:false},
    {abrev:'Q', dia:'quinta', marcado:false},
    {abrev:'S', dia:'sexta', marcado:false},
    {abrev:'S', dia:'sábado', marcado:false},
  ]);
  const [usaChatDeVoz, definirUsaChatDeVoz] = useState(false);
  const [publicando, definirPublicando] = useState(false);

  useEffect(()=>{
    document.body.onkeydown = e=>{fechar(e)};
    const endereco = `/jogos`;
    const abortista = new AbortController();
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, {signal: abortista.signal});
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, {signal: abortista.signal});
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      abortista.abort();
      definirErroAoObterDados(false);
      definirJogos(dados);
    })
    .catch(erro=>{
      definirErroAoObterDados(true);
      console.log(erro);
    });

    //return abortista.abort();
  }, [])

  function fechar(e) {
    if (e.repeat)
      return;
    if (e.key == "Escape")
      funcFechar();
  }

  async function publicarAnuncio(e) {
    if (publicando)
      return;
    e.preventDefault();
    if (document.getElementById("jogo").value == "nenhum") {
      document.getElementById("jogo").style.backgroundColor = "red";
      document.getElementById("jogo").focus();
      return;
    }
    if (!dias.some(dia=>dia.marcado)) {
      document.getElementById("dias").style.borderColor = "red";
      return;
    }
    if (document.getElementById("tempo de jogo").value < 0) {
      document.getElementById("tempo de jogo").focus();
      return;
    }
    const dados = Object.fromEntries(new FormData(e.target));
    const diasNum = [];
    dias.map((dia,id)=>{
      if (dia.marcado)
        diasNum.push(id);
    });
    const novoAnuncio = JSON.stringify({
      jogoId: dados.jogoId,
      nomeDoUsuario: dados.nome,
      tempoDeJogoEmAnos: Number(dados.tempoDeJogo),
      discord: dados.discord,
      diasQueJoga: diasNum.join(),
      deHora: dados.horaDe,
      ateHora: dados.horaAte,
      usaChatDeVoz: usaChatDeVoz,
    });
    definirPublicando(true);
    tentarPublicar(dados.jogoId, novoAnuncio);
  }

  function tentarPublicar(jogoId, anuncio) {
    const endereco = `/jogos/${jogoId}/anuncios`;
    const abortista = new AbortController();
    const dados = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: anuncio,
      signal: abortista.signal
    };
    const naMinhaCasa = fetch(urlNaMinhaCasa+endereco, dados);
    const naCasaDeWisney = fetch(urlNaCasaDeWisney+endereco, dados);
    Promise.any([naMinhaCasa,naCasaDeWisney])
    .then(resp=>{
      abortista.abort();
      if (resp.ok) {
        funcRecarregarJogos();
        alert("Anúncio publicado com sucesso!");
      } else
        alert("Erro ao publicar anúncio. Verifique o console de seu navegador para mais detalhes.");
    })
    .catch(erro=>{
      console.log(erro);
      alert("Erro ao publicar anúncio. Verifique o console de seu navegador para mais detalhes.");
    })
    .finally(()=>definirPublicando(false));
  }

  return (
    <div className="modalAnuncioFora" onClick={funcFechar}>
      <div className="modalAnuncio" onClick={e=>e.stopPropagation()}>

        <img className='botaoCopiar botaoFechar' src={iconeFechar} onClick={funcFechar}/>
        <h2>Publique seu anúncio</h2>
        <form className='flex flexColumn' onSubmit={publicarAnuncio}>

          <label>Jogo</label>
          <select disabled={!jogos} id="jogo" name="jogoId" className='flex'
            onFocus={e=>e.target.style.backgroundColor='white'}
          >
            <option value="nenhum">
              {!jogos ?
                (!erroAoObterDados ? "Buscando jogos..." : "Erro ao obter dados dos anúncios do servidor.")
              :
                "Selecione um jogo"
              }
            </option>
            {jogos && jogos.map((jogo,id)=>{
              return <option key={id} value={jogo.id}>{jogo.nome}</option>
            })}
          </select>

          <label htmlFor="nome">Nome ou apelido</label>
          <input id="nome" name="nome" required/>

          <div className='aoLado'>

            <div className='flex flexColumn'>
              <label htmlFor="discord">Discord</label>
              <input id="discord" name="discord" placeholder='Nome de Usuário#0000' pattern='.*[\S][#][\d]{4}' required/>
            </div>

            <div className='flex flexColumn'>
              <label htmlFor="tempo de jogo">Joga há quantos anos?</label>
              <input id="tempo de jogo" name="tempoDeJogo" type="tel" maxLength="2" pattern='\d' required/>
            </div>

            <div className='flex flexColumn'>
              <label>Dias disponíveis</label>
              <div id='dias' className='flex'>
                {dias.map((dia,id)=>
                  <input
                    key={id}
                    id={dia.dia}
                    type="button"
                    value={dia.abrev}
                    title={dia.dia}
                    className={dia.marcado ? 'roxinho' : ''}
                    onClick={()=>{
                      document.getElementById("dias").style.borderColor='#71717a';
                      definirDias([
                        ...dias.slice(0,id),
                        {...dia, marcado: !dia.marcado},
                        ...dias.slice(id+1)
                      ]);
                    }}
                  />
                )}
              </div>
            </div>

            <div className='flex flexColumn'>
              <label>Horário disponível</label>
              <div className='flex'>
                <label htmlFor='de'>De</label>
                <input id="de" name="horaDe" type="time" required/>
                <label htmlFor='até'>Até</label>
                <input id="até" name="horaAte" type="time" required/>
              </div>
            </div>

          </div>

          <div className='chatDeVoz'>
            <input id="voz" name="usaChatDeVoz" type="checkbox" onChange={e=>definirUsaChatDeVoz(e.target.checked)}/>
            <label htmlFor="voz">Costumo usar o chat de voz</label>
          </div>

          <button type="submit" disabled={publicando} className='botaoPublicarAnuncio roxinho'>
            {!publicando ? "Publicar" : <img className='carregando' src={carregando}/>}
          </button>

        </form>

      </div>
    </div>
  )
}