import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

export default function AddTransaction() {
  const mockApiurl = "https://66c327afd057009ee9bf3ee0.mockapi.io/idm_tech_park/testing";
  const [text, setText] = useState('');
  const [amount, setAmount] = useState();
  const [view, setView] = useState([]);

  const { addTransaction } = useContext(GlobalContext);

  useEffect(() => {
    axios.get(mockApiurl)
      .then((response) => {
        setView(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const del = (id) => {
    axios.delete(`/${id}`)
      .then(() => {
        setView(view.filter(item => item.id !== id));
        alert("Data deleted");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

 
  const onSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === '' || amount === 0) {
      alert("Please Enter a Valid Text and Amount");
    } else {
      alert("Transaction Added Successfully!");

      const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: +amount
      };

      addTransaction(newTransaction);

      
      axios.post(mockApiurl, newTransaction)
        .then((response) => {
          setView([...view, response.data]); // Add new transaction to state
        })
        .catch((error) => {
          console.error("Error adding transaction:", error);
        });

      // Clear the form fields after submission
      setText('');
      setAmount(0);
    }
  };

  return (
    <>
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Text..."
          />
        </div>

        <div className="form-control">
          <label htmlFor="amount">
            Amount<br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount..."
          />
        </div>

        <button className="btn" type="submit">Add Transaction</button>
      </form>

      <h3>Existing Transactions</h3>
      <div className="input2">
        <table className="data-table">
          <thead>
            <tr>
              <th>Text</th>
              <th>Amount</th>
              <th>History</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {view.map((item) => (
              <tr key={item.id}>
                <td>{item.text}</td>
                <td>{item.amount}</td>
                <td>{item.history || 'No history available'}</td> 
                <td>
                  <button className="delete-button" onClick={() => del(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
