import { Alert, ScrollView, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import { styles } from './styles';
import { THEME } from '../../tema';
import { ImagemDeFundo } from '../../componentes/ImagemDeFundo';
import { Cabecalho } from '../../componentes/Cabecalho';
//import { SERVIDOR } from '../../../../enderecoDoServidor';
import { SERVIDOR0 as SERVIDOR } from '@env';

export function TelaDeCriacaoDeAnuncio() {
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [jogos, definirJogos] = useState();
  const [jogoId, definirJogoId] = useState('');
  const [nome, definirNome] = useState('');
  const [discord, definirDiscord] = useState('');
  const [tempoDeJogo, definirTempoDeJogo] = useState('');
  const [dias, definirDias] = useState([
    {abrev:'D', dia:'domingo', marcado:false},
    {abrev:'S', dia:'segunda', marcado:false},
    {abrev:'T', dia:'terça', marcado:false},
    {abrev:'Q', dia:'quarta', marcado:false},
    {abrev:'Q', dia:'quinta', marcado:false},
    {abrev:'S', dia:'sexta', marcado:false},
    {abrev:'S', dia:'sábado', marcado:false},
  ]);
  const [horaDe, definirHoraDe] = useState('--:--');
  const [horaAte, definirHoraAte] = useState('--:--');
  const [relogio, definirRelogio] = useState({exibindo: false, horario: new Date(2000,0,1), definirHorario: definirHoraDe});
  const [usaChatDeVoz, definirUsaChatDeVoz] = useState(false);
  const [publicando, definirPublicando] = useState(false);

  useEffect(()=>{
    fetch(SERVIDOR+`/jogos`)
    .then(resp=>resp.json())
    .then(dados=>{
      definirErroAoObterDados(false);
      definirJogos(dados);
    })
    .catch(erro=>{
      console.log(erro);
      definirErroAoObterDados(true);
    });
  }, [])

  function removerExcessoDeEspacos(texto,funcDefinir) {
    while(texto.startsWith(' '))
      texto=texto.slice(1);
    while(texto.endsWith(' '))
      texto=texto.slice(0,texto.length-1);
    while(texto.includes('  '))
      texto=texto.replace('  ',' ');
    funcDefinir(texto);
  }

  function validarTempoDeJogo(texto) {
    let t = texto.match('\\d*\\d');
    let n = (t == null ? '' : parseInt(t[0]).toString());
    definirTempoDeJogo(n);
  }

  function escolherHorarioDe() {
    let horaString = horaDe;
    if (horaString == '--:--')
      horaString = '00:00';
    const hora = new Date(2000,0,1);
    hora.setHours(parseInt(horaString.slice(0,2)), parseInt(horaString.slice(3)));
    definirRelogio({exibindo: true, horario: hora, definirHorario: definirHoraDe})
  }
  function escolherHorarioAte() {
    let horaString = horaAte;
    if (horaString == '--:--')
      horaString = '00:00';
    const hora = new Date(2000,0,1);
    hora.setHours(parseInt(horaString.slice(0,2)), parseInt(horaString.slice(3)));
    definirRelogio({exibindo: true, horario: hora, definirHorario: definirHoraAte})
  }

  function definirHorario(ev, data) {
    const horaString = data.getHours().toString().padStart(2,'0')+":"+data.getMinutes().toString().padStart(2,'0');
    definirRelogio({...relogio, exibindo: false})
    relogio.definirHorario(horaString);
  }

  function publicarAnuncio() {
    if (publicando)
      return;
    if (erroAoObterDados) {
      Alert.alert("Erro ao obter dados dos jogos do servidor.");
      return;
    } else if (!jogos) {
      Alert.alert("Aguarde o retorno dos dados dos jogos do servidor.");
      return;
    }
    if (!jogoId) {
      Alert.alert("Escolha um jogo.");
      return;
    }
    if (!nome) {
      Alert.alert("Digite seu nome.");
      return;
    }
    //if (!discord.match('.*\\S#\\d{4}$')) {
    //  Alert.alert("Digite um discord válido.");
    //  return;
    //}
    if (!discord) {
      Alert.alert("Digite seu discord.");
      return;
    }
    if (!tempoDeJogo) {
      Alert.alert("Digite seu tempo de jogo.");
      return;
    }
    if (!dias.some(dia=>dia.marcado)) {
      Alert.alert("Selecione pelo menos um dia.");
      return;
    }
    if (horaDe == '--:--' || horaAte == '--:--') {
      Alert.alert("Digite os horários em que está disponível.");
      return;
    }
    if (horaDe == horaAte) {
      Alert.alert("O horário de início não pode ser igual ao horário de término.");
      return;
    }

    const diasNum = [];
    dias.map((dia,id)=>{
      if (dia.marcado)
        diasNum.push(id);
    });
    const novoAnuncio = JSON.stringify({
      jogoId: jogoId,
      nomeDoUsuario: nome,
      tempoDeJogoEmAnos: Number(tempoDeJogo),
      discord: discord,
      diasQueJoga: diasNum.join(),
      deHora: horaDe,
      ateHora: horaAte,
      usaChatDeVoz: usaChatDeVoz,
    });
    definirPublicando(true);
    tentarPublicar(jogoId, novoAnuncio);
  }

  function tentarPublicar(jogoId, anuncio) {
    const dados = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: anuncio,
    };
    fetch(SERVIDOR+`/jogos/${jogoId}/anuncios`, dados)
    .then(()=>{
      Alert.alert("Anúncio publicado com sucesso!");
    })
    .catch(erro=>{
      console.log(erro);
      Alert.alert("Erro ao publicar anúncio:\n"+erro);
    })
    .finally(()=>definirPublicando(false));
  }

  return (
    <ImagemDeFundo>
      <SafeAreaView style={styles.container}>
        <Cabecalho/>
        <ScrollView contentContainerStyle={styles.scrollConteudo}>
          <Text style={styles.titulo}>Publique seu anúncio</Text>
          <View style={styles.formulario}>

            <Text style={styles.rotulo}>Jogo</Text>
            <Picker
              style={[styles.campo, !jogos && styles.desabilitado]}
              enabled={jogos != undefined}
              dropdownIconColor={jogos ? "white" : THEME.COLORS.CAPTION_300}
              selectedValue={jogoId}
              onValueChange={(id)=>definirJogoId(id)}
            >
              <Picker.Item label={jogos ? "Selecione um jogo" : !erroAoObterDados ? "Buscando jogos..." : "Erro ao obter dados dos jogos do servidor."} value=""/>
              {jogos && jogos.map((jogo,i)=><Picker.Item key={i} label={jogo.nome} value={jogo.id}/>)}
            </Picker>

            <Text style={styles.rotulo}>Nome ou apelido</Text>
            <TextInput
              style={styles.campo}
              value={nome}
              onChangeText={definirNome}
              onBlur={()=>removerExcessoDeEspacos(nome,definirNome)}
            />

            <Text style={styles.rotulo}>Discord</Text>
            <TextInput
              style={styles.campo}
              //placeholder="Nome de Usuário#1234"
              value={discord}
              onChangeText={definirDiscord}
              onBlur={()=>removerExcessoDeEspacos(discord,definirDiscord)}
            />

            <Text style={styles.rotulo}>Joga há quantos anos?</Text>
            <TextInput
              style={styles.campo}
              keyboardType='numeric'
              maxLength={2}
              value={tempoDeJogo}
              onChangeText={(t)=>validarTempoDeJogo(t)}
            />

            <View style={styles.horizontal}>
              <View style={styles.gap}>
                <Text style={styles.rotulo}>Dias disponíveis</Text>
                <View style={styles.horizontal}>
                  {dias.map((dia,id)=>
                    <TouchableOpacity
                      key={id}
                      style={[styles.dia, dia.marcado && styles.diaMarcado]}
                      onPress={()=>{
                        definirDias([
                          ...dias.slice(0,id),
                          {...dia, marcado: !dia.marcado},
                          ...dias.slice(id+1)
                        ]);
                      }}
                    >
                      <Text style={dia.marcado && styles.diaMarcado}>{dia.abrev}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.gap}>
                <Text style={styles.rotulo}>Horário disponível</Text>
                {relogio.exibindo &&
                  <DateTimePicker
                    value={relogio.horario}
                    mode='time'
                    display='spinner'
                    is24Hour={true}
                    onChange={definirHorario}
                  />
                }
                <View style={styles.horizontal}>
                  <Text style={styles.rotulo}>De</Text>
                  <TouchableOpacity onPress={escolherHorarioDe}>
                    <TextInput
                      editable={false}
                      value={horaDe}
                      style={styles.hora}
                    />
                  </TouchableOpacity>
                  <Text style={styles.rotulo}>Até</Text>
                  <TouchableOpacity onPress={escolherHorarioAte}>
                    <TextInput
                      editable={false}
                      value={horaAte}
                      style={styles.hora}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.horizontal}>
              <Checkbox
                style={styles.chatDeVoz}
                value={usaChatDeVoz}
                color={THEME.COLORS.PRIMARY}
                onValueChange={()=>definirUsaChatDeVoz(v=>!v)}
              />
              <Text
                style={styles.rotulo}
                onPress={()=>definirUsaChatDeVoz(v=>!v)}
              >
                Costumo usar o chat de voz
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botao}
              disabled={publicando}
              onPress={publicarAnuncio}
            >
              <Text style={styles.botaoTitulo}>
                {!publicando ? "Publicar" : <ActivityIndicator/>}
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </ImagemDeFundo>
  )
}