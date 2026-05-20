import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Menu, X, Sun, Moon, Users, DollarSign, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import './App.css';

const salesData = [
  { month: 'Jan', sales: 4500 },
  { month: 'Feb', sales: 6200 },
  { month: 'Mar', sales: 5800 },
  { month: 'Apr', sales: 7200 },
  { month: 'May', sales: 8900 },
  { month: 'Jun', sales: 10200 },
];

const pieData = [
  { name: 'WordPress', value: 45, color: '#6366f1' },
  { name: 'React', value: 30, color: '#22d3ee' },
  { name: 'E-commerce', value: 25, color: '#a855f7' },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`admin-dashboard ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <motion.div 
        className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
      >
        <div className="sidebar-header">
          <h2>NexeAdmin</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {['Dashboard', 'Projects', 'Clients', 'Analytics', 'Settings'].map((item, i) => (
            <a 
              key={i}
              href="#"
              className={`nav-item ${activeMenu === item.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.toLowerCase())}
            >
              {item}
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="top-nav">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
          
          <div className="nav-right">
            <button className="icon-btn" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <div className="user-info">
              <img src="https://picsum.photos/id/64/40/40" alt="User" />
              <span>Arslan</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <h1>Welcome back, Arslan 👋</h1>
          <p className="subtitle">Here's what's happening with your projects</p>

          {/* Stats Cards */}
          <div className="stats-grid">
            {[
              { icon: Users, label: "Total Clients", value: "142", change: "+12%" },
              { icon: DollarSign, label: "Revenue", value: "$48,290", change: "+18%" },
              { icon: TrendingUp, label: "Projects", value: "37", change: "+5%" },
              { icon: Award, label: "Completion", value: "94%", change: "+2%" }
            ].map((stat, i) => (
              <motion.div key={i} className="stat-card" whileHover={{ y: -8 }}>
                <stat.icon size={32} />
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
                <span className="change positive">{stat.change}</span>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <div className="chart-card">
              <h3>Monthly Sales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#6366f1" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Project Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Projects Table */}
          <div className="table-card">
            <h3>Recent Projects</h3>
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["E-commerce Store", "Fashion Hub", "Completed", "100%"],
                  ["Coaching Website", "Sara Malik", "In Progress", "75%"],
                  ["LMS Platform", "Tech Academy", "In Progress", "45%"],
                ].map((row, i) => (
                  <tr key={i}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td><span className={`status ${row[2].toLowerCase()}`}>{row[2]}</span></td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;