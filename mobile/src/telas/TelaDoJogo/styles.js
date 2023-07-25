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
  imagemDoJogo: {
    width: 400,
    height: 200,
    marginTop: 28
  },
  lista: {
    //width: '100%',
    //flex: 1,
    alignSelf: 'flex-start',
    //alignItems: 'flex-start',
    //justifyContent: 'center'
    marginBottom: 48
  },
  listaConteudo: {
    columnGap: 16,
    paddingHorizontal: 32,
    marginRight: 0,
    marginBottom: 32,
    //flex: 1,
    alignItems: 'flex-start'
  },
  listaConteudoVazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoConteudoVazio: {
    color: THEME.COLORS.CAPTION_300,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
  }
})