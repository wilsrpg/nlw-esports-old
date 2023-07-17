import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  cabecalho: {
    width: "100%",
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 32,
    marginTop: 28,
    justifyContent: 'space-between'
  },
  logo: {
    width: 72,
    height: 40,
  },
  imagemDoJogo: {
    width: 311,
    height: 160,
    marginTop: 28
  },
  lista: {
    width: '100%'
  },
  listaConteudo: {
    paddingLeft: 32,
    paddingRight: 64,
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