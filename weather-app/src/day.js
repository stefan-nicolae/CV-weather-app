import { useEffect } from "react"

export default function Day (props) {
    const highlighted = getComputedStyle(document.documentElement).getPropertyValue("--highlighted")

    useEffect(() => {
        document.querySelectorAll(".day-span")[0].childNodes.forEach(e => {
            e.style.color = highlighted
        })
    }, [])
    return (
    <div 
    onClick={(event) => props.setData(props.data, event)}
    className={props.data ? "day-span" : "day-span invalid"}>
        <span>{props.day}</span>
        <span><img src={props.data ? props.data.day.condition.icon : undefined}></img></span>
        <span>{props.data ? (props.CF === "C" ? props.data.day.maxtemp_c : props.data.day.maxtemp_f) : undefined}{props.data ? "°" : undefined}</span>
        <span>{props.data ? (props.CF === "C" ? props.data.day.mintemp_c : props.data.day.mintemp_f) : undefined}{props.data ? "°" : undefined}</span>
    </div>)
}