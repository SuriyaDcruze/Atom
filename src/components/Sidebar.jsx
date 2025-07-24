import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Settings,
  Package,
  FileText,
  Calendar,
  DollarSign,
  Wrench,
  AlertCircle,
  BarChart2,
  CalendarCheck,
  ClipboardList,
  Warehouse,
  FileBarChart2,
  User,
  LogOut,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import logo from '/logo.png';

const Sidebar = ({ isCollapsed, toggleSidebar, isMobile }) => {
  const location = useLocation();
  const [amcExpanded, setAmcExpanded] = useState(false);
  
  const menuItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/', key: 'dashboard' },
    { name: 'Lifts', icon: <Settings className="h-5 w-5" />, path: '/lifts', key: 'lifts' },
    { name: 'Items', icon: <Package className="h-5 w-5" />, path: '/items', key: 'items' },
    { name: 'Customer License', icon: <FileText className="h-5 w-5" />, path: '/customer-license', key: 'customer-license' },
    { 
      name: 'AMC', 
      icon: <Calendar className="h-5 w-5" />, 
      path: '/amc', 
      key: 'amc',
      subItems: [
        { name: 'AMC', path: '/amc', key: 'amc-all' },
        { name: 'This Month Expire', path: '/this-month', key: 'amc-this-month' },
        { name: 'Last Month Expire', path: '/last-month', key: 'amc-last-month' },
        { name: 'Next Month Expire', path: '/next-month', key: 'amc-next-month' }
      ]
    },
    { name: 'Sales', icon: <DollarSign className="h-5 w-5" />, path: '/sales', key: 'sales' },
    { name: 'Routine Services', icon: <Wrench className="h-5 w-5" />, path: '/routine-services', key: 'routine-services' },
    { name: 'Complaints', icon: <AlertCircle className="h-5 w-5" />, path: '/complaints', key: 'complaints' },
    { name: 'Monthly Load', icon: <BarChart2 className="h-5 w-5" />, path: '/monthly-load', key: 'monthly-load' },
    { name: 'Services Schedule', icon: <CalendarCheck className="h-5 w-5" />, path: '/services-schedule', key: 'services-schedule' },
    { name: 'Material Request', icon: <ClipboardList className="h-5 w-5" />, path: '/material-request', key: 'material-request' },
    { name: 'Inventory', icon: <Warehouse className="h-5 w-5" />, path: '/inventory', key: 'inventory' },
    { name: 'Reports', icon: <FileBarChart2 className="h-5 w-5" />, path: '/reports', key: 'reports' }
  ];

  const toggleAmcExpand = () => {
    setAmcExpanded(!amcExpanded);
  };

  const isAmcActive = location.pathname.startsWith('/amc');

  return (
    <div className={`
      h-full bg-white text-gray-800 flex flex-col
      ${isCollapsed ? 'w-14' : 'w-56'} 
      ${isMobile ? 'fixed z-50' : 'relative'}
      transition-all duration-300
      border-r border-gray-200
      shadow-sm
    `}>
      {/* Logo Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-center h-16">
        {isCollapsed ? (
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
        ) : (
          <img src={logo} alt="Company Logo" className="h-12 object-contain" />
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.key}>
              {item.subItems ? (
                <>
                  <div
                    onClick={toggleAmcExpand}
                    className={`
                      flex items-center p-3 mx-2 rounded-md cursor-pointer
                      hover:bg-orange-600 transition-colors duration-200
                      ${isCollapsed ? 'justify-center' : 'px-4 justify-between'}
                      ${isAmcActive ? 'bg-orange-500 text-white' : ''}
                    `}
                  >
                    <div className="flex items-center">
                      <span className={`${isCollapsed ? '' : 'mr-3'} ${isAmcActive ? 'text-white' : 'text-gray-600'}`}>
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <span className="whitespace-nowrap text-sm font-medium">
                          {item.name}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && (
                      amcExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                  
                  {(!isCollapsed && amcExpanded) && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.key}>
                          <Link
                            to={subItem.path}
                            onClick={() => isMobile && toggleSidebar()}
                            className={`
                              flex items-center p-2 pl-3 rounded-md
                              hover:bg-orange-600 transition-colors duration-200
                              ${location.pathname === subItem.path ? 'bg-orange-500 text-white' : ''}
                            `}
                          >
                            <span className="whitespace-nowrap text-sm font-medium">
                              {subItem.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => isMobile && toggleSidebar()}
                  className={`
                    flex items-center p-3 mx-2 rounded-md
                    hover:bg-orange-600 transition-colors duration-200
                    ${isCollapsed ? 'justify-center' : 'px-4'}
                    ${location.pathname === item.path ? 'bg-orange-500 text-white' : ''}
                  `}
                >
                  <span className={`${isCollapsed ? '' : 'mr-3'} text-gray-600 ${location.pathname === item.path ? 'text-white' : ''}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="whitespace-nowrap text-sm font-medium">
                      {item.name}
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Links */}
      <div className="p-2 border-t border-gray-200">
        <Link
          to="/profile"
          onClick={() => isMobile && toggleSidebar()}
          className={`
            flex items-center p-3 mx-2 rounded-md hover:bg-orange-600
            ${isCollapsed ? 'justify-center' : 'px-4'}
            ${location.pathname === '/profile' ? 'bg-orange-500 text-white' : ''}
          `}
        >
          <User className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-gray-600 ${location.pathname === '/profile' ? 'text-white' : ''}`} />
          {!isCollapsed && <span className="text-sm font-medium">Profile</span>}
        </Link>
        <Link
          to="/logout"
          onClick={() => isMobile && toggleSidebar()}
          className={`
            flex items-center p-3 mx-2 rounded-md hover:bg-orange-600
            ${isCollapsed ? 'justify-center' : 'px-4'}
            ${location.pathname === '/logout' ? 'bg-orange-500 text-white' : ''}
          `}
        >
          <LogOut className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-gray-600 ${location.pathname === '/logout' ? 'text-white' : ''}`} />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;