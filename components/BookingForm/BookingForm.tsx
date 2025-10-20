'use client';

import React, { useState } from 'react';
import styles from './BookingForm.module.css';
import Button from '../UI/Buttons/Button';
import DatePicker from 'react-datepicker';
// import { uk } from 'date-fns/locale/uk';
// import { registerLocale } from 'react-datepicker';

// registerLocale('uk', uk);
// import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = () => {
  const [date, setDate] = useState<Date | null>(null);
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
      <span className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </span>
      <div className={styles.inputWrapper}>
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
        {/* <button className={styles.dateInput}> */}
        <DatePicker
          selected={date}
          onChange={setDate}
          dateFormat="dd.mm.yyyy"
          placeholderText="Booking date*"
          isClearable
          formatWeekDay={name => name.substr(0, 3)}
          locale="uk"
          className={styles.dateInput}
        />
        {/* </button> */}
        {/* <input
          className={styles.dateInput}
          name="date"
          required
          placeholder="Booking date*"
          type="text"
          pattern="\d{2}\.\d{2}\.\d{4}"
          onFocus={e => (e.currentTarget.type = 'date')}
          onBlur={e =>
            (e.currentTarget.type = e.currentTarget.value ? 'date' : 'text')
          }
          value={fields.date}
          onChange={handleChange}
        /> */}
        <textarea
          className={styles.commentInput}
          name="comment"
          placeholder="Comment"
          value={fields.comment}
          onChange={handleChange}
        />
      </div>
      <Button>Send</Button>
    </form>
  );
};

export default BookingForm;
