import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    //marginVertical: 48
    //paddingTop: 48
  },
  scrollView: {
    width: '100%',
    //marginVertical: 48
  },
  scrollViewConteudo: {
    alignItems: 'center'
  },
  logo: {
    width: 214,
    height: 120,
    marginVertical: 48
  },
  lista: {
    width: '100%'
  },
  listaConteudo: {
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
  },
  botaoPublicarAnuncio: {
    backgroundColor: THEME.COLORS.PRIMARY,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 48
  },
  textoPublicarAnuncio: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.LG,
  }
})