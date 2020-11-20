//adding data
//rcaptcha function called and opened
window.onload=function(){
  render();
}
//profile pic selector
let file={};
function choosefile(e){
  file=e.target.files[0];
}
//recaptcha function called
function render(){
  window.recaptcha=new firebase.auth.RecaptchaVerifier('recaptcha');
  recaptcha.render(); 
};
//form selection and submit event
 const form = document.querySelector('#signup-details');
 form.addEventListener('submit', (e) => {
   e.preventDefault();
   //number taking
   var number=document.getElementById('phone').value;
   //signup with number and otp send system
   firebase.auth().signInWithPhoneNumber(number,window.recaptcha).then(function (confirmationResult){
     window.confirmationResult=confirmationResult;
     coderesult=confirmationResult;
     console.log(coderesult);
     document.querySelector('#otp-form').style.display="";
   });
});
//form submit function ends

//otp verification function
   function codeverify(){
     var code=document.getElementById('verificationcode').value;
     //code confirmation
     coderesult.confirm(code).then(function(result){
     const email=form.email.value;
     const password=form.password.value;
     //putting email in the user details
     var credential = firebase.auth.EmailAuthProvider.credential(email, password);
     auth.currentUser.linkWithCredential(credential).then(function(usercred) {
     var user = usercred.user;
    //uploading profile image
   firebase.storage().ref('users/'+auth.currentUser.uid+'/profile.jpg').put(file).then(function(){
      console.log('success upload');
      //getting download link
      firebase.storage().ref('users/'+auth.currentUser.uid+'/profile.jpg').getDownloadURL().then(function(url){
        //updating name and photo url of user
        auth.currentUser.updateProfile({
          displayName:form.name.value,
          photoURL:url
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });
        console.log(url);
        var newdoc=db.collection('signup').doc(auth.currentUser.uid);
        newdoc.set({
          photo:url,
          cpassword: form.cpassword.value,
          department: form.dept.value,
          email: form.email.value,
          gender: form.gender.value,
          name: form.name.value,
          password: form.password.value,
          userid:newdoc.id,
          lastActive:firebase.firestore.Timestamp.fromDate(new Date()),
          totalComment:'0',
          totalQueries:'0',
          phoneno:form['phone'].value
        })
        form.reset();//display name upload done
      });
    }).catch(error=>{
      console.log(error.message);
    });
    //image upload done
    console.log("Account linking success", user);
    }).catch(function(error) {
    console.log("Account linking error", error);
    });
    //account also linked with email

    //updating displayname of current user
    

    //adding data to firestore database
   /* var newdoc=db.collection('signup').doc(auth.currentUser.uid);
     newdoc.set({
     cpassword: form.cpassword.value,
     department: form.dept.value,
     email: form.email.value,
     gender: form.gender.value,
     name: form.name.value,
     password: form.password.value,
     userid:newdoc.id,
     lastActive:firebase.firestore.Timestamp.fromDate(new Date()),
     totalComment:'0',
     totalQueries:'0',
     phoneno:form['phone'].value
   })*/
   //adding data to firestore done
   //reset the form
   }).catch(function(error) {
    console.log("Account linking error", error);
    document.querySelector("#otp-error").innerHTML="Invalid!";
    });
};