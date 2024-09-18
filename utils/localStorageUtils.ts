// utils/localStorageUtils.ts
export const getSessionFromLocalStorage = () => {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  };
   