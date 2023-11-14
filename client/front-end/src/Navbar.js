
export default function NavBar(){
    return <nav className = "nav">
        <a href="/" className="site-title"> StudyNest</a>
        <ul>
            <li className="active">
                <a href = "/allgroups"> All Groups </a>
               
            </li>
            <li className="active">  <a href = "/login">Login</a> </li>
        </ul>
    </nav>
}