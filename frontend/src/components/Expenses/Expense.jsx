import React, { useState } from 'react';

import './Expense.css';
import { FaArrowAltCircleDown, FaCheck, FaTimes } from 'react-icons/fa';

const Expense = () => {
    const [expenses, setExpenses] = useState([
        {
            id: 1,
            title: 'Dinner',
            peopleCount: 3,
            amount: 80,
            showDetails: false, 
            details: [
                { name: 'John', individualAmount: 20, status: 'paid' },
                { name: 'Alice', individualAmount: 20, status: 'not paid' },
                { name: 'Bob', individualAmount: 20, status: 'paid' },
            ],
        },
        {
            id: 2,
            title: 'Trip',
            peopleCount: 2,
            amount: 900,
            showDetails: false, 
            details: [
                { name: 'Varun', individualAmount: 320, status: 'paid' },
                { name: 'Parshu', individualAmount: 30, status: 'not paid' },
            ],
        },
        
    ]);
    const [settledExpenses, setSettledExpenses] = useState([
        {
            id: 2,
            title: 'Lunch',
            amount: 30,
            name: "Parshu",
        },
        {
            id: 3,
            title: 'Breakfast',
            amount: 100,
            name: "Partheev",
        },
        {
            id: 4,
            title: 'Dinner',
            amount: 130,
            name: "Bargav",
        },
        {
            id: 5,
            title: 'Tea',
            amount: 300,
            name: "Poori",
        },

    ]);

    const handleSettle = (expense) => {
        
        const updatedExpenses = expenses.filter((e) => e.id !== expense.id);
        setExpenses(updatedExpenses);

        
        setSettledExpenses([...settledExpenses, expense]);
    };


    const toggleDetails = (expenseId) => {
        setExpenses(
            expenses.map((expense) =>
                expense.id === expenseId ? { ...expense, showDetails: !expense.showDetails } : expense
            )
        );
    };

    return (
        <div className="expense-page">
        <div className="right-section">
                <center>
                    <h3>You Owe</h3>
                </center>
                {settledExpenses.map((expense) => (
                    <div className="expense-card" key={expense.id}>
                        <div className="expense-header">
                            <div>{expense.title}</div>
                            <div>${expense.amount}</div>
                            <div>{expense.name}</div>
                            <button title='click to settle' className="settle-button" onClick={() => handleSettle(expense)}>
                                <FaCheck /> 
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="left-section">
                <center>
                    <h3>Owes You</h3>
                </center>
                {expenses.map((expense) => (
                    <div className="expense-card" key={expense.id}>
                        <div className="expense-header">
                            <div>{expense.title}</div>
                            <div>{expense.peopleCount} people</div>
                            <div>${expense.amount}</div>
                            <button title="know more" className="summary-button" onClick={() => toggleDetails(expense.id)}>
                                <FaArrowAltCircleDown /> 
                            </button>
                        </div>
                        {expense.showDetails && (
                            <div className="details-list">
                                {expense.details.map((detail) => (
                                    <div key={detail.name} className="details-item">
                                        <div>{detail.name}</div>
                                        <div>${detail.individualAmount}</div>
                                        <div>{detail.status === 'paid' ? <FaCheck style={{color :"green"}} /> : <FaTimes style={{color :"red"}}/>}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Expense;
