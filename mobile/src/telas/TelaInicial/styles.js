import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 48,
    alignSelf: 'center'
  },
  lista: {
    width: '100%'
  },
  listaConteudo: {
    //paddingLeft: 32,
    //paddingRight: 64,
    paddingHorizontal: 32,
    marginBottom: 32
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