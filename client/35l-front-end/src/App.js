import logo from './logo.svg';
import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
function Widget() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Widget</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <div id="widget-container">
          <div id="title-bar">
            <h2>HIST 3, Lec 2</h2>
         </div>
         <div id="button-container">
            <button>+</button>
        </div>
          {/* Your widget content goes here */}
        </div>
        
        <script src="script.js"></script>
      </body>
    </html>
  );
}

export default Widget;
