import { 
  CURATORS_DID_LOAD,
} from '../actions/curator';

const initialState = {
  allCurators: [],
  pastCurators: [],
  futureCurators: [],
  currentCurator: null
};

function formatCuratorData(initialCuratorsState=[], newCurators=[]) {
  let date = new Date(),
      month = date.getMonth(),
      year = date.getFullYear(),
      allCurators = initialCuratorsState.concat(newCurators),
      curatorSet = {
        allCurators: [],
        pastCurators: [],
        futureCurators: [],
        currentCurator: null
      };

  allCurators.sort((a, b) =>  {
    if(a.date.year === b.date.year) {
      if(a.date.month < b.date.month) {
        return -1;
      } else if(a.date.month > b.date.month) {
        return 1;
      }
    }
    if(a.date.year < b.date.year) {
      return -1;
    } else if(a.date.year > b.date.year) {
      return 1;
    }
    return 0;
  });

  debugger;

  //Now we need to set all curators
  //Current Curator
  //Past Currators
  //Future curators

  // curators.sortBy((a, b) => {
  //   if (a.year > b.year) {

  //   }
  // })

  // Find Current Curator
  return curatorSet;
}

export default function curators(state=initialState, action) {
  switch(action.type) {
    case CURATORS_DID_LOAD:
      return formatCuratorData(state.curators, action.curators);
    default:
      return state;
  }
}