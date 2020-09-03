import React from 'react';
import './App.css';
import Table from "./Table/Table";
import Search from "./Search/Search";


const App:React.FC = () => {
    return (
        <div className="container">
            <Search/>
            <Table/>
        </div>
    );
};

export default App;
