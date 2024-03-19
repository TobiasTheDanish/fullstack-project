import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShirtList, LeagueList, ClubList, Navbar, LeagueComponent, ClubComponent, Profile } from './components';
import App from './App';
import { authManager } from './lib/utils';
import { SignInForm } from './components/auth/SignIn';
import { SignUpForm } from './components/auth/SignUp';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  headers: {
    "Authorization": authManager.getJWT(),
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
            <Route path='/sign-in' element={<SignInForm />} />
            <Route path='/sign-up' element={<SignUpForm /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)
