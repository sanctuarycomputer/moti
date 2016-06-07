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

let container = new Atomic ({
  small: {
    width: '60%',
    margin: '0 auto',
    textAlign: 'center',
  },
});

export default {
  fontStyle: {
    letterSpacing: '2px',
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
      color: colors.white
    },
  },
  colors,
  fontSize,
  container
}