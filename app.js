/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '0bb536a5560037c7ef30deff117327af';

const performAction = async() => {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  const temperature = await getWeatherInfo(baseURL, zipCode, apiKey);
  try {getWeatherInfo(baseURL, zipCode, apiKey)
  .then(()=>{postData('/add', {temp: temperature, date: newDate, content: feelings})})
  .then(()=>{getData('/gather')})
  } catch(error) {
    console.log('error', error)
  }
};

document.getElementById('generate').addEventListener('click', performAction);

const getWeatherInfo = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL+"zip="+zipCode+"&appid="+apiKey+"&units=metric")
    try {
        const data = await res.json();
        const realFeel = data.main.temp;
        console.log(data);
        return realFeel;
      } catch(error) {
      console.log('error', error);
    }
};

const postData = async (url='' , data = {}) =>{
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
      console.log("error", error);
    }
};

const getData = async (url) => {
  const respond = await fetch(url);
  try {
    const data = await respond.json();
    const date = data.date;
    const temp = data.temp;
    const content = data.content;
    updateUI(date,temp,content);
  }
  catch (error) {
    console.log("error", error);
  }
};

const updateUI = function(date,temp,content) {
  document.getElementById('date').innerHTML="Today's Date: " + date;
  document.getElementById('temp').innerHTML="Current Temprature: " + temp+ " °C";
  document.getElementById('content').innerHTML="I'm Feeling: " + content;
};