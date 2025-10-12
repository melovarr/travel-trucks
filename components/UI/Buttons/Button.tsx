import styles from './Button.module.css';

import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => (
  <button onClick={onClick} className={styles.btn} disabled={disabled}>
    {children || 'Click me'}
  </button>
);

export default Button;
// const Button = () => {
//   return <button className={styles.btn}>View Now</button>;
// };

// export default Button;
