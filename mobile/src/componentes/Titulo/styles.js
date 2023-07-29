import { StyleSheet } from 'react-native';
import { THEME } from '../../tema';

export const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 32,
      alignItems: 'center'
    },
    titulo: {
      color: THEME.COLORS.TEXT,
      fontFamily: THEME.FONT_FAMILY.BLACK,
      fontSize: THEME.FONT_SIZE.LG
    },
    subtitulo: {
      color: THEME.COLORS.CAPTION_400,
      fontFamily: THEME.FONT_FAMILY.REGULAR,
      fontSize: THEME.FONT_SIZE.MD
    }
  });
  