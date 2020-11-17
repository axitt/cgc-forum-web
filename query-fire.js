$("#querysubmit").click(function(){
    var user=auth.currentUser;
    console.log(user.uid);
    const form=document.querySelector("#post");
    if(form.title.value==""||form.details.value=="")
    {
        document.getElementById('query-error').innerHTML="Please Fill A Question!";
    }
    else
    {
    var query=db.collection("questions").doc();
    query.set({
        createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
        userid:user.uid,
        questionTitle:form.title.value,
        questionContent:form.details.value,
        replyCount:0,
        username:user.displayName,
        email:user.email,
        userProfileImageUrl:user.photoURL
    })
    document.getElementById('query-error').innerHTML="";
    form.reset()
    alert("Your Query Submitted Successfully!");
    }
});
