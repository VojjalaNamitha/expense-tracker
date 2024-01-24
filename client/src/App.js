import React from 'react';
import './App.css';
import Graph from './components/graph';
import Form from './components/form';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="bg-slate-800 text-white rounded py-8 mb-10 text-4xl drop-shadow-lg text-gray-800">Expense Tracker</h1>
        {/* grid colums */}
        <div className='grid md:grid-cols-2 gap-4'>
           {/* chart */}
           <Graph></Graph>
           {/*form */}
           <Form></Form>
        </div>
      </div> 
    </div>
  );
}

export default App;
