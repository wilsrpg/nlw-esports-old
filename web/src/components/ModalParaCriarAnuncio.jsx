import React, { useEffect, useState } from 'react'

export default function ModalParaCriarAnuncio(props) {
  const [jogos, definirJogos] = useState([]);
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

  useEffect(()=>{
    fetch("http://localhost:3333/jogos")
    .then(resp=>resp.json())
    .then(dados=>definirJogos(dados))
    .catch(erro=>console.log(erro));
  }, [])

  async function publicarAnuncio(e) {
    e.preventDefault();
    if(document.getElementById("jogo").value == "nenhum"){
      document.getElementById("jogo").focus();
      return;
    }
    if(!dias.some((dia)=>dia.marcado)){
      document.getElementById("domingo").focus();
      return;
    }
    const dados = Object.fromEntries(new FormData(e.target));
    //console.log(dados);
    const diasNum = [];
    dias.map((dia,id)=>{
      if(dia.marcado)
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

    try {
      await fetch(`http://localhost:3333/jogos/${dados.jogoId}/anuncios`, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: novoAnuncio
      });
      alert("Anúncio publicado com sucesso!");
      //.then(resp=>resp.json())
      //.then(dados=>definirJogos(dados))
    }
    catch(erro){
      console.log(erro);
      alert("Erro ao publicar anúncio. Verifique o console de seu navegador para mais detalhes.");
    }
  }

  return (
    <div className="modalAnuncioFora" onClick={props.fechar}>
      <div className="modalAnuncio" onClick={(e)=>e.stopPropagation()}>
        <h2>Publique seu anúncio</h2>
        <form className='flexColumn' onSubmit={publicarAnuncio}>
          <label>Jogo</label>
          <select id="jogo" name="jogoId">
            <option value="nenhum">Selecione um jogo</option>
            {jogos.map((jogo,id)=>{
              return <option key={id} value={jogo.id}>{jogo.nome}</option>
            })}
          </select>
          <label htmlFor="nome">Nome ou apelido</label>
          <input id="nome" name="nome" required />
          <div className='flex'>
            <div className='flexColumn'>
              <label htmlFor="discord">Discord</label>
              <input id="discord" name="discord" placeholder='Usuário#0000' pattern='.+[#][\d]{4}' />
            </div>
            <div className='flexColumn'>
              <label htmlFor="tempo de jogo">Joga há quantos anos?</label>
              <input id="tempo de jogo" name="tempoDeJogo" type="number" required />
            </div>
          </div>
          <div className='flex'>
            <div>
              <label>Quando</label>
              <div className='flex'>
                {dias.map((dia,id)=>
                  <input
                    key={id}
                    id={dia.dia}
                    type="button"
                    value={dia.abrev}
                    title={dia.dia}
                    className={dia.marcado ? 'roxinho' : ''}
                    onClick={()=>{
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
            <div>
              <label>Horário</label>
              <div className='flex'>
                <label htmlFor='de'>De</label>
                <input id="de" name="horaDe" type="time" required />
                <label htmlFor='até'>Até</label>
                <input id="até" name="horaAte" type="time" required />
              </div>
            </div>
          </div>
          <div>
            <input id="voz" name="usaChatDeVoz" type="checkbox" onChange={(e)=>definirUsaChatDeVoz(e.target.checked)} />
            <label htmlFor="voz">Costumo usar o chat de voz</label>
          </div>
          <div className='botoes'>
            <button onClick={props.fechar}>Cancelar</button>
            <input type="submit" value="Publicar" />
          </div>
        </form>
      </div>
    </div>
  )
}