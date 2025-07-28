import { useState } from 'react';
import { User, DollarSign, AlertTriangle, FileText, Wrench } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('October');

  const stats = [
    { title: 'AMC Due', value: 104, change: '8.5% Up', trend: 'up', icon: <User className="w-6 h-6 text-purple-500" /> },
    { title: 'Income', value: 10293, change: '1.3% Up', trend: 'up', icon: <DollarSign className="w-6 h-6 text-yellow-500" /> },
    { title: 'Open Complaints', value: '12/26', change: '4.3% Down', trend: 'down', icon: <AlertTriangle className="w-6 h-6 text-green-500" /> },
    { title: 'Open Invoice', value: '13/76', change: '1.8% Up', trend: 'up', icon: <FileText className="w-6 h-6 text-orange-500" /> },
    { title: 'Customer', value: 534, change: '8.5% Up', trend: 'up', icon: <User className="w-6 h-6 text-purple-500" /> },
    { title: 'Complaint', value: 238, change: '1.3% Up', trend: 'up', icon: <AlertTriangle className="w-6 h-6 text-yellow-500" /> },
  ];

  const complaints = [
    { subject: 'Call book admin', assignedTo: 'Gopinath D', status: 'Closed', created: '02/07/2025 3:04PM' },
  ];

  // Mock data for the graph
  const graphData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [50, 75, 60, 80, 65, 90, 70],
        borderColor: 'rgb(0, 149, 255)',
        backgroundColor: 'rgba(0, 149, 255, 0.2)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(0, 149, 255)',
      },
      {
        label: 'Dataset 2',
        data: [60, 80, 70, 85, 75, 95, 80],
        borderColor: 'rgb(0, 255, 149)',
        backgroundColor: 'rgba(0, 255, 149, 0.2)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(0, 255, 149)',
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 25 },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4 border border-gray-100">
            {stat.icon}
            <div>
              <h3 className="text-gray-500 font-medium text-sm">{stat.title}</h3>
              <div className="text-xl font-bold my-1">{stat.value}</div>
              <div className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} {stat.trend === 'up' ? '↑' : '↓'} from {index < 2 ? 'yesterday' : index < 4 ? 'yesterday' : 'past week'}
              </div>
            </div>
          </div>
        ))}
        <div className="bg-white p-4 rounded-lg shadow-sm col-span-2 sm:col-span-1 lg:col-span-2 flex items-center space-x-4 border border-gray-100">
          <Wrench className="w-6 h-6 text-gray-400" />
          <div>
            <h3 className="text-gray-500 font-medium text-sm">AMC Renew in Progress</h3>
            <div className="text-xl font-bold my-1">No AMC Renew in progress</div>
          </div>
        </div>
      </div>

      {/* Graph Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium text-sm">Graph Placeholder</h3>
          <div className="h-64">
            <Line data={graphData} options={graphOptions} />
          </div>
        </div>
      </div>

      {/* Complaints Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h3 className="text-gray-500 font-medium text-sm">New Complaints</h3>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 mt-2 sm:mt-0 w-full sm:w-auto"
          >
            <option value="October">October</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-xs">Print</th>
                <th className="p-2 text-xs">Subject</th>
                <th className="p-2 text-xs">Assigned to</th>
                <th className="p-2 text-xs">Status</th>
                <th className="p-2 text-xs">Created</th>
                <th className="p-2 text-xs">Solution</th>
                <th className="p-2 text-xs">Remark</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2"></td>
                  <td className="p-2 text-sm">{complaint.subject}</td>
                  <td className="p-2 text-sm">{complaint.assignedTo}</td>
                  <td className="p-2"><span className="text-green-500 bg-green-100 px-2 py-1 rounded-full text-xs">{complaint.status}</span></td>
                  <td className="p-2 text-sm">{complaint.created}</td>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;