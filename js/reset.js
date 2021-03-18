const mail_check=()=>{
    const email = document.querySelector("#email");
    const error = document.querySelector(".email_error_box");
    const btn=document.querySelector(".submit");
    btn.style.display="none";
    let regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(email.value.match(regExp)){
      email.style.border="1px solid green"
      error.style.display = "none";
      btn.style.display = "block";
    }else{
        email.style.border="1px solid red"
      error.style.display = "block";
      btn.style.display = "none";
    }
  }

function resetPassword()
{
	const resetForm = document.getElementById("signup-form");
    resetForm .addEventListener('submit', e => {
    e.preventDefault();
    const email = resetForm ['email'].value;
    console.log(email);
    firebase.auth().sendPasswordResetEmail(email);
    change();
})
}

function change()
{
    var text = document.getElementById("subtext1");
    text.innerHTML = "Reset Password Link sent Successfully";
    text.style.color = "green";
    text.style.size = "10px";
}