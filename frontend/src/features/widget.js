export default function Widget({name, course, time}) {
    return (
        <div className="widget">
            <h1>{name}</h1>
            <h3>Course: {course}</h3>
            <h3>Meeting time: {time}</h3>
            <button>More</button>
        </div>
    )
}