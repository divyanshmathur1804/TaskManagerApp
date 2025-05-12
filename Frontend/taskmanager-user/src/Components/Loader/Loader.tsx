import { Spin } from "antd";
import React from "react";

export const Loader: React.FC = () => {
    return(
        <Spin size="large" style={styles.container}></Spin>
    )
}
const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',  // Full viewport height
    },
  };