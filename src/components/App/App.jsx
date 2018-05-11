import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './App.css';
import { AppRouter } from '../AppRouter/AppRouter';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pad">ScratchPad</Link>
          </li>
          <li>
            <Link to="/form">ReactiveForms</Link>
          </li>
        </ul>
        <main>
          <AppRouter />
        </main>
      </div>
    );
  }
}

export default App;
