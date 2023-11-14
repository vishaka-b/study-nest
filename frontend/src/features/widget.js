export default function Widget({name, course, time}) {
    return (
        <div className="widget">
            <h1>{name}</h1>
            <h2>Course: {course}</h2>
            <h2>Meeting time: {time}</h2>
        </div>
    )
}