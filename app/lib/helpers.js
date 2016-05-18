export const manageBumpCount = (user, media, permRef, bumpRef) => {
  if(!media.bumpers) {
    permRef.update({
      "bumpers": [user.id]
    })
    bumpRef.transaction(currentBumpCount => currentBumpCount+1 );
  } else if(media.bumpers && media.bumpers.indexOf(user.id) === -1) {
    let newBumpersArray = media.bumpers.slice();
    bumpRef.transaction(currentBumpCount => currentBumpCount+1 );
    newBumpersArray.push(user.id);
    permRef.update({
      "bumpers": newBumpersArray
    })
  } else {
    //This is where we alert the users that they've already bumped
    console.log("you've already bumped, homie")
  }
};