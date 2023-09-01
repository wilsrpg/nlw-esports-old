import React, { useContext, useEffect, useState } from 'react'
import carregando from '../imagens/loading.svg'
import { SERVIDOR } from '../../../enderecoDoServidor';
import { useHistory } from 'react-router-dom';
import { contexto } from '../App';

export default function NovoAnuncio() {
  let componenteExiste = true;
  const contexto2 = useContext(contexto);
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [jogos, definirJogos] = useState();
  const [dias, definirDias] = useState([
    {abrev:'D', nome:'domingo', marcado:false},
    {abrev:'S', nome:'segunda', marcado:false},
    {abrev:'T', nome:'terça', marcado:false},
    {abrev:'Q', nome:'quarta', marcado:false},
    {abrev:'Q', nome:'quinta', marcado:false},
    {abrev:'S', nome:'sexta', marcado:false},
    {abrev:'S', nome:'sábado', marcado:false},
  ]);
  const [usaChatDeVoz, definirUsaChatDeVoz] = useState(false);
  const [publicando, definirPublicando] = useState(false);
  const historico = useHistory();
  const [diasDisponiveis, definirDiasDisponiveis] = useState([[false,false,false,false,false,false,false]]);

  useEffect(()=>{
    if (!contexto2.usuarioLogado)
      historico.push('/entrar');
    else
      fetch(SERVIDOR+`/jogos`)
      .then(resp=>resp.json())
      .then(dados=>{
        if (componenteExiste) {
          definirErroAoObterDados(false);
          definirJogos(dados);
        }
      })
      .catch(erro=>{
        console.log(erro);
        if (componenteExiste)
          definirErroAoObterDados(true);
      });
    
    return ()=>componenteExiste = false;
  }, [])

  async function publicarAnuncio(e) {
    if (publicando)
      return;
    e.preventDefault();
    if (document.getElementById("jogo").value == "nenhum") {
      //document.getElementById("jogo").style.backgroundColor = "red";
      document.getElementById("jogo").style.animation = "chamarAtencao 500ms";
      document.getElementById("jogo").focus();
      setTimeout(() => {
        document.getElementById("jogo").style.animation = "";
      }, 500);
      return;
    }
    if (!dias.some(dia=>dia.marcado)) {
      document.getElementById("dias").style.animation = "chamarAtencao 1000ms";
      //dias.map(dia=>document.getElementById(dia.dia).style.animation = "chamarAtencaoDias 0.5s")
      setTimeout(() => {
        document.getElementById("dias").style.animation = "";
        //dias.map(dia=>document.getElementById(dia.dia).style.animation = "")
      }, 1000);
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
      idDoUsuario: contexto2.usuarioLogado.id,
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
    const dados = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: anuncio,
    };
    fetch(SERVIDOR+`/jogos/${jogoId}/anuncios`, dados)
    .then(resp=>{
      if (resp.ok) {
        alert("Anúncio publicado com sucesso!");
      } else
        alert("Erro ao publicar anúncio. Verifique o console de seu navegador para mais detalhes.");
    })
    .catch(erro=>{
      console.log(erro);
      alert("Erro ao publicar anúncio. Verifique o console de seu navegador para mais detalhes.");
    })
    .finally(()=>{
      if (componenteExiste)
        definirPublicando(false);
    });
  }

  return (
    <div className='conteudo'>
      <h2>Publique seu anúncio</h2>
      <form className='flex flexColumn fundoSemitransparente' onSubmit={publicarAnuncio}>

        <label>Jogo</label>
        <select disabled={!jogos} id="jogo" name="jogoId"
          onFocus={e=>e.target.style.backgroundColor=''}
        >
          <option value="nenhum">
            {!jogos ?
              (!erroAoObterDados ? "Buscando jogos..." : "Erro ao obter dados dos jogos do servidor.")
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
            {/*<input id="discord" name="discord" placeholder='Nome de Usuário#0000' pattern='.*[\S][#][\d]{4}' required/>*/}
            <input id="discord" name="discord" required/>
          </div>

          <div className='flex flexColumn'>
            {/*<label htmlFor="tempo de jogo">Joga há quantos anos?</label>*/}
            {/*<input id="tempo de jogo" name="tempoDeJogo" type="tel" maxLength="2" pattern='\d*' required/>*/}
            <label>Joga há quanto tempo?</label>
            <div className='flex flexWrap'>
              <input id="tempoDeJogoAnos" className='tempoDeJogo' name="tempo de jogo" type="tel" maxLength="2" pattern='\d*'/>
              <label htmlFor="tempoDeJogoAnos">ano(s)</label>
              <input id="tempoDeJogoMeses" className='tempoDeJogo' name="tempoDeJogoMeses" type="tel" maxLength="2" pattern='\d*'/>
              <label htmlFor="tempoDeJogoMeses">mês(es)</label>
            </div>
          </div>

          </div>

          {/*<div className='flex flexColumn'>*/}
            <div className='flex'>
              <label>Dias disponíveis</label>
              <button className='carregando' type='button'
                onClick={()=>
                  definirDiasDisponiveis(diasDisponiveis.concat([[false,false,false,false,false,false,false]]))
                }
              >
                +
              </button>
            </div>
            {/*<div id='dias' className='flex dias'>
              {dias.map((dia,id)=>
                <input
                  key={id}
                  id={dia.nome}
                  type="button"
                  value={dia.abrev}
                  title={dia.nome}
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
          </div>*/}

          {/*<div className='flex flexColumn'>*/}
            {/*<label>Horário disponível</label>*/}
            {/*<div className='flex'>
              <label htmlFor='de'>De</label>
              <input id="de" name="horaDe" type="time" required/>
              <label htmlFor='até'>Até</label>
              <input id="até" name="horaAte" type="time" required/>
            </div>
          </div>*/}

          <div className='aoLado'>
            {diasDisponiveis.map((disp,i)=>{
              let id = i == 0 ? '' : i+1;
              return (
                //<div key={i} className='flex flexWrap'>
                <>
                <div id={'quando'+id} className='flex dias' key={i*2}>
                  {disp.map((dia,j)=>
                    <input
                      key={j}
                      //id={dia.nome}
                      type="button"
                      value={dias[j].abrev}
                      title={dias[j].nome}
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
                  <option value="todoDia">Todo dia</option>
                  <option value="semana">De segunda a sexta</option>
                  <option value="finsDeSemana">Fins de semana</option>
                  {dias.map((dia,j)=>
                    <option key={j} value={dia.nome}>{dia.nome[0].toUpperCase()+dia.nome.slice(1)}</option>
                  )}
                </select>*/}
                <div className='flex' key={i*2+1}>
                  <div className='flex'>
                    <label htmlFor={'de'+id}>De</label>
                    <input id={'de'+id} name={'de'+id} type="time"/>
                  </div>
                  <div className='flex'>
                    <label htmlFor={'ate'+id}>Até</label>
                    <input id={'ate'+id} name={'ate'+id} type="time"/>
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
                </>
                //</div>
              )
            })}
          </div>

        {/*</div>*/}

        <div className='chatDeVoz'>
          <input id="voz" name="usaChatDeVoz" type="checkbox" onChange={e=>definirUsaChatDeVoz(e.target.checked)}/>
          <label htmlFor="voz">Costumo usar o chat de voz</label>
        </div>

        <button type="submit" disabled={publicando} className='botaoPublicarAnuncio roxinho'>
          {!publicando ? "Publicar" : <img className='carregando' src={carregando}/>}
        </button>

      </form>

    </div>
  )
}