import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import './TaskList.css';
import { updateTaskStatus } from '../services/api';

const TaskList = ({ tasks, loading, onUpdateTask, onDeleteTask, onFilterChange, filters }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ search: value });
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    onFilterChange({ status });
  };

  const handlePriorityFilter = (priority) => {
    setPriorityFilter(priority);
    onFilterChange({ priority });
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      await onUpdateTask(taskId, { status: newStatus });
      toast.success('Task status updated!');
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDeleteTask(taskId);
        toast.success('Task deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="task-list-page">
      <div className="task-list-header">
        <div>
          <h1 className="page-title">Tasks</h1>
          <p className="page-subtitle">Manage and organize your tasks</p>
        </div>
      </div>

      <div className="task-filters">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <FiFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => handlePriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {tasks.length > 0 ? (
        <div className="tasks-grid">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                className="task-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="task-card-header">
                  <div className="task-badges">
                    <span className={`badge badge-${task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'info'}`}>
                      {task.status}
                    </span>
                    <span className={`badge badge-${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'info'}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="action-btn action-btn-edit"
                      onClick={() => handleEdit(task.id)}
                      aria-label="Edit task"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="action-btn action-btn-delete"
                      onClick={() => handleDelete(task.id)}
                      aria-label="Delete task"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className="task-card-body">
                  <h3 className="task-card-title">{task.title}</h3>
                  <p className="task-card-description">{task.description}</p>
                </div>

                <div className="task-card-footer">
                  <span className="task-date">
                    {format(new Date(task.createdAt), 'MMM dd, yyyy')}
                  </span>
                  {task.status !== 'completed' && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleStatusChange(task.id, task.status === 'pending' ? 'in-progress' : 'completed')}
                    >
                      <FiCheck />
                      {task.status === 'pending' ? 'Start' : 'Complete'}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <FiCheck className="empty-state-icon" />
            <h3 className="empty-state-title">No tasks found</h3>
            <p className="empty-state-text">Try adjusting your filters or create a new task</p>
            <button onClick={() => navigate('/tasks/new')} className="btn btn-primary">
              Create Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;