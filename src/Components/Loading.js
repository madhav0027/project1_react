// src/components/Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
      <p>Loading...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  loader: {
    border: '16px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '16px solid #3498db',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default Loading;
