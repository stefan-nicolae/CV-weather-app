import "./hours.css"

export default function Hours (props) {
    const hours = [], d = new Date()
    let currentHour = d.getHours()
    for(let i = 0; i < 8; i++) {
        hours.push(currentHour)
        currentHour = (currentHour + 3)%24
    }


    return (<div className="hours">
        {hours.map(hour => {
            return(        

            <div className="hour-span">
                <span>{hour}</span>
                <span>{props.CF === "C" ? props.data.hour[hour].temp_c : props.data.hour[hour].temp_f}°</span>
                <span><img src={props.data.hour[hour].condition.icon}></img></span>
                <span>☔ {props.data.hour[hour].chance_of_rain}%</span>
            </div>
            )
        })}
    </div>)
}