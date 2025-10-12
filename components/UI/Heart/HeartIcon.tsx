import React from 'react';
import styles from './HeartIcon.module.css';

type HeartIconProps = {
  selected: boolean;
  onClick: () => void;
};

const HeartIcon: React.FC<HeartIconProps> = ({ selected, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={`${styles.heart} ${selected ? styles.selected : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="24"
      height="24"
      role="button"
      tabIndex={0}
      aria-pressed={selected}
    >
      <path d="M20.42 4.58a5.5 5.5 0 0 0-7.78 0L12 5.22l-0.64-0.64a5.5 5.5 0 0 0-7.78 7.78l0.64 0.64L12 21.23l7.78-7.78 0.64-0.64a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
};

export default HeartIcon;
