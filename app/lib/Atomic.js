const BoilerplateStyles = {
  defaults: [],
  small: {},
  medium: {},
  large: {},
  states: {
    active: {}
  }
}

export default class Atomic {
  constructor(styles=BoilerplateStyles, allBreakpoints=['small', 'medium', 'large']) {
    if (!styles.small) { throw new Error('Atomic requires a small breakpoint'); }
    styles.defaults = styles.defaults || [];
    styles.states = styles.states || {};
    this.styles = styles;
    this.allBreakpoints = allBreakpoints;
  }

  calculate(breakpoint, currentStates=[]) {
    let styles = this.styles.defaults.slice(0);
    let mediaStyles = this.allBreakpoints.slice(0, (this.allBreakpoints.indexOf(breakpoint)+1)).map(breakpoint => {
      return this.styles[breakpoint];
    });
    return styles.concat(mediaStyles).concat(currentStates.map(state => this.styles.states[state]));
  }

}