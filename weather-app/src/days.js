import "./days.css"
import Day from "./day.js"
import { useEffect, useState, useRef } from "react";

function loadDayNames(callback) {
    let today = new Date().getDay()
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const arr = []
    for(let i = 0; i < 8; i++) {
        arr.push(days[today])
        today++
        if(today === 7) today = 0
    }
    callback(arr)
}

export default function Days(props) {
    const [state, setState] = useState()
    const dayNames = useRef()

    useEffect(() => {
        loadDayNames(arr => {
            dayNames.current = arr
            setState(Math.random())
        })
    }, [])
    
    let dayIndex = 0
    return state ? (<div className="days">
        {
            dayNames.current.map(day => {
                return (<Day key={dayIndex++} dayIndex={dayIndex} CF={props.CF} day={day} data={props.weatherData.forecast.forecastday[dayIndex]} setData={props.setData}/>)
            })
        }

    </div>): (
        <div className="days days-loading">Loading...</div>
    )
}