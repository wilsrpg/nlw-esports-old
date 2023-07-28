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
    margin: 8,
    padding: 8,
    alignSelf: 'flex-end'
  },
  texto: {
    color: THEME.COLORS.CAPTION_300,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    marginTop: 24,
    marginBottom: 8,
  },
  caixaDiscord: {
    maxWidth: '90%',
    height: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginBottom: 32,
    borderRadius: 4,
    backgroundColor: THEME.COLORS.BACKGROUND_900,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  discord: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD
  }
});