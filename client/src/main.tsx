import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShirtList, LeagueList, ClubList, Navbar, LeagueComponent, ClubComponent, Profile } from './components';
import App from './App';
import { getJWT } from './lib/utils';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  headers: {
    "Authorization": getJWT(),
  },
  cache: new InMemoryCache,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <App /> }>
            <Route path="/leagues" element={<LeagueList />}>
              <Route path=':id' element={<LeagueComponent />} />
            </Route>
            <Route path="/clubs" element={<ClubList />} >
              <Route path=':id' element={<ClubComponent />} />
            </Route>
            <Route path="/all-shirts" element={<ShirtList />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)
