'use client';

import React, { useState } from 'react';
import FeaturesPanel from '../../../components/FeaturesPanel/FeaturesPanel';
import ReviewsList from '../../../components/ReviewsList/ReviewsList';
import BookingForm from '../../../components/BookingForm/BookingForm';
import { useParams } from 'next/navigation';
import styles from './CamperDetails.module.css';

const CamperDetailsTabs = () => {
  const [tab, setTab] = useState<'features' | 'reviews'>('features');
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid #eee', gap: 30 }}>
        <button
          className={`${styles.featuresBtn} ${tab === 'features' ? styles.active : ''}`}
          onClick={() => setTab('features')}
        >
          Features
        </button>
        <button
          className={`${styles.featuresBtn} ${tab === 'reviews' ? styles.active : ''}`}
          onClick={() => setTab('reviews')}
        >
          Reviews
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 32,
          alignItems: 'flex-start',
          marginTop: 24,
        }}
      >
        <div className={styles.featuresReviewsWrapper}>
          {tab === 'features' ? (
            <FeaturesPanel camperId={id} />
          ) : (
            <ReviewsList camperId={id} />
          )}
        </div>
        <div className={styles.formWrapper}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsTabs;
