window.addEventListener('load',()=>{
    const params=(new URL(document.location)).searchParams;
    auth.onAuthStateChanged(user=>{
        if(user)
        {
    var reply=params.get('comment');
    var id=params.get('id');
    if(reply!=null&&id!=null&&reply!=""&&id!="")
    {
      var answer=db.collection('questions').doc(id).collection("responses").doc();
      answer.set({
          createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
          responseText:reply,
          userId:user.uid,
          userName:user.displayName,
          userProfileImageUrl:user.photoURL
      }).then(function(){
        const increment = firebase.firestore.FieldValue.increment(1);
          db.collection('questions').doc(id).update({
              replyCount:increment
          }).then(function(){
          console.log("added");
          window.location="index.html";
          })
      })
    }
}
})
})
function reply(){
    var user=auth.currentUser;
        if(!user)
        {
            window.location="login.html";
            return false;
        }
        else{
            return true;
        }
}
