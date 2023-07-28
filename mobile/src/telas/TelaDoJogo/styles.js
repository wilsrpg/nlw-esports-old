import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
  },
  cabecalho: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 32,
    marginVertical: 16,
    justifyContent: 'space-between'
  },
  logo: {
    width: 72,
    height: 40
  },
  scrollConteudo: {
    alignItems: 'center'
  },
  imagemDoJogo: {
    width: 400,
    height: 200,
    marginTop: 28
  },
  lista: {
    alignSelf: 'flex-start',
    marginBottom: 48
  },
  listaConteudo: {
    columnGap: 16,
    paddingHorizontal: 32,
    marginRight: 0,
    marginBottom: 32,
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
    fontSize: THEME.FONT_SIZE.SM
  }
})