import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const DisplayCookies = () => {
  // Access all cookies using the useCookies hook
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    // Log all cookies (you can also access specific cookies if needed)
    console.log('All cookies:', cookies);
  }, [cookies]);

  return (
    <div>
      <h1>All Cookies</h1>
      <pre>{JSON.stringify(cookies, null, 2)}</pre>
    </div>
  );
};

export default DisplayCookies;
