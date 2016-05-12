import colors from './colors';

export default {
  container: {
    width: '60vw',
    margin: '0 auto 0 auto',
    textAlign: 'center',
  },
  fontStyle: {
    letterSpacing: '1px',
    fontSize: '2.8rem',
    lineHeight: '4.5rem',
    fontFamily: 'Helvetica Neue',
    marginBottom: 0,
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    color: colors.white
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
  colors
}
