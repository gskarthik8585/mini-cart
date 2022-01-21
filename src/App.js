
import Header from './components/header'
import Layout from './components/layout'
import { GlobalProvider } from './context'
import './App.css';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Header />
        <Layout />
      </GlobalProvider>
    </div>
  );
}

export default App;
