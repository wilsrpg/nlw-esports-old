import { Alert, Button, Image, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import logo from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { useEffect, useRef, useState } from 'react';
import { ModalConectar } from '../../components/ModalConectar';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';

export function TelaDeCriacaoDeAnuncio() {
  const navegador = useNavigation();
  const [jogos, definirJogos] = useState();
  const [erroAoObterDados, definirErroAoObterDados] = useState(false);
  const [jogoId, definirJogoId] = useState();
  const [nome, definirNome] = useState('');
  const [discord, definirDiscord] = useState('');
  const [tempoDeJogo, definirTempoDeJogo] = useState(0);
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
  //const [qualHora, definirQualHora] = useState();
  //const [horaRelogio, definirHoraRelogio] = useState(new Date(2000,0,1));
  const [relogio, definirRelogio] = useState({exibindo: false, horario: new Date(2000,0,1), definirHorario: definirHoraDe});
  const [usaChatDeVoz, definirUsaChatDeVoz] = useState(false);

  useEffect(()=>{
    const naCasaDeWisney = fetch(`http://192.168.0.144:3333/jogos`);
    const naMinhaCasa = fetch(`http://192.168.1.16:3333/jogos`);
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(resp=>resp.json())
    .then(dados=>{
      definirErroAoObterDados(false);
      definirJogos(dados);
    })
    .catch(erro=>{
      definirErroAoObterDados(true);
      console.log(erro);
    })
  }, [])



  //function escolherHorario(horaString) {
  //  console.log("escolher, hora string="+horaString);
  //  const hora = horaRelogio;
  //  console.log("escolher, ints="+parseInt(horaString.slice(0,2))+","+parseInt(horaString.slice(3)));
  //  hora.setHours(parseInt(horaString.slice(0,2)), parseInt(horaString.slice(3)));
  //  console.log("escolher, hora="+hora);
  //  definirHoraRelogio(hora);
  //  if(horaString == horaDe)
  //    definirQualHora(definirHoraDe);
  //  if(horaString == horaAte)
  //    definirQualHora(definirHoraAte);
  //}

  function definirHorario(ev, data) {
    const horaString = data.getHours().toString().padStart(2,'0')+":"+data.getMinutes().toString().padStart(2,'0');
    console.log("definir="+horaString);
    //definirQualHora();
    //definirHoraDe(horaString);
    definirRelogio({...relogio, exibindo: false})
    relogio.definirHorario(horaString);
  }

  function escolherHorarioDe() {
    console.log("escolher, horaDe="+horaDe);
    let horaString = horaDe;
    if(horaString == '--:--')
      horaString = '00:00';
    console.log("escolher, ints="+parseInt(horaString.slice(0,2))+","+parseInt(horaString.slice(3)));
    const hora = new Date(2000,0,1);
    hora.setHours(parseInt(horaString.slice(0,2)), parseInt(horaString.slice(3)));
    console.log("escolher, hora="+hora);
    //definirHoraRelogio(hora);
    //definirQualHora(true);
    definirRelogio({exibindo: true, horario: hora, definirHorario: definirHoraDe})
  }
  function escolherHorarioAte() {
    console.log("escolher, horaAte="+horaAte);
    let horaString = horaAte;
    if(horaString == '--:--')
      horaString = '00:00';
    const hora = new Date(2000,0,1);
    console.log("escolher, ints="+parseInt(horaString.slice(0,2))+","+parseInt(horaString.slice(3)));
    hora.setHours(parseInt(horaString.slice(0,2)), parseInt(horaString.slice(3)));
    console.log("escolher, hora="+hora);
    //definirHoraRelogio(hora);
    //definirQualHora(true);
    definirRelogio({exibindo: true, horario: hora, definirHorario: definirHoraAte})
  }


  //function definirHorarioDe(ev, data) {
  //  const horaString = data.getHours().toString().padStart(2,'0')+":"+data.getMinutes().toString().padStart(2,'0');
  //  console.log("definir="+horaString);
  //  definirQualHora(false);
  //  definirHoraDe(horaString);
  //}

  //function escolherHorarioAte() {
  //  console.log("escolherAte, hora string="+horaAte);
  //  const hora = new Date(2000,0,1);
  //  console.log("escolher, ints="+parseInt(horaAte.slice(0,2))+","+parseInt(horaAte.slice(3)));
  //  hora.setHours(parseInt(horaAte.slice(0,2)), parseInt(horaAte.slice(3)));
  //  console.log("escolher, hora="+hora);
  //  definirHoraRelogio(hora);
  //  definirQualHora(true);
  //}

  //function definirHorarioAte(ev, data) {
  //  const horaString = data.getHours().toString().padStart(2,'0')+":"+data.getMinutes().toString().padStart(2,'0');
  //  console.log("definirAte="+horaString);
  //  definirQualHora(false);
  //  definirHoraAte(horaString);
  //}

  function publicarAnuncio() {
    if(jogoId == "nenhum"){
      document.getElementById("jogo").style.borderColor = "red";
      document.getElementById("jogo").focus();
      return;
    }
    if(!nome)
    if(!discord.match('.*[\\S][#][\\d]{4}'))
    if(tempoDeJogo < 0){
      document.getElementById("tempo de jogo").focus();
      return;
    }
    if(!dias.some((dia)=>dia.marcado)){
      document.getElementById("dias").style.borderColor = "red";
      return;
    }
    if(horaDe == '--:--' || horaAte == '--:--' || horaDe == horaAte)
      return;
    const diasNum = [];
    dias.map((dia,id)=>{
      if(dia.marcado)
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
    const naCasaDeWisney = fetch(`http://192.168.0.144:3333/jogos/${jogoId}/anuncios`, {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: novoAnuncio
    });
    const naMinhaCasa = fetch(`http://192.168.1.16:3333/jogos/${jogoId}/anuncios`, {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: novoAnuncio
    });
    Promise.any([naCasaDeWisney,naMinhaCasa])
    .then(Alert.alert("Anúncio publicado com sucesso!"))
    .catch((erro)=>{
      console.log(erro);
      Alert.alert("Erro ao publicar anúncio. Verifique o console de seu navegador para mais detalhes.");
    })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.cabecalho}>
          <TouchableOpacity onPress={navegador.goBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={24}
            />
          </TouchableOpacity>
          <Image
            style={styles.logo}
            source={logo}
          />
          <Entypo
            name='chevron-thin-right'
            color={THEME.COLORS.CAPTION_300}
            size={24}
          />
        </View>
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
              //itemStyle={styles.jogosItens}
            >
              <Picker.Item label={jogos ? "Selecione um jogo" : erroAoObterDados ? "Buscando jogos..." : "Erro ao obter dados dos jogos do servidor."} value="nenhum"/>
              {jogos && jogos.map((jogo,i)=><Picker.Item key={i} label={jogo.nome} value={jogo.id}/>)}
            </Picker>

            <Text style={styles.rotulo}>Nome ou apelido</Text>
            <TextInput style={styles.campo} onChangeText={definirNome}/>

            <Text style={styles.rotulo}>Discord</Text>
            <TextInput style={styles.campo} placeholder="Nome de Usuário#1234" onChangeText={definirDiscord}/>

            <Text style={styles.rotulo}>Joga há quantos anos?</Text>
            <TextInput style={styles.campo} onChangeText={definirTempoDeJogo} keyboardType='numeric'/>

            <View style={styles.horizontal}>
              <View style={{gap:8}}>
                <Text style={styles.rotulo}>Dias disponíveis</Text>
                <View style={styles.horizontal}>
                  {dias.map((dia,id)=>
                    //<View key={id} style={styles.dia}>
                      <TouchableOpacity
                        key={id}
                        style={[styles.dia, dia.marcado && styles.diaMarcado]}
                        //id={dia.dia}
                        //type="button"
                        //value={dia.abrev}
                        //title={dia.abrev}
                        //color={dia.marcado ? THEME.COLORS.PRIMARY : THEME.COLORS.CAPTION_400}
                        //style={styles.diaBotao}
                        onPress={()=>{
                          //document.getElementById("dias").style.borderColor = "gray";
                          definirDias([
                            ...dias.slice(0,id),
                            {...dia, marcado: !dia.marcado},
                            ...dias.slice(id+1)
                          ]);
                          //const a = dias.map((d,i)=>d.marcado && i);
                          //a[id] = !dia.marcado && id;
                          //console.log(a);
                        }}
                      >
                        <Text style={dia.marcado && styles.diaMarcado}>{dia.abrev}</Text>
                      </TouchableOpacity>
                    //</View>
                  )}
                </View>
              </View>

              <View style={{gap:8}}>
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
                      //onTouchStart={()=>escolherHorario(horaDe,definirHoraDe)}
                      //onPressIn={()=>escolherHorario(horaDe,definirHoraDe)}
                      //onFocus={()=>escolherHorario(horaDe,definirHoraDe)}
                      //onChangeText={definirHoraDe}
                    />
                  </TouchableOpacity>
                  <Text style={styles.rotulo}>Até</Text>
                  <TouchableOpacity onPress={escolherHorarioAte}>
                    <TextInput
                      editable={false}
                      value={horaAte}
                      style={styles.hora}
                      //onTouchStart={()=>escolherHorarioDe(horaAte,definirHoraAte)}
                      //onPressIn={()=>escolherHorarioDe(horaAte,definirHoraAte)}
                      //onFocus={()=>escolherHorarioDe(horaAte,definirHoraAte)}
                      //onChangeText={definirHoraAte}
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
              {/*<Switch
                value={usaChatDeVoz}
                trackColor={THEME.COLORS.PRIMARY}
                onValueChange={()=>definirUsaChatDeVoz(v=>!v)}
              />*/}
              <Text
                style={styles.rotulo}
                onPress={()=>definirUsaChatDeVoz(v=>!v)}
              >
                Costumo usar o chat de voz
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botao}
              onPress={publicarAnuncio}
            >
              <Text style={styles.botaoTitulo}>
                Publicar
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  )
}