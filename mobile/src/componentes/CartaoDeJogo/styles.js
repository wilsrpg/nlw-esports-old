import { StyleSheet } from 'react-native';
import { THEME } from '../../tema';

export const styles = StyleSheet.create({
    container: {
      marginRight: 24,
    },
    cartao: {
      width: 240,
      height: 320,
      justifyContent: 'flex-end',
      borderRadius: 8,
      overflow: 'hidden'
    },
    rodape: {
      width: '100%',
      height: 102,
      padding: 16,
      justifyContent: 'flex-end'
    },
    nome: {
      color: THEME.COLORS.TEXT,
      fontFamily: THEME.FONT_FAMILY.BOLD,
      fontSize: THEME.FONT_SIZE.MD
    },
    anuncios: {
      color: THEME.COLORS.CAPTION_300,
      fontFamily: THEME.FONT_FAMILY.REGULAR,
      fontSize: THEME.FONT_SIZE.MD
    }
  });