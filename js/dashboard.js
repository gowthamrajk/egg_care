function temp(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id')
}
const id=temp()
const api_url='https://api.thingspeak.com/channels/'+id+'/feeds/last'
var temperature=null;
var humidity=null;
var gas=null;
var currTemperature,currHumidity,currGas;
const refresh=(i)=>{
    getValue(i);
}
const check=(i)=>{
    if(i==1){
    document.getElementById('image').src="./img/003-cloudy.svg";
    document.getElementById('value').textContent=temperature;
    document.getElementById('temp').focus()
    }
    else if(i==2){
        document.getElementById('image').src="./img/humidity.svg";
        document.getElementById('value').textContent=humidity;
    }  
    else{
        document.getElementById('image').src="./img/001-co2.svg";
        document.getElementById('value').textContent=gas;
    }  
}
async function getValue(i){
    const response=await fetch(api_url);
    const data=await response.json();
    temperature=data.field1+" ^F";
    currTemperature = data.field1;
    humidity=data.field2+" %";
    currHumidity = data.field2;
    gas=data.field3+" ppm";
    currGas = data.field3;
    var count=0;
    console.log(currTemperature+" "+currHumidity+" "+currGas);
    const notification = document.getElementById('badge');
    const tempNotify = document.getElementById('tempNotify');
    const humNotify = document.getElementById('humNotify');
    const gasNotify = document.getElementById('gasNotify');

    if(currTemperature > 97)
    {
        count++;
        tempNotify.innerText = "Temperature is more than threshold !!!";
        tempNotify.style.background = "red";
    }
    else if(currTemperature < 40)
    {
        count++;
        tempNotify.innerText = "Temperature is less than threshold !!!";
        tempNotify.style.background = "orange";
    }
    else
    {
        tempNotify.innerText = "Temperature is Normal !!!";
        tempNotify.style.background = "green";
    }
    if(currHumidity > 70)
    {
        count++;
        humNotify.innerText = "Humidity is more than threshold !!!";
        humNotify.style.background = "red";
    }
    else if(currHumidity < 40)
    {
        count++;
        humNotify.innerText = "Humidity is less than threshold !!!";
        humNotify.style.background = "orange";
    }
    else
    {
        humNotify.innerText = "Humidity is Normal !!!";
        humNotify.style.background = "green";
    }
    if(currGas > 450)
    {
        count++;
        gasNotify.innerText = "Gas is more than threshold !!!";
        gasNotify.style.background = "red";
    }
    else if(currGas < 250)
    {
        count++;
        gasNotify.innerText = "Gas is less than threshold !!!";
        gasNotify.style.background = "orange";
    }
    else
    {
        gasNotify.innerText = "Gas is Normal !!!";
        gasNotify.style.background = "green";
    }
    console.log(count);
    notification.innerText = count;

    if(typeof data.field1 === "undefined"){
        temperature="No-data"
    }
    if(typeof data.field2 === "undefined"){
        humidity="No-data"
    }
    if(typeof data.field3 === "undefined"){
        gas="No-data"
    }
    check(i);
}
refresh(1);

function logout() 
{
    auth.signOut();
}

auth.onAuthStateChanged(user => {
    const username = document.getElementById('username');
    if (user)
    {
        fs.collection('users').doc(user.uid).get().then((snapshot) => {
            username.innerText = snapshot.data().Name;
        })
        console.log('user is signed in Successfully !!!');
    }
    else 
    {
        window.location.href = 'logout.html';
    }
})