const loginForm = document.getElementById('login-form');
var Datakey;
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginEmail = loginForm['email'].value;
    const loginPassword = loginForm['password'].value;
    auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(() => {
        console.log('login success');
        navigate(loginEmail);
    }).catch(err => {
        location = "login-error.html";
    })
})

const navigate=(currLoginemail)=>{
    fs.collection("users").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
            	if(doc.data().Email === currLoginemail)
            	{
            	    Datakey = doc.data().DataAccessKey;
            	    console.log(Datakey);
                    checkAndLogin(Datakey);
            	}
                });
            });
}

async function checkAndLogin(id)
{
    const api_url='https://api.thingspeak.com/channels/'+id+'/feeds/last'
    const response=await fetch(api_url);
    const data=await response.json();
    temperature=data.field1;
    humidity=data.field2;
    gas=data.field3;
    if(typeof data.field1 === "undefined" || typeof data.field2 === "undefined" || typeof data.field3 === "undefined"){
        location = "no-data.html";
    }
    else{
        location = "mainDashboard.html?id="+Datakey;
   }
}

const showPass=(password)=>{
    const input=document.querySelector("#"+password);
    input.type="text"
}

const hidePass=(password)=>{
    const input=document.querySelector("#"+password);
    input.type="password"
}