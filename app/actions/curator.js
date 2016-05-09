import Firebase from 'firebase';
let firebaseURL = 'incandescent-fire-671.firebaseIO.com',
    firRef = new Firebase(firebaseURL);

/* Action Types */
export const SET_CURRENT_CURATOR = 'SET_CURRENT_CURATOR';
export const ADD_TO_PAST_CURATORS = 'ADD_TO_PAST_CURATORS';
export const ADD_TO_FUTURE_CURATORS ='ADD_TO_FUTURE_CURATORS';



