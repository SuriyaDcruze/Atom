import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './components/Dashboard';
import LiftsPage from './components/Lifts';
import Items from './components/Items';
import CustomerLicense from './components/CustomerLicense';
import AMC from './components/AMC';
import ThisMonthExpire from './components/ThisMonthExpire';

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap dashboard routes with the layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/lifts" element={<LiftsPage />} />
          <Route path="/items" element={<Items />} />
          <Route path="/customer-license" element={<CustomerLicense />} />
          <Route path="/amc" element={<AMC />} />
          <Route path="/this-month" element={<ThisMonthExpire />} />
          <Route path="/next-month" element={<ThisMonthExpire />} />
          <Route path="/last-month" element={<ThisMonthExpire />} />
        </Route>
        
        {/* Add non-dashboard routes without the layout */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;