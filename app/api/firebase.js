import Firebase from 'firebase';

let firebaseURL = 'incandescent-fire-671.firebaseIO.com',
    curatorsRef = new Firebase(firebaseURL + '/curators');

export curatorsRef;