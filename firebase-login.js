  //login details
  const loginForm = document.querySelector('#login-details');
      loginForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        //get user info
        const email= loginForm['exampleInputEmail1'].value;
        const password= loginForm['exampleInputPassword1'].value;
        
        auth.signInWithEmailAndPassword(email,password).then(cred => {
        console.log(cred.user);
        loginForm.reset();
        window.location = 'profile.html';
        })   
      });