import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../pages/App';
import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
const PageRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default PageRouter;
