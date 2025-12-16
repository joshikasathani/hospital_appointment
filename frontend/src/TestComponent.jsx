import React from 'react';

const TestComponent = () => {
  return (
    <div style={{ backgroundColor: 'red', padding: '20px', color: 'white' }}>
      <h1>Test Component - If you see this, React is working!</h1>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default TestComponent;
