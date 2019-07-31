import React from "react";
import logo from "./logo.svg";
import "./App.scss";

function App() {
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
      <form
        autocomplete="off"
        class="center overlay search-form"
        id="search-form"
        autocorrect="off"
        autocapitalize="none"
        spellcheck="false"
      >
        <div>
          <input
            class="search-input"
            id="search-input"
            title="search"
            type="text"
          />
          <ul class="search-suggestions" id="search-suggestions" />
        </div>
      </form>

      <aside class="center help overlay" id="help" />
    </div>
  );
}

export default App;
