import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {SearchPage} from './containers/SearchPage';
import {DrugPage} from './containers/DrugPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/drugs/search" element={<SearchPage />} />
          <Route path="/drugs/:drugName" element={<DrugPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
