// import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import LoginForm from '../components/LoginForm';
import LoginCard from '../components/LoginCard'

// import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
    console.log(Auth.loggedIn())
    console.log(Auth.getToken())
  return (
    <main>
      <div>
        <div>
          {Auth.loggedIn() ? (
            <div>
                <div><Link onClick={Auth.logout}>logout</Link></div>
                </div>
          ):(
            <div>
                <div><LoginCard /></div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;