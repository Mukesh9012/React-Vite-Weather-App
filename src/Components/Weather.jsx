
import React, { useEffect, useRef, useState } from 'react'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import search_icon from '../assets/search.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {

  const[weatherdata,setweatherdata]=useState(true)
  const inputRef=useRef()
  const search=async(city)=>{
    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const responce=await fetch(url);
      const data=await responce.json();
      console.log(data)
      setweatherdata({
         Temperature:Math.floor(data.main.temp),
         Location:data.name,
         Humidity:data.main.humidity,
         speed:data.wind.speed
      })
      
    } catch (error) {
      
    }
  }


useEffect(()=>{
  search("Delhi")
},[])

  return (
    <div className="main justify-center items-center text-center flex ">
      <div className='weatherApp w-110 h-120  rounded-3xl bg-blue-500 mt-10'>

        <div className="SearchBar h-10 w-full my-3 flex justify-center gap-2 mt-20">
          <span className=''><input ref={inputRef} type="text" placeholder='Search' className='rounded-full bg-white p-1 pl-2' /></span>
          <span onClick={()=>search(inputRef.current.value)}><img src={search_icon} alt="" className='rounded-full bg-white p-1 pl-2 hover:cursor-pointer hover:bg-amber-50 ' /></span>

        </div>
        <div className="imgIcon flex justify-center h-30 my-5">
          <img src={clear_icon} alt="" className=' ' />

        </div>
        <div className="cityTemp  font-serif my-2">
          <span className='text-5xl'><p>{weatherdata.Temperature} <sup>o</sup>C</p></span>
          <span className='text-3xl'><p>{weatherdata.Location}</p></span>

        </div>
        <div className="HumWind  h-30 flex gap-1 mt-10">
          <div className="Humidity  h-15 w-1/2 flex gap-3 justify-center font-serif">
          <img src={humidity_icon} alt=""  className='h-7 '/>
          <span className='text-1xl'>{weatherdata.Humidity}%</span>
          <span className='text-1xl'>Humidity</span>

          </div>
          <div className="Windspeed  h-15 w-1/2 flex gap-2 justify-center font-serif">
          <img src={wind_icon} alt=""  className='h-7 '/>
          <span className='text-1xl'>{weatherdata.speed}Km/h</span>
          <span className='text-1xl'>Wind Speed</span>

          </div>
        </div>


      </div>
    </div>
  )
}

export default Weather
