import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider} from 'react-query'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from './table';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="table" element={<Table />} />
              </Routes>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
