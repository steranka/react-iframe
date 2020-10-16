import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let [memToAllocateInKib, setMemToAllocateInKib] = useState(5000);
  let [mySpace, setMySpace] = useState("");

  function growMemory() {
    let memInBytes = memToAllocateInKib * 1000;
    console.log('grow Memory')
    let moreSpace = "";
    for (let ii = 0; ii < memInBytes; ii++) {
      moreSpace += "a";
    }
    setMySpace(mySpace+moreSpace);
    // new Array(10000).join('a'); could also work
  }

  function reduceMemory() {
    // Delete the last memToAllocate characters from mySpace string
    let memInBytes = memToAllocateInKib * 1000;
    if (mySpace.length >= memInBytes) {
      mySpace = mySpace.substring(0, mySpace.length - memInBytes);
      setMySpace(mySpace);
    } else {
      console.log('Not enough space exists to remove ' + memToAllocateInKib + 'KiB');
    }
  }

  function onChangeMemToAllocate(ev) {
    setMemToAllocateInKib(ev.target.value);
  }

  return (
    <div className="App">
      <div>
        Number of KiBytes to Grow/Shrink &nbsp;
        <input
          type="text"
          id="name"
          name="name"
          minLength="4"
          maxLength="12"
          size="12"
          onChange={onChangeMemToAllocate}
          value={memToAllocateInKib}
        />
        &nbsp;&nbsp;
        <button onClick={growMemory}>Grow memory</button>
        &nbsp;
        <button onClick={reduceMemory}>Reduce memory</button>
      </div>
      <div>Memory currently allocated: {mySpace.length/1000}KiB</div>

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
}

export default App;
