import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginCheck } from '../hooks/useLoginCheck';
import '../styles/App.css';

const App = () => {
  const isLogin = useLoginCheck();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate('/signin');
    }
  }, [isLogin, navigate]);
  return <div className="App">Loding...</div>;
};

export default App;
