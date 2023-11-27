import React, { useState } from 'react'

import './Expense.css'
import { FaArrowAltCircleDown, FaCheck, FaTimes } from 'react-icons/fa'

const Expense = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 2,
      title: 'Lunch',
      amount: 30,
      name: 'Parshu',
    },
    {
      id: 3,
      title: 'Breakfast',
      amount: 100,
      name: 'Partheev',
    },
  ])
  const [settledExpenses, setSettledExpenses] = useState([
    {
      id: 2,
      title: 'Lunch',
      amount: 30,
      name: 'Parshu',
    },
    {
      id: 3,
      title: 'Breakfast',
      amount: 100,
      name: 'Partheev',
    },
    {
      id: 4,
      title: 'Dinner',
      amount: 130,
      name: 'Bargav',
    },
    {
      id: 5,
      title: 'Tea',
      amount: 300,
      name: 'Poori',
    },
    {
      id: 5,
      title: 'Tea',
      amount: 300,
      name: 'Poori',
    },
  ])

  const handleSettle = (expense) => {
    const updatedExpenses = expenses.filter((e) => e.id !== expense.id)
    setExpenses(updatedExpenses)

    setSettledExpenses([...settledExpenses, expense])
  }

  const toggleDetails = (expenseId) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === expenseId
          ? { ...expense, showDetails: !expense.showDetails }
          : expense
      )
    )
  }

  return (
    <div className="expense-page">
      <div className="right-section">
        <center>
          <h3>You Owe</h3>
        </center>
        {settledExpenses.map((expense) => (
          <div className="expense-card" key={expense.id}>
            <div className="expense-header">
              <div style={{ width: '40px' }}>{expense.title}</div>
              <div style={{ width: '20px' }}>${expense.amount}</div>
              <div style={{ width: '40px' }}>{expense.name}</div>
              <button
                title="click to settle"
                className="settle-button"
                onClick={() => handleSettle(expense)}
              >
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
              <div style={{ width: '40px' }}>{expense.title}</div>
              <div style={{ width: '20px' }}>${expense.amount}</div>
              <div style={{ width: '40px' }}>{expense.name}</div>
              <button
                title="click to settle"
                className="settle-button"
                onClick={() => handleSettle(expense)}
              >
                <FaCheck />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Expense
