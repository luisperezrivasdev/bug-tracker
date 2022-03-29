import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/useAuth';

import Dashboard from './pages/Dashboard';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute component={Dashboard} />} />

            <Route path="login" element={<PublicRoute component={LogIn} />} />

            <Route path="signup" element={<PublicRoute component={SignUp} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
