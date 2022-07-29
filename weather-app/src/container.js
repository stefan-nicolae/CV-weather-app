import Hours from "./hours.js"
import Days from "./days.js"
import Menu from "./menu.js"
import { useEffect, useState, useRef } from "react";

const APIkey = "ebbc6edec89748129ec185456221407"

function getLatLong(callback) {
    let latitude, longitude
    navigator.geolocation.getCurrentPosition(position => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        callback(latitude, longitude)
    })
} 

 
export default function Container () {
    const [state, setState] = useState(undefined)
    const [CF, setCF] = useState("C")
    const weatherData = useRef()
    useEffect(() => {
        getLatLong((latitude, longitude) => {
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${latitude},${longitude}&days=5`)
            .then(res => res.json())
            .then(json => {
                weatherData.current = json
                setState(json.forecast.forecastday[0])
            })
        })
    }, [])

    //sets the data for both hours and menu
    const setData = data => {
        if(data === undefined) return
        setState(data)
    }

    const setF = () => {
        setCF("F")
    }

    const setC = () => {
        setCF("C")
    }

    return state ? (
        <div className="container">
            <div className="big-circle">
                {/* hours element */}
                <Hours data={state} CF={CF}/>
                {/* menu element */}
                <Menu data={state} setF={setF} setC={setC} CF={CF}/>
                {/* days element */}
                <Days weatherData={weatherData.current} setData={setData} CF={CF}/>
            </div>
        </div>
    ) : (<div className="container">
        <div className="loading">Loading current location data...</div>
    </div>)
}