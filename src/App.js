import React from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpensive from './components/IncomeExpensive';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction'
import './App.css';
import { GlobalProvider } from './context/GlobalState';

function App() {
  // demo comments
  return (
    <GlobalProvider>
     <Header />
      <div className='container'>
        <Balance />
        <IncomeExpensive />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
     
  
  );
}

export default App;
