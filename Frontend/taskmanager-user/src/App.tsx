import './App.css';
import { AppRouter } from './router/AppRouter';
import { ConfigProvider } from 'antd';

function App() {
  return(
    <ConfigProvider>
    <AppRouter/>
    </ConfigProvider>
  )
}

export default App;
