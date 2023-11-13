import Widget from '../features/widget.js'
export default function Home(){
    return (<>
    
        <h1>StudyNest</h1>
        <div>
            <h2 className="homeBody">Groups you're in:</h2>
            <Widget></Widget>
        </div>
        <div> 
            
            <h2 className="homeBody">Groups you've made:</h2>
            <button type="button" className="createNewGroup"> + </button>

            
            </div>
       
        
        </>)
}