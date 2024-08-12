import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/tasks" 
              element={
                <PrivateRoute>
                  <TaskList />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;