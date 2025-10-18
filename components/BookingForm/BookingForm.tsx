'use client';

import React, { useState } from 'react';
import styles from './BookingForm.module.css';
import Button from '../UI/Buttons/Button';

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
    <form onSubmit={handleSubmit} className={styles.bookingForm}>
      <b className={styles.formTitle}>Book your campervan now</b>
      <span style={{ color: '#888', fontSize: 14 }}>
        Stay connected! We are always ready to help you.
      </span>
      <input
        className={styles.nameInput}
        name="name"
        required
        placeholder="Name*"
        value={fields.name}
        onChange={handleChange}
      />
      <input
        className={styles.emailInput}
        name="email"
        required
        placeholder="Email*"
        type="email"
        value={fields.email}
        onChange={handleChange}
      />
      <input
        className={styles.dateInput}
        name="date"
        required
        placeholder="Booking date*"
        type="date"
        value={fields.date}
        onChange={handleChange}
      />
      <textarea
        className={styles.commentInput}
        name="comment"
        placeholder="Comment"
        value={fields.comment}
        onChange={handleChange}
      />
      <Button>Send</Button>
    </form>
  );
};

export default BookingForm;
