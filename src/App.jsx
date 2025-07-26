import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './components/Dashboard';
import LiftsPage from './components/Lifts';
import Items from './components/Items';
import CustomerLicense from './components/CustomerLicense';
import AMC from './components/AMC';
import ThisMonthExpire from './components/ThisMonthExpire';
import NextMonthExpire from './components/NextMonthExpire';
import LastMonthExpire from './components/LastMonthExpire';
import Customers from './components/Customers';
import DeliveryChallan from './components/DeliveryChallan';
import QuotationTable from './components/QuotationTable';
import Orders from './components/Orders';
import Invoice from './components/Invoice';
import PaymentRecieved from './components/PaymentRecieved';
import RecurringInvoices from './components/RecurringInvoices';
import CreditNotes from './components/CreditNotes';
import RoutineServices from './components/RoutineServices';
import TodayServices from './components/TodayServices';
import RouteWiseServices from './components/RouteWiseServices';
import ThisMonthServices from './components/ThisMonthServices';
import LastMonthServices from './components/LastMonthServices';
import ThisMonthOverdue from './components/ThisMonthOverdue';
import LastMonthOverdue from './components/LastMonthOverdue';
import ThisMonthCompleted from './components/ThisMonthCompleted';
import LastMonthCompleted from './components/LastMonthCompleted';
import PendingAssignServices from './components/PendingAssignServices';
import NewItemForm from './components/Forms/NewItemForm';

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
          <Route path="/next-month" element={<NextMonthExpire />} />
          <Route path="/last-month" element={<LastMonthExpire />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/delivery-challan" element={<DeliveryChallan />} />
          <Route path="/quotation" element={<QuotationTable />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/payment-received" element={<PaymentRecieved />} />
          <Route path="/recurring-invoices" element={<RecurringInvoices />} />
          <Route path="/credit-notes" element={<RecurringInvoices />} />
          <Route path="/routine-services" element={<RoutineServices />} />
          <Route path="/today-services" element={<TodayServices />} />
          <Route path="/route-wise-services" element={<RouteWiseServices />} />
          <Route path="/this-month-services" element={<ThisMonthServices />} />
          <Route path="/last-month-services" element={<LastMonthServices />} />
          <Route path="/this-month-overdue" element={<ThisMonthOverdue />} />
          <Route path="/last-month-overdue" element={<LastMonthOverdue />} />
          <Route path="/this-month-completed" element={<ThisMonthCompleted />} />
          <Route path="/last-month-completed" element={<LastMonthCompleted />} />
          <Route path="/pending-assign" element={<PendingAssignServices />} />
        </Route>
        
        {/* Add non-dashboard routes without the layout */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;