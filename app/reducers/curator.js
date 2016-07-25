import {
  FIREBASE_DID_UPDATE
} from '../actions/application';

const dummyCurator = { isDummy: true };

const initialState = {
  allCurators: [],
  pastCurators: [],
  futureCurators: [],
  currentCurator: dummyCurator
};

function formatCuratorData(initialCuratorsState=[], newCurators=[]) {
  let date = new Date(),
      month = date.getMonth().toString(),
      year = date.getFullYear().toString(),
      allCurators = initialCuratorsState.concat(newCurators);

  //Sort curators in ascending order
  allCurators.sort((a, b) =>  {
    if(a.date.year < b.date.year) { return -1; }
    if(a.date.year > b.date.year) { return 1; }

    // Same Year, Compare Months
    if(a.date.month < b.date.month) { return -1; }
    if(a.date.month > b.date.month) { return 1; }

    // If it gets to here, there are two 
    // Curators with the same Month & Date
    return 1;
  });

  //Filter out current curator base on current year/month
  let currentCurator = allCurators.find(curator => (curator.date.year === year && curator.date.month === month) );
  let index = allCurators.indexOf(currentCurator);

  // Return constructed curators object
  return {
    allCurators: allCurators,
    pastCurators: allCurators.slice(0, index),
    futureCurators: allCurators.slice(index+1),
    currentCurator: currentCurator ? currentCurator : allCurators[allCurators.length-1]
  }
}

export default function curators(state=initialState, action) {
  switch(action.type) {
    case FIREBASE_DID_UPDATE:
      return formatCuratorData(state.curators, action.snapshot.val().curators);
    default:
      return state;
  }
}