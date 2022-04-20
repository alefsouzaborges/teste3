import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import { useEffect} from 'react';

import PagesProvider from './Pages/Context/contextPages';

function App() {
  useEffect(() =>{

  },[])
  return (
    <div>
      <PagesProvider>
          <Routes/>
      </PagesProvider>
    </div>
  );
}

export default App;

