import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../css/add_new_project.css";

const EditProject = ({ onClose, onEditProject, projectToEdit }) => {
  const [projectData, setProjectData] = useState({
    name: "",
    client: "",
    clientEmail: "",
    clientPhone: "",
    type: "",
    requirements: "",
    deadline: "",
    earnings: "",
    status: "Pending",
    moneyEarned: 0,
  });

  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({ name: "", status: "Pending" });

  useEffect(() => {
    if (projectToEdit) {
      setProjectData({
        name: projectToEdit.name || "",
        client: projectToEdit.client || "",
        clientEmail: projectToEdit.clientEmail || "",
        clientPhone: projectToEdit.clientPhone || "",
        type: projectToEdit.type || "",
        requirements: projectToEdit.requirements || "",
        deadline: projectToEdit.deadline || "",
        earnings: projectToEdit.earnings || "",
        status: projectToEdit.status || "Pending",
        moneyEarned: projectToEdit.moneyEarned || 0,
      });
      setTasks(projectToEdit.tasks || []);
    }
  }, [projectToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const addTask = () => {
    if (currentTask.name.trim() === "") {
      alert("Task name cannot be empty");
      return;
    }

    const maxTaskId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    const newTask = {
      id: maxTaskId + 1,
      name: currentTask.name,
      status: currentTask.status,
    };

    setTasks([...tasks, newTask]);
    setCurrentTask({ name: "", status: "Pending" });
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleSubmit = () => {
    if (!projectData.name || !projectData.client || !projectData.type || !projectData.deadline) {
      alert("Please fill in all required fields (Project Name, Client, Type, Deadline)");
      return;
    }

    const updatedProject = {
      ...projectToEdit,
      name: projectData.name,
      client: projectData.client,
      clientEmail: projectData.clientEmail || "",
      clientPhone: projectData.clientPhone || "",
      type: projectData.type,
      requirements: projectData.requirements || "",
      deadline: projectData.deadline,
      status: projectData.status,
      earnings: Number(projectData.earnings) || 0,
      moneyEarned: Number(projectData.moneyEarned) || 0,
      tasks: tasks,
    };

    onEditProject(updatedProject);
    onClose();
  };

  return (
    <div className="add-project-container">
      <div className="add-project-main">
        <div className="add-project-header">
          <h2>Edit Project</h2>
        </div>
        <div className="add-project-body">
          <div className="form-group">
            <div className="inp">
              <label>Project Name *</label>
              <input
                type="text"
                name="name"
                value={projectData.name}
                onChange={handleInputChange}
                placeholder="Enter project name"
              />
            </div>
          </div>

          <div className="form-group">
            <h1>Client Information</h1>
            <div className="inner-group">
              <div className="inp">
                <label>Client *</label>
                <input
                  type="text"
                  name="client"
                  value={projectData.client}
                  onChange={handleInputChange}
                  placeholder="Enter client name"
                />
              </div>
              <div className="inp">
                <label>Client Email</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={projectData.clientEmail}
                  onChange={handleInputChange}
                  placeholder="Enter client email"
                />
              </div>
            </div>
            <div className="inp">
              <label>Client Phone</label>
              <input
                type="tel"
                name="clientPhone"
                value={projectData.clientPhone}
                onChange={handleInputChange}
                placeholder="Enter client phone"
              />
            </div>
          </div>

          <div className="form-group">
            <h1>Project Details</h1>
            <div className="inner-group">
              <div className="inp">
                <label>Deadline *</label>
                <input
                  type="date"
                  name="deadline"
                  value={projectData.deadline}
                  onChange={handleInputChange}
                />
              </div>

              <div className="inp">
                <label>Type *</label>
                <input
                  type="text"
                  name="type"
                  value={projectData.type}
                  onChange={handleInputChange}
                  placeholder="Enter project type"
                />
              </div>
            </div>

            <div className="inp">
              <label>Requirements</label>
              <input
                type="text"
                name="requirements"
                value={projectData.requirements}
                onChange={handleInputChange}
                placeholder="Enter project requirements"
              />
            </div>

            <div className="inp">
              <label>Status</label>
              <select
                name="status"
                value={projectData.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <h1>Financial Details</h1>
            <div className="inp">
              <label>Budget</label>
              <input
                type="number"
                name="earnings"
                value={projectData.earnings}
                onChange={handleInputChange}
                placeholder="Enter project budget"
              />
            </div>
          </div>

          <div className="form-group">
            <h1>Add Tasks</h1>
            <div className="task-input-container">
              <div className="inner-group">
                <div className="inp">
                  <label>Task Name</label>
                  <input
                    type="text"
                    name="name"
                    value={currentTask.name}
                    onChange={handleTaskInputChange}
                    placeholder="Enter task name"
                  />
                </div>
                <div className="inp">
                  <label>Task Status</label>
                  <select
                    name="status"
                    value={currentTask.status}
                    onChange={handleTaskInputChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <button type="button" className="add-task-btn" onClick={addTask}>
                + Add Task
              </button>
            </div>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Update Project
          </button>
        </div>
      </div>

      <div className="tasks-panel">
        <div className="tasks-panel-header">
          <h3>Tasks List ({tasks.length})</h3>
        </div>
        <div className="tasks-panel-body">
          {tasks.length > 0 ? (
            <div className="tasks-list">
              {tasks.map((task) => (
                <div key={task.id} className="task-item-preview">
                  <div className="task-info">
                    <span className="task-name">{task.name}</span>
                    <select
                      className={`task-status-select ${task.status.toLowerCase().replace(" ", "")}`}
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="remove-task-btn"
                    onClick={() => removeTask(task.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-tasks-message">
              <p>No tasks added yet.</p>
              <p className="hint">Add tasks using the form on the left.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProject;
