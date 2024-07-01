import styled from 'styled-components';
import  { useState } from 'react';
import axios from 'axios';
function App() {
  const key = "6f2bb24b565f5537ecaac4382472c9c5";
  //let cityName = "Seoul";
  const [cityName, setCityName] = useState('');
  const [result, setResult] = useState({});

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`; 
  const searchWeather = async (e) => {
    if(e.key === "Enter")
    {
      try{
        const data = await axios({
          method : "GET",
          url : api
        });
        setResult(data);
        console.log(data);
      }catch(err){
        alert(err);
      }
    }
  }
  return (
    <AppWrap>
      <div className = "appContentWrap">
        <input 
          placeholder = "도시를 입력해주세요" 
          value = {cityName}
          onChange = {(e)=> setCityName(e.target.value)}
          type = 'text'
          onKeyDown={searchWeather}/>
        {
          Object.keys(result).length !== 0 && (
            <ResultWrap>
            <div className='city'>{result.data.name}</div>
            <div className='temperature'>
              {Math.round((result.data.main.temp-273.15)* 10) / 10}°C
            </div>
            <div className='sky'>{result.data.weather[0].main}</div>
          </ResultWrap>
          )
        }

      </div>
    </AppWrap>
  )
}

export default App

const AppWrap = styled.div`
  width : 100vw;
  height : 100vh;

  .appContentWrap{
    left : 50%;
    top : 50%;
    transform : translate(-50%, -50%);
    position : absolute;
    padding : 20px;
  }
`;
const ResultWrap = styled.div`
  margin-top : 60px;
  padding : 10px;
  border : 1px black solid;
  border-radius : 8px;
  .city{
    font-size : 24px;
  }
  .temperature {
    font-size : 60px;
    margin-top : 8px;
  }
  .sky{
    font-size : 20px;
    text-align : right;
    margin-top : 8px;
  }
`;