import "./menu.css"
import { useEffect, useRef } from "react";

export default function Days(props) {
    const data = props.data
    const location = props.locationName
    
    useEffect(() => {
        document.querySelectorAll(".set-c-f")[0].classList.add("highlight")
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
        <input autoFocus onKeyUp={event => props.searchLocation(event)} type="text" placeholder="Type location, press Enter... (free API only allows for 3 days)"></input>
    </div>)
}