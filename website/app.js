
// const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=66614&units=metric&appid=api_key';
const apiKey = 'ed705ef88671f2f6589acd5e643b53a6';


// /* Global Variables */
const entryHold = document.getElementById("holder entry");

// // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();



// the click listener function
document.getElementById("generate").addEventListener("click", async () => {
  // input value
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  // test
  // console.log('hii');

  // alert for empty input
  if(zipCode == ""){
    alert('please enter your zip code');
    return;
  }

  // get response and save data function
  fetchData(zipCode)
  .then( (result) =>{
     return dataServer(result, content)
  })
  
  .then ( ()=>{
    updateUI()
  })
})


// get response from url as js
async function fetchData(zipCode){
const res = await fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=metric&appid=" + apiKey);
const Data = await res.json();

// my Data temp
return Data.main.temp;
}


// send data to the server and save it
async function dataServer(temp, content){
await fetch('/add', {
  method: 'POST', 
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: newDate,
    temp: temp,
    content: content
  })         
});


// to get data from server
const respons = await fetch('/all', {
  credentials: 'same-origin'
});

const recieve = await respons.json()
console.log(recieve);

return recieve;
}


// change UI function
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    // update new entry values
    document.getElementById('date').innerHTML = allData.data;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};