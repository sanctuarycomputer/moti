import Firebase from 'firebase';

/* Action Types */
export const CURATORS_DID_LOAD = 'CURATORS_DID_LOAD';

/* Action Creators */
export function curatorsDidLoad(curators=[]) {
  return { type: CURATORS_DID_LOAD, curators };
}

/* For Dispatch */
export function connectToCuratorsSocket() {
  return dispatch => {

    const firebaseURL = 'incandescent-fire-671.firebaseIO.com';
    const curatorsRef = new Firebase(firebaseURL + '/curators');

    return new Promise((resolve, reject) => {
      curatorsRef.on('value', snapshot => {
        let curators = snapshot.val().curators;
        dispatch(curatorsDidLoad(curators));
        resolve(curators);
      }, reject);
    });
  }
}