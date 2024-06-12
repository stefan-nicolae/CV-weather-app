import { useEffect } from "react"

export default function Day (props) {

    useEffect(() => {
        document.querySelectorAll(".day-div")[0].childNodes.forEach(e => {
            e.classList.add("highlight")
        })
    }, [])
    return (
    <div 
    onClick={
        
        (event) => { props.setData(props.data, event) }
        
    }
    className={props.data ? "day-div" : "day-div invalid"}>
        <span>{props.day}</span>
        <span><img src={props.data ? props.data.day.condition.icon : undefined}></img></span>
        <span>{props.data ? (props.CF === "C" ? props.data.day.maxtemp_c : props.data.day.maxtemp_f) : undefined}{props.data ? "°" : undefined}</span>
        <span>{props.data ? (props.CF === "C" ? props.data.day.mintemp_c : props.data.day.mintemp_f) : undefined}{props.data ? "°" : undefined}</span>
    </div>)
}