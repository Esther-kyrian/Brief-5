import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/tasks', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Failed to fetch tasks', error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>{task.title}</div>
            ))}
        </div>
    );
}

export default TaskList;