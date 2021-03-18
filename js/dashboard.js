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
    humidity=data.field2+" %";
    gas=data.field3+" ppm";
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
    if (user)
    {
        console.log('user is signed in Successfully !!!');
    }
    else 
    {
        window.location.href = 'logout.html';
    }
})
