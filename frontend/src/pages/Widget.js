import React from 'react';
import './Widget.css';



const Widget = ({imageUrl},{groupName}) => {
    const widgetStyle = {
       /* backgroundImage:`url(${imageUrl})`,*/
         backgroundImage: "url('./historynew.avif')"
      };
      
    return (
        <div id="widget-container">
            <div id="title-bar">
                <h2>{imageUrl}</h2>
                <h2>{groupName}</h2>
                <h2>HIST 3, Lec 2</h2>
            </div>
            <div id="button-container">
                <button>+</button>
            </div>
            {/* Your widget content goes here */}
        </div>      
    );
   }

export default Widget;
