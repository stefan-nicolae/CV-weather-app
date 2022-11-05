import Hours from "./hours.js"
import Days from "./days.js"
import Menu from "./menu.js"
import { useEffect, useRef, useState } from "react";


//weatherapi.com
const APIkey = "ebbc6edec89748129ec185456221407" 
//google geocoding api
const GEOkey = "AIzaSyAIfwB5a40jpDuAnWFffeuE7GWa9F_KS30"

function getCurrentLatLong(callback, message) {
    if(message) console.log(message)
    let latitude, longitude
    navigator.geolocation.getCurrentPosition(position => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        callback(latitude, longitude)
    })
} 

function coordsToLocation (lat, lng) {
    const address =`https://maps.googleapis.com/maps/api/geocode/json?key=${GEOkey}&latlng=${lat},${lng}&result_type=locality`
    return fetch(address).then(res => res.json()).then(json => json)
}

function locationToCoords(locationName) {
    const address =`https://maps.googleapis.com/maps/api/geocode/json?key=${GEOkey}&address=${locationName}`
    return fetch(address).then(res => res.json()).then(json => json.status === "OK" ? json.results[0].geometry.location : false)
}
 
export default function Container () {
    //contains the selected day's weather data
    const [selectedDayWeather, setSelectedDayWeather] = useState(undefined)
    //contains just the location NAME displayed
    const [locationName, setLocationName] = useState(undefined)
    const [CF, setCF] = useState("C")
    //contains all the weather data for today and a few days after
    const weatherData = useRef() 
    const highlighted = getComputedStyle(document.documentElement).getPropertyValue("--highlighted")


    //sets the actual location 
    const setTargetPlace = (latitude, longitude) => {
        //free trial will not return more than three days including today
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${latitude},${longitude}&days=8`)
        .then(res => res.json())
        .then(json => {
            weatherData.current = json
            coordsToLocation(latitude, longitude).then(res => {
                if(res.status === "OK") 
                {
                    setLocationName(res.results[0].formatted_address)
                    setSelectedDayWeather(json.forecast.forecastday[0])
                }
            })
        })
    }
    
    //input, if it finds said location it will change it
    const searchLocation = (event) => {
        const value = event.currentTarget.value
        if(event.code !== "Enter") return
        event.currentTarget.value = ""
        locationToCoords(value).then(res => {
            if(res) setTargetPlace(res.lat, res.lng)
        })
    }
    
    useEffect(() => {
        getCurrentLatLong((latitude, longitude) => {
           setTargetPlace(latitude, longitude)
        }) 
        document.querySelectorAll("*").forEach(item => {
             item.addEventListener("dragstart", e => {
                e.preventDefault()
            })
        })
    }, [])


    //changes the days
    const setData = (data, event) => {
        if(event.currentTarget.className.includes("invalid")) return
        document.querySelectorAll(".day-div").forEach(span => {
            if(span.className.includes("invalid")) return
            span.childNodes.forEach(e => {
                e.style.color = "unset"
            })
        })
        event.currentTarget.childNodes.forEach(e => {
            e.style.color = highlighted
        })
        if(data === undefined) return
        setSelectedDayWeather(data)
    }

    const setF = () => {
        document.querySelectorAll(".set-c-f").forEach(span => {
            span.style.color = "unset"
        })
        document.querySelectorAll(".set-c-f")[1].style.color = highlighted
        setCF("F")
    }

    const setC = () => {
        document.querySelectorAll(".set-c-f").forEach(span => {
            span.style.color = "unset"
        })
        document.querySelectorAll(".set-c-f")[0].style.color = highlighted
        setCF("C")
    }

    return (selectedDayWeather && locationName) ? (
        <div className="container">
            <div className="big-circle">
                {/* hours element */}
                <Hours data={selectedDayWeather} CF={CF}/>
                {/* menu element */}
                <Menu data={selectedDayWeather} setF={setF} setC={setC} CF={CF} locationName={locationName} searchLocation={searchLocation}/>
                {/* days element */}
                <Days weatherData={weatherData.current} setData={setData} CF={CF}/>
            </div>
        </div>
    ) : (<div className="container">
        <div className="loading">Loading current location data...</div>
    </div>)
}