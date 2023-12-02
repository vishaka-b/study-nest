
export default function NavBar(){
    return <nav className = "nav">
        <a href="/Home" className="site-title"> Study Nest</a>
        <ul>
            <li className="active">
                <a href = "/allgroups"> All groups </a>
               
            </li>
            <li className="active">  <a href = "/">Log out</a> </li>
        </ul>
    </nav>
}