import { AppProvider } from 'Context/ContextProvider';
import './App.css';
import { AppRouter } from './router/AppRouter';
import { ConfigProvider } from 'antd';

function App() {
  return(
    <ConfigProvider>
      <AppProvider>
    <AppRouter/>
    </AppProvider>
    </ConfigProvider>
  )
}

export default App;
