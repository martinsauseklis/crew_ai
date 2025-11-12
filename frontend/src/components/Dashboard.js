import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiClock, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = ({ tasks, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: <FiCheckSquare />,
      color: 'primary',
      change: '+12%'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: <FiClock />,
      color: 'warning',
      change: '+5%'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <FiTrendingUp />,
      color: 'success',
      change: `${completionRate}%`
    },
    {
      title: 'High Priority',
      value: stats.highPriority,
      icon: <FiAlertCircle />,
      color: 'danger',
      change: stats.highPriority > 0 ? 'Attention' : 'None'
    },
  ];

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Overview of your tasks and progress</p>
        </div>
        <Link to="/tasks/new" className="btn btn-primary">
          Create New Task
        </Link>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className={`stat-card stat-card-${stat.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.title}</p>
            </div>
            <div className="stat-change">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Recent Tasks</h2>
              <Link to="/tasks" className="btn btn-sm btn-outline">View All</Link>
            </div>
            <div className="card-body">
              {recentTasks.length > 0 ? (
                <div className="task-list-simple">
                  {recentTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      className="task-item-simple"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="task-info">
                        <h4 className="task-title-simple">{task.title}</h4>
                        <p className="task-description-simple">{task.description}</p>
                      </div>
                      <div className="task-meta">
                        <span className={`badge badge-${task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'info'}`}>
                          {task.status}
                        </span>
                        <span className={`badge badge-${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'info'}`}>
                          {task.priority}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FiCheckSquare className="empty-state-icon" />
                  <h3 className="empty-state-title">No tasks yet</h3>
                  <p className="empty-state-text">Create your first task to get started</p>
                  <Link to="/tasks/new" className="btn btn-primary">Create Task</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Progress Overview</h2>
            </div>
            <div className="card-body">
              <div className="progress-section">
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Completion Rate</span>
                    <span className="progress-value">{completionRate}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${completionRate}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                
                <div className="status-breakdown">
                  <div className="status-item">
                    <span className="status-label">Pending</span>
                    <span className="status-count">{stats.pending}</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">In Progress</span>
                    <span className="status-count">{stats.inProgress}</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Completed</span>
                    <span className="status-count">{stats.completed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;