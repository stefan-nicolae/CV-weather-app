import "./menu.css"

export default function Days(props) {
    const data = props.data
    console.log(props.data)
    return(<div className="menu">
        <section>
            <div>
                <span>Humidity {data.day.avghumidity}%</span>
                <span>Wind {props.CF==="C" ? data.day.maxwind_kph : data.day.maxwind_mph} {props.CF==="C" ? "kph" : "mph"}</span> 
            </div>
            <div>
                {/* <div> */}
                <span onClick={props.setC} className="set-c-f">°C </span>
                <span onClick={props.setF} className="set-c-f">°F</span>
                {/* </div> */}
                {/* <div>💧 {data.day.daily_chance_of_rain}%</div> */}
            </div>
        </section>
        <header>
            <h1>{data.day.condition.text}</h1>
            {/* todo */}
            <h2>Deva, Hunedoara</h2>
        </header>
        <input type="text" placeholder="Search location..."></input>
    </div>)
}