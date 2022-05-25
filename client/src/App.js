import React from "react";
import jsonImage from "./image.png";
import "./App.css"

const App = () => {

    const showFile = (e) => {
      e.preventDefault();
      const reader = new FileReader();
      reader.readAsText(e.target.files[0])
      reader.onload = (e) => {
        const text = e.target.result;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logs : text })
        };

        fetch('http://localhost:5000', requestOptions)
          .then(response => response.json())
          .then(data => {
            exportData(JSON.stringify(data))
          }
        );
      };

      const exportData = (send) => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          send
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "errors.json";
    
        link.click();
      };
    };

    return (
        <div>
          <div className="flex-container block">
            <img src={jsonImage}></img>
            <h2>Upload .txt file here</h2>
            <h3>File Format</h3>
            <p>&lt;ISO Date&gt; &#45; &lt;Log Level&gt; &#45; &#123;&quot;transactionId&quot;&#45; &quot;&lt;UUID&gt;&quot;&#44; &quot;details&quot;&#45; &quot;&lt;message event&#47;action</p>
            <p>description&gt;&quot;&#44; &quot;err&quot;&#45; &quot;&lt;Optional&#44; error description&gt;&quot;&#44; &#46;&#46;&#46;&lt;additional log information&gt;&#125;</p>
            <br></br>
            <input accept=".txt" type="file" id="file" className="file" onChange={showFile}/>
          </div>
        </div>
    );
};

export default App;