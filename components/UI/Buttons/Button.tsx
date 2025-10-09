import styles from './Button.module.css';

import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick}>{children || 'Click me'}</button>
);

export default Button;
// const Button = () => {
//   return <button className={styles.btn}>View Now</button>;
// };

// export default Button;
