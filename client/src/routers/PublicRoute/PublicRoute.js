import { Navigate } from 'react-router-dom';

import useAuth from '../../contexts/useAuth';

import Loading from '../../components/Loading';

const PublicRoute = ({ component: Component }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return <>{user ? <Navigate to="/" /> : <Component />}</>;
};

export default PublicRoute;
