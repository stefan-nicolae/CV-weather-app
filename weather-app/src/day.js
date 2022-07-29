export default function Day (props) {
    console.log(props.CF)
    return (
    <div 
    onClick={() => props.setData(props.data)}
    className={props.data ? "day-span" : "day-span invalid"}>
        <span>{props.day}</span>
        <span><img src={props.data ? props.data.day.condition.icon : undefined}></img></span>
        <span>{props.data ? (props.CF === "C" ? props.data.day.maxtemp_c : props.data.day.maxtemp_f) : undefined}{props.data ? "°" : undefined}</span>
        <span>{props.data ? (props.CF === "C" ? props.data.day.mintemp_c : props.data.day.mintemp_f) : undefined}{props.data ? "°" : undefined}</span>
    </div>)
}