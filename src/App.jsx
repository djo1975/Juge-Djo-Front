import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SplashPage from './pages/SplashPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Details from './pages/Details';
import NavigationPanel from './components/Navbar';
import AddRoom from './pages/AddRoom';
import MyReservations from './pages/MyReservations';
import AddReservations from './pages/AddReservations';

import { roomApi } from './redux/roomAPI';
import { setHasInitialDataFetched } from './redux/authSlice';

const App = () => {
  const dispatch = useDispatch();

  const hasInitialDataFetched = useSelector((state) => state.persistedReducer.hasInitialDataFetched);

  useEffect(() => {
    if (!hasInitialDataFetched) {
      dispatch(roomApi.endpoints.getAllRooms.initiate());
      dispatch(roomApi.endpoints.getAllReservations.initiate());
      dispatch(roomApi.endpoints.getAllComments.initiate());
      dispatch(setHasInitialDataFetched());
    }
  }, [hasInitialDataFetched, dispatch]);

  const location = useLocation();
  const isHomeOrDetails = location.pathname === '/home' || location.pathname === '/details';

  return (
    <>
      {isHomeOrDetails && <NavigationPanel />}
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/addroom" element={<AddRoom />} />
        <Route path="/myreservations" element={<MyReservations />} />
        <Route path="/reserve" element={<AddReservations />} />
      </Routes>
    </>
  );
}

export default App;
