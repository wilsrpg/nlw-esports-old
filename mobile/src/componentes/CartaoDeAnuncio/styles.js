import { StyleSheet } from 'react-native';
import { THEME } from '../../tema';

export const styles = StyleSheet.create({
  container: {
    width: 220,
    backgroundColor: THEME.COLORS.SHAPE,
    padding: 20,
    borderRadius: 8
  },
  rotulo: {
    color: THEME.COLORS.CAPTION_300,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    marginBottom: 4
  },
  valor: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.SM,
    marginBottom: 8
  },
  verde: {
    color: THEME.COLORS.SUCCESS
  },
  vermelho: {
    color: THEME.COLORS.ALERT
  },
  botao: {
    width: '100%',
    height: 36,
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoTitulo: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM
  }
});