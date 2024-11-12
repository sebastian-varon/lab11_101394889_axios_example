import React from 'react';
import PersonList from './components/PersonList';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="header">
                <h1>Our Team</h1>
            </header>
            <PersonList />
        </div>
    );
}

export default App;