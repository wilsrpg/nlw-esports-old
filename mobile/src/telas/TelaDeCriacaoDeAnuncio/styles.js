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
    justifyContent: 'space-between',
  },
  logo: {
    width: 72,
    height: 40,
  },
  scrollConteudo: {
    alignItems: 'center'
  },
  formulario: {
    width: '50%',
    backgroundColor: THEME.COLORS.SHAPE,
    padding: 20,
    borderRadius: 8,
    marginVertical: 24
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
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8
  },
  gap: {
    gap: 8
  },
  dia: {
    height: 32,
    width: 28,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    color: 'black',
    fontSize: THEME.FONT_SIZE.MD,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  diaMarcado: {
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoTitulo: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM
  }
})