import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    //width: "100%",
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  cabecalho: {
    //width: "100%",
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 32,
    marginVertical: 16,
    justifyContent: 'space-between',
    //justifyContent: 'center'
  },
  logo: {
    width: 72,
    height: 40,
    //alignSelf: 'center'
  },
  scrollConteudo: {
    //width: "100%",
    //flex: 1,
    alignItems: 'center',
    //justifyContent: 'center'
  },
  formulario: {
    width: '50%',
    backgroundColor: THEME.COLORS.SHAPE,
    padding: 20,
    borderRadius: 8,
    marginVertical: 24,
    //gap: 8
  },
  titulo: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.BLACK,
    fontSize: THEME.FONT_SIZE.LG
  },
  rotulo: {
    color: THEME.COLORS.CAPTION_300,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD
  },
  campo: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    fontSize: THEME.FONT_SIZE.MD,
    marginBottom: 8
  },
  desabilitado: {
    backgroundColor: THEME.COLORS.CAPTION_300
  },
  horizontal: {
    alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8
  },
  dia: {
    height: 32,
    width: 28,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    color: 'black',
    //padding: 0,
    //margin: 0,
    fontSize: THEME.FONT_SIZE.MD,
    alignItems: 'center',
    //alignContent: 'center',
    //textAlignVertical: 'center',
    //textAlign: 'center',
    //verticalAlign: 'middle',
    //includeFontPadding: false,
    justifyContent: 'center',
    //fontSize: 4,
    borderRadius: 4,
    //backgroundColor: THEME.COLORS.CAPTION_400,
  },
  diaMarcado: {
    //height: 16,
    //fontSize: THEME.FONT_SIZE.SM,
    //includeFontPadding: false,
    backgroundColor: THEME.COLORS.PRIMARY,
    color: 'white'
  },
  hora: {
    width: 64,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    color: 'black',
    fontSize: THEME.FONT_SIZE.MD,
    height: 32,
    textAlign: 'center'
  },
  chatDeVoz: {
    width: 24,
    height: 24
  },
  botao: {
    width: '100%',
    height: 36,
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 8,
    marginVertical: 16,
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoTitulo: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM
  }
})