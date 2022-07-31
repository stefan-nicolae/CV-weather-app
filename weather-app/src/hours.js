import "./hours.css"

export default function Hours (props) {
    console.log(props.data)
    const hours = [], d = new Date()
    let currentHour = d.getHours()
    for(let i = 0; i < 8; i++) {
        hours.push(currentHour)
        currentHour = (currentHour + 3)%24
    }

    let index = 0
    return (<div className="hours">
        {hours.map(hour => {
            return(        

            <div key={index++} className="hour-span">
                <span>{hour}</span>
                <span>{props.CF === "C" ? props.data.hour[hour].temp_c : props.data.hour[hour].temp_f}°</span>
                <span>feels {props.CF === "C" ? props.data.hour[hour].feelslike_c : props.data.hour[hour].feelslike_f}°</span>
                <span><img src={props.data.hour[hour].condition.icon}></img></span>
                <span>☔ {props.data.hour[hour].chance_of_rain}%</span>
            </div>
            )
        })}
    </div>)
}