import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div>
      <h1>Hottest100.io</h1>

      <h2>Get Started</h2>
      <ol>
        <li>Step 1</li>
        <li>Step 2</li>
        <li>Step 3</li>
        <li>Step 4</li>
        <li>Review the <Link to="2016">LETS DO THIS</Link></li>
      </ol>
    </div>
  );
};

export default HomePage;
