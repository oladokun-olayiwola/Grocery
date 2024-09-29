import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
  const [prices, setPrices] = useState({});
  const [amounts, setAmounts] = useState({});

  // Handle Price Input Change
  const handlePriceChange = (id, price) => {
    setPrices({ ...prices, [id]: parseFloat(price) || 0 });
  };

  // Handle Amount Input Change
  const handleAmountChange = (id, amount) => {
    setAmounts({ ...amounts, [id]: parseInt(amount) || 0 });
  };

  // Calculate total price based on prices and amounts
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = prices[item.id] || 0;
      const amount = amounts[item.id] || 1;
      return total + price * amount;
    }, 0);
  };

  return (
    <div className='grocery-list'>
      <div className='cost-header'>
        <p className='header title'>Item</p>
        <p className='header price'>Price</p>
        <p className='header amount'>Amount</p>
      </div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className='grocery-item' key={id}>
            <p className='title'>{title}</p>
            <div className='input-container'>
              <input
                type='number'
                className='price'
                placeholder='#'
                onChange={(e) => handlePriceChange(id, e.target.value)}
              />
            </div>
            <div className='input-container'>
              <input
                type='number'
                className='amount'
                min='1'
                defaultValue='1'
                onChange={(e) => handleAmountChange(id, e.target.value)}
              />
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
      <p className='total'>Total: #{calculateTotal().toFixed(2)}</p>
    </div>
  );
};

export default List;
