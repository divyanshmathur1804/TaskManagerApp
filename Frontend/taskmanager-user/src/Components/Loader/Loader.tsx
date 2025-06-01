import { Spin } from "antd";
import React from "react";

export const Loader: React.FC = () => {
  return (
    <div style={styles.container}>
      <Spin size="large" />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    width: '100vw',  // Optional: ensure full width
    backgroundColor: '#fff', // Optional: background while loading
  },
};
