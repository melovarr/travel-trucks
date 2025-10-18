'use client';

import React from 'react';
import { useCamperReviews } from '../../lib/hooks';
import Loading from 'components/app/loading';
import styles from './ReviewsList.module.css';

export default function ReviewsList({ camperId }: { camperId: string }) {
  const { data: reviews, isLoading, error } = useCamperReviews(camperId);

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading reviews.</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className={styles.reviewsWrapper}>
      {reviews.map((item, idx) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontWeight: 'bold',
                background: '#F2F4F7',
                borderRadius: '50%',
                color: '#e44848',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                fontSize: 18,
              }}
            >
              {item.reviewer_name[0]}
            </span>
            <div>
              <p style={{ fontWeight: 600, margin: 0 }}>{item.reviewer_name}</p>
              <span style={{ color: '#FFC531' }}>
                {'★'.repeat(item.reviewer_rating)}
                <span style={{ color: '#F2F4F7' }}>
                  {'★'.repeat(5 - item.reviewer_rating)}
                </span>
              </span>
            </div>
          </div>
          <p style={{ marginTop: 16, color: '#475467' }}>{item.comment}</p>
        </div>
      ))}
    </div>
  );
}

// import React from 'react';

// const reviews = [
//   {
//     author: 'Alice',
//     rating: 5,
//     comment:
//       'The Mavericks panel truck was a perfect choice for my solo road trip...',
//   },
//   {
//     author: 'Bob',
//     rating: 3,
//     comment:
//       'A decent option for solo travel. The Mavericks provided a comfortable stay...',
//   },
// ];

// const ReviewsList = () => (
//   <div>
//     {reviews.map((item, idx) => (
//       <div key={idx} style={{ marginBottom: 18 }}>
//         <span
//           style={{
//             fontWeight: 'bold',
//             background: '#F2F4F7',
//             borderRadius: 30,
//             color: '#e44848',
//             display: 'inline-block',
//             width: 32,
//             height: 32,
//             textAlign: 'center',
//             lineHeight: '32px',
//             marginRight: 12,
//           }}
//         >
//           {item.author[0]}
//         </span>
//         <span style={{ fontWeight: 600 }}>{item.author}</span>
//         <span style={{ color: '#E2E6E9', margin: '0 8px' }}>
//           {'★'.repeat(item.rating)}
//           {'☆'.repeat(5 - item.rating)}
//         </span>
//         <div style={{ marginTop: 6, color: '#475467' }}>{item.comment}</div>
//       </div>
//     ))}
//   </div>
// );

// export default ReviewsList;
