'use client';

import React, { useState } from 'react';
import FeaturesPanel from '../../../components/FeaturesPanel/FeaturesPanel';
import ReviewsList from '../../../components/ReviewsList/ReviewsList';
import BookingForm from '../../../components/BookingForm/BookingForm';
import { useParams } from 'next/navigation';

const CamperDetailsTabs = () => {
  const [tab, setTab] = useState<'features' | 'reviews'>('features');
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid #eee', gap: 30 }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            // borderBottom: tab === 'features' ? '3px solid #e44848' : 'none',
            fontWeight: tab === 'features' ? 700 : 400,
            cursor: 'pointer',
          }}
          onClick={() => setTab('features')}
        >
          Features
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            // borderBottom: tab === 'reviews' ? '3px solid #e44848' : 'none',
            fontWeight: tab === 'reviews' ? 700 : 400,
            cursor: 'pointer',
          }}
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
        <div style={{ flex: 1 }}>
          {tab === 'features' ? (
            <FeaturesPanel />
          ) : (
            <ReviewsList camperId={id} />
          )}
        </div>
        <div
          style={{
            flex: '0 0 380px',
            border: '1px solid #ececec',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsTabs;
