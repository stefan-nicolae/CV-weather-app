import "./menu.css"
import { useEffect, useState } from "react";

export default function Days(props) {
    const data = props.data
    const highlighted = getComputedStyle(document.documentElement).getPropertyValue("--highlighted")
    const location = props.location

    useEffect(() => {
         document.querySelectorAll(".set-c-f")[0].style.color = highlighted
    }, [])

    return (<div className="menu">
        <section>
            <div>
                <span>Humidity {data.day.avghumidity}%</span>
                <span>Wind {props.CF==="C" ? data.day.maxwind_kph : data.day.maxwind_mph} {props.CF==="C" ? "kph" : "mph"}</span> 
            </div>
            <div>
                <span onClick={props.setC} className="set-c-f">°C </span>
                <span onClick={props.setF} className="set-c-f">°F</span>
            </div>
        </section>
        <header>
            <h1>{data.day.condition.text}</h1>
            <h2>{location}</h2>
        </header>
        <input onKeyUp={event => props.searchLocation(event)} type="text" placeholder="Search location..."></input>
    </div>)
}