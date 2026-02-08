import React from 'react'
const AddProject = () => {
  return (
    <div>
      <div className="add-project-header">
        <h2>Add New Project</h2>
      </div>
        <div className="add-project-body">
            <div className="form-group">
                <label>Project Name</label>
                <input type="text" placeholder="Enter project name" />
            </div>

            <div className="form-group">
                <h1>Client Information</h1>
                <label>Client</label>
                <input type="text" placeholder="Enter client name" />

                <label>Client Email</label>
                <input type="email" placeholder="Enter client email" />

                <label>Client Phone</label>
                <input type="tel" placeholder="Enter client phone" />
            </div>

            <div className="form-group">
                <h1>Project Details</h1>
                
                <label>deadline</label>
                <input type="date" />

                <label>type</label>
                <input type="text" placeholder="Enter project type" />

                <label>Requirements</label>
                <input type="text" placeholder="Enter project requirements" />
            </div>

            <div className="form-group">
                <h1>Financial Details</h1>

                <label>Budget</label>
                <input type="number" placeholder="Enter project budget" />
            </div>

            <div className="form-group">
                <h1>add tasks</h1>
                <button className="add-task-btn">+ Add Task</button>
            </div>

            <button className="submit-btn">Submit</button>
        </div>
    </div>
  )
}

export default AddProject;
