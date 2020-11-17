auth.onAuthStateChanged(user=>{
    if(user)
    {
        document.getElementById('logedin').style.display="";
        document.getElementById('logedout').style.display="none";
      console.log('user logged in: ',user);
      console.log(user.uid);
      console.log(user.photoURL);
      document.getElementById('show-profile-nav').src=user.photoURL;
    }
    else{
        document.getElementById('logedout').style.display="";
        console.log('user logged out: ');
    }
});