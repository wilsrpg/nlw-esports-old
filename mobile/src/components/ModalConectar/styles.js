import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.OVERLAY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  conteudo: {
    width: 311,
    borderRadius: 8,
    backgroundColor: THEME.COLORS.SHAPE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoFechar: {
    margin: 16,
    alignSelf: 'flex-end',
  },
  texto: {
    color: THEME.COLORS.CAPTION_300,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    marginTop: 24,
    marginBottom: 8,
  },
  botaodiscord: {
    width: 231,
    height: 48,
    marginBottom: 32,
    borderRadius: 4,
    backgroundColor: THEME.COLORS.BACKGROUND_900,
    alignItems: 'center',
    justifyContent: 'center'
  },
  discord: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD
  }
});