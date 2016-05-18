import colors from './colors';
import Atomic from './Atomic';

let fontSize = new Atomic ({
  small: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  medium: {
    fontSize: '2rem',
  },
  large: {
    fontSize: '3rem',
  }
});

export default {
  container: {
    width: '60vw',
    margin: '0 auto',
    textAlign: 'center',
  },
  fontStyle: {
    letterSpacing: '1px',
    fontSize: '2.8rem',
    lineHeight: '4.5rem',
    margin: '0',
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'white',
    borderBottomWidth: '3px',
    borderBottomStyle: 'solid',
    borderColor: 'transparent',
    ':hover': {
      borderBottomWidth: '3px',
      borderBottomStyle: 'solid',
      borderColor: colors.white,
    },
  },
  colors,
  fontSize
}