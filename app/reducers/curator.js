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
      month = date.getMonth().toString(),
      year = date.getFullYear().toString(),
      allCurators = initialCuratorsState.concat(newCurators),
      curatorSet = {
        allCurators: [],
        pastCurators: [],
        futureCurators: [],
        currentCurator: null
      },
      isCurrentCurator = function(curator) {
        if(curator.date.year === year) {
          return curator.date.month === month;
        }
      },
      indexOfCurrentCurator= function(currentCurator) {
        return allCurators.indexOf(currentCurator);
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

  let currentCurator = allCurators.filter(isCurrentCurator);
  let index = indexOfCurrentCurator(currentCurator[0]);

  curatorSet.allCurators = allCurators;
  curatorSet.pastCurators = allCurators.slice(0, index);
  curatorSet.futureCurators = allCurators.slice(index+1);
  curatorSet.currentCurator = currentCurator;

  // Return sorted curator object
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