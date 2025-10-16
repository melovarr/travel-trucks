'use client';

import React, { useState } from 'react';

const BookingForm = () => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Місце для handle booking
    alert('Booking request sent!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <b>Book your campervan now</b>
      <span style={{ color: '#888', fontSize: 14 }}>
        Stay connected! We are always ready to help you.
      </span>
      <input
        name="name"
        required
        placeholder="Name*"
        value={fields.name}
        onChange={handleChange}
      />
      <input
        name="email"
        required
        placeholder="Email*"
        type="email"
        value={fields.email}
        onChange={handleChange}
      />
      <input
        name="date"
        required
        placeholder="Booking date*"
        type="date"
        value={fields.date}
        onChange={handleChange}
      />
      <textarea
        name="comment"
        placeholder="Comment"
        value={fields.comment}
        onChange={handleChange}
      />
      <button
        type="submit"
        style={{
          background: '#e44848',
          color: '#fff',
          borderRadius: 20,
          padding: 10,
        }}
      >
        Send
      </button>
    </form>
  );
};

export default BookingForm;
