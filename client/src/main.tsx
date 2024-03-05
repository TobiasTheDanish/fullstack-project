import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShirtList, LeagueList, ClubList, Navbar } from './components';
import App from './App';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <App /> }>
            <Route path="/leagues" element={<LeagueList />} />
            <Route path="/clubs" element={<ClubList />} />
            <Route path="/all-shirts" element={<ShirtList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)
