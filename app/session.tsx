// pages/index.tsx
import { getSessionFromLocalStorage } from '../utils/localStorageUtils';
import { useSession } from 'next-auth/react';

const HomePage = () => {
  const { data: session, status } = useSession();
  const storedSession = getSessionFromLocalStorage();

  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : session || storedSession ? (
        <div>
          <h1>Welcome, {session?.user?.name || storedSession?.user?.name}</h1>
          {/* Render additional user-specific content */}
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

export default HomePage;
