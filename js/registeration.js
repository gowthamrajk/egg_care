const mail_check=()=>{
    const email = document.querySelector("#email");
    const error = document.querySelector(".email_error_box");
    const btn=document.querySelector(".submit");
    
    let regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(email.value.match(regExp)){
      email.style.border="1px solid green"
      error.style.display = "none";
      btn.style.cursor='pointer' 
    }else{
        email.style.border="1px solid red"
      error.style.display = "block";
      btn.style.cursor='not-allowed'
    }
}

const pass_check=()=>{
    const input=document.querySelector("#password");
    const error=document.querySelector(".password_checker")
    const text=document.querySelector(".text");
    const btn=document.querySelector(".submit");
    const temp_password=document.getElementById('cnfrm_password').value
    let regExpWeak = /[a-z]/;
    let regExpMedium = /\d+/;
    let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
    if(input.value.length <= 3 && (input.value.match(regExpWeak) || input.value.match(regExpMedium) || input.value.match(regExpStrong))){
        text.style.display="block"
        text.textContent="Your password is too weak"
        text.style.color="#e76f51"
        input.style.border="1px solid #e76f51"
        btn.style.cursor='not-allowed'    
    }
    if(input.value.length >= 6 && ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) || (input.value.match(regExpMedium) && input.value.match(regExpStrong)) || (input.value.match(regExpWeak) && input.value.match(regExpStrong)))){
        text.style.display="block"
        text.textContent="Your password is medium"
        text.style.color="#e9c46a"
        input.style.border="1px solid #e9c46a"
        btn.style.cursor='not-allowed'        
    }
    if(input.value.length >= 8 && input.value.match(regExpWeak) && input.value.match(regExpMedium) && input.value.match(regExpStrong)){
        text.style.display="block"
        text.textContent="Your password is strong"
        text.style.color="green"
        btn.style.display="block"
        btn.style.cursor='pointer'
        input.style.border="1px solid green"
        setTimeout(()=>{text.style.display="none"},3000);
        if(password.localeCompare(temp_password)!=0||temp_password.length>0){
            text.textContent="Password Mismatch"
            text.style.color="#e76f51"
            btn.style.cursor='not-allowed'
        } 
    }
}

const cnfrm_pass=()=>{
    const password=document.getElementById('password').value
    const temp_password=document.getElementById('cnfrm_password').value
    const error_box=document.querySelector(".password_match")
    const text=document.querySelector(".text1");
    const btn=document.querySelector(".submit");
    let regExpWeak = /[a-z]/;
    let regExpMedium = /\d+/;
    let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
    if(password.localeCompare(temp_password)==0){
        document.getElementById('cnfrm_password').style.border="1px solid green"
        btn.style.cursor='pointer' 
        text.style.color='green'
        text.textContent="Password is match"
        setTimeout(()=>{error_box.style.display="none"},2000);
    }
    else{
        text.textContent="Password does not match"
        text.style.color="#e76f51"
        error_box.style.display="block"
        document.getElementById('cnfrm_password').style.border="1px solid #e76f51"
        btn.style.cursor='not-allowed'
    }

    if(!(password.length >= 8 && password.match(regExpWeak) && password.match(regExpMedium) && password.match(regExpStrong))){
        btn.style.cursor='not-allowed'
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

var key=0
function channel(Name){
    var api='https://api.thingspeak.com/channels.json'
    var id=0
    fetch(api, { 
        method: "POST",

        // Adding body or contents to send 
        body: JSON.stringify({ 
            api_key:"6KFFRS5MQFK5QYD5",
            name:Name+"-EggCare",
            field1:"Temperature",
            field2:"Humidity",
            field3:"Gas",
            public_flag:true
        }), 
        
        // Adding headers to the request 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
    }) 
    
    // Converting to JSON 
    .then(response => response.json()) 
    
    // Displaying results to console 
    .then((json) =>{
        console.log(json.id)
        key=json.id
    });
    
}


const signupForm = document.getElementById("signup-form");
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = signupForm['name'].value;
    channel(name)
    setTimeout(()=>{
        const email = signupForm['email'].value;
        const mobile = signupForm['mobile'].value;
        const password = signupForm['password'].value;
        const confirmPassword = signupForm['confirmPassword'].value;
        console.log(name, email, mobile, password, confirmPassword, key);
        signupForm.reset();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            return db.collection('users').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Mobile: mobile,
                Password: password,
                ConfirmPassword: confirmPassword,
                DataAccessKey: key
    
            }).then(() => {
                //location = "registration-success.html";
                sendOwnerEmail(name,email,mobile,password,key);
    
            }).catch(err => {
                location = "registration-error.html";
            })
    
        }).catch(err => {
            location = "registration-error.html";
        })
    },5000)
    
})

function sendOwnerEmail(name,email,mobile,password,key) 
{  
      Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "eggcareproducts@gmail.com", 
        Password: "Gowthamraj@258", 
        To: "gowthamraj692@gmail.com,eggcareproducts@gmail.com,bozofeet0@gmail.com",
        From: 'eggcareproducts@gmail.com',
        Subject: "New user Registration - EGG CARE PRODUCTS", 
        Body: "<html><h2><b><font color='brown'>Hello Team, </font></h2><h4>There is a new Customer who have Ordered our product. His order has been processed and Customer Cloud Channel with DATA ACCESS KEY has been created successfully. Your customer details are:</h4><p><h4>User Name: <font color='red'> "+name+" </font></h4></p><p><h4>Registered email: <font color='red'> "+email+" </font></h4></p><p><h4>Mobile Number: <font color='red'> "+mobile+" </font></h4></p><p><h4>Password: <font color='red'> "+password+" </font></h4></p><p><h4>Access Key: <font color='red'> "+key+" </font></h4></p><p><h4>Please stay in touch with him and give him our best service.</h4></p><h3><font color='navy'>Thanks & regards,</font><br><font color='red'> -- EGG CARE --</font></b><br></h3></b></html>", 
      })  
       .then(function (message) 
        { 
            console.log("email sent to owner successfully");
            sendEmail(name,email,mobile,password,key);
        }); 
}

function sendEmail(name,email,mobile,password,key) 
{  
      Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "eggcareproducts@gmail.com", 
        Password: "Gowthamraj@258", 
        To: email,
        From: 'eggcareproducts@gmail.com',
        Subject: "Registration Confirmation - EGG CARE PRODUCTS", 
        Body: "<html><h2><b><font color='brown'>Hello "+name+", </font></h2><h4>Thankyou for Registering in EGG CARE and Ordering our product. Your Order has been processed and Customer Cloud Channel has been created successfully. Your User Registration Credentials are: </h4><p><h4>Registered email: <font color='red'> "+email+" </font></h4></p><p><h4>Mobile Number: <font color='red'> "+mobile+" </font></h4></p><p><h4>Password: <font color='red'> "+password+" </font></h4></p><p><h4>Access Key: <font color='red'> "+key+" </font></h4></p><p><h4>Please Login with your valid credentials once after your product is been installed in the machine and Incubation slot starts. </h4></p> <h4>Hope you will have a great User Experience with us. Feel Free to reach us for more orders & queries. </h4><h3><font color='navy'>Thanks & regards,</font><br><font color='red'> -- EGG CARE --</font></b><br></h3></b></html>", 
      })  
       .then(function (message) 
        { 
            console.log("email sent successfully");
            redirect();
        }); 
}

function redirect()
{
    location = "registration-success.html";
}