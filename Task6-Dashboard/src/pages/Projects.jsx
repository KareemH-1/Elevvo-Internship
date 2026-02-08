import React, { useEffect } from 'react'
import Sidebar_Header from '../components/Sidebar_Header' 
import {Plus, SquarePen , Search , X} from 'lucide-react'
import { projects as initialProjects } from '../data/user.data.js'
import AddProject from '../components/AddProject.jsx'
import EditProject from '../components/EditProject.jsx'
const Projects = ({ userName, isDarkMode, setIsDarkMode }) => {
  
  const [projects, setProjects] = React.useState([]);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
  const [projectToEdit, setProjectToEdit] = React.useState(null);
  const isThereProjects = projects.length > 0;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredProjects, setFilteredProjects] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 9;

  const checkAndUpdateOverdueProjects = (projects) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const updatedProjects = projects.map(project => {
      if (project.status.toLowerCase() !== 'completed' && project.deadline) {
        const deadlineDate = new Date(project.deadline);
        deadlineDate.setHours(0, 0, 0, 0);
        
        if (deadlineDate < currentDate) {
          return { ...project, status: 'Overdue' };
        }
      }
      return project;
    });
    
    return updatedProjects;
  };

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    let loadedProjects;
    
    if (storedProjects) {
      loadedProjects = JSON.parse(storedProjects);
    } else {
      loadedProjects = initialProjects;
    }
    
    const updatedProjects = checkAndUpdateOverdueProjects(loadedProjects);
    
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
  }, []);
  
  function openAddProjectPopup(){
    setIsPopupOpen(true);
  }

  function closeAddProjectPopup(){
    setIsPopupOpen(false);
  }

  function openEditProjectPopup(project){
    setProjectToEdit(project);
    setIsEditPopupOpen(true);
  }

  function closeEditProjectPopup(){
    setIsEditPopupOpen(false);
    setProjectToEdit(null);
  }
  
  function handleAddProject(newProject) {
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }

  function handleEditProject(updatedProject) {
    const updatedProjects = projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    const checkedProjects = checkAndUpdateOverdueProjects(updatedProjects);
    setProjects(checkedProjects);
    setFilteredProjects(checkedProjects);
    localStorage.setItem('projects', JSON.stringify(checkedProjects));
  }

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  function handleSearchChange(event) {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = projects.filter(project =>
      project.name.toLowerCase().includes(term.toLowerCase()) ||
      project.type.toLowerCase().includes(term.toLowerCase()) ||
      project.requirements.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1); 
  }

  function handleFilterChange(event) {
    const filterValue = event.target.value;
    let filtered = projects;
    if (filterValue === 'completed') {
      filtered = projects.filter(project => project.status.toLowerCase() === 'completed');
    } else if (filterValue === 'inprogress') {
      filtered = projects.filter(project => project.status.toLowerCase() === 'in progress');
    } else if (filterValue === 'overdue') {
      filtered = projects.filter(project => project.status.toLowerCase() === 'overdue');
    } else if (filterValue === 'pending') {
      filtered = projects.filter(project => project.status.toLowerCase() === 'pending');
    }
    setFilteredProjects(filtered);
    setCurrentPage(1);
  }

  useEffect(() => {
    const typeSelect = document.querySelector('.filter-container select:nth-child(2)');
    if (typeSelect && projects.length > 0) {
      while (typeSelect.options.length > 1) {
        typeSelect.remove(1);
      }
      
      const types = [...new Set(projects.map(project => project.type))];
      types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        typeSelect.appendChild(option);
      });
    }
  }, [projects])
  function handleTypeFilterChange(event) {
    const typeValue = event.target.value;
    let filtered = projects;
    if (typeValue) {
      filtered = projects.filter(project => project.type.toLowerCase() === typeValue.toLowerCase());
    }
    setFilteredProjects(filtered);
    setCurrentPage(1);
  }

  function handleDateFilterChange(event) {
    const dateValue = event.target.value;
    let filtered = [...projects];
    if (dateValue === 'newest') {
      filtered.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    } else if (dateValue === 'oldest') {
      filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    setFilteredProjects(filtered);
    setCurrentPage(1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        endPage = Math.min(maxPagesToShow, totalPages);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
      }
      
      if (startPage > 1) {
        pages.push(1);
      }
      
      if (startPage > 2) {
        pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      if (endPage < totalPages) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  
  return (
    <div>
      <Sidebar_Header page="Projects" userName={userName} isDarkMode={isDarkMode} onToggleTheme={setIsDarkMode} />
      <div className="content">
        <div className="projects-controls">

          <div className="first-cont">
            <button className="add-project-btn" onClick={openAddProjectPopup}>
              <Plus className="icon" size={16} />
              Add New Project
            </button>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search projects..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span className="search-icon">
                <Search size={16} />
              </span>
            </div>
          </div>
          <div className="filter-container">
            <select className="filter-select" onChange={handleFilterChange}>
              <option value="">Filter by Status</option>
              <option value="completed">Completed</option>
              <option value="inprogress">In Progress</option>
              <option value="overdue">Overdue</option>
              <option value="pending">Pending</option>
            </select>

            <select className="filter-select" onChange={handleTypeFilterChange}>
              <option value="">Filter by Type</option>
            </select> 

            <select className="filter-select" onChange={handleDateFilterChange}>
              <option value="">Filter by date</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        {!isThereProjects && (
          <p className="no-projects">No projects found. Start by adding a new project.</p>
        )}
        
        <hr style={{ margin: '20px 0', borderColor: isDarkMode ? '#555' : '#ccc' }} />
        <div className="projects-grid">
          {currentProjects.map((project) => (
            <div key={project.id} className={`project-card ${project.status.toLowerCase().replace(' ', '')}`}>
              <SquarePen className="edit-icon" onClick={() => openEditProjectPopup(project)} style={{cursor: 'pointer'}} />
              <div className="project-header">
                <h3>{project.name || 'N/A'}</h3>
                <span className={`status ${project.status.toLowerCase().replace(' ', '')}`}>{project.status || 'N/A'}</span>
              </div>
              <p className="project-type">{project.type || 'N/A'}</p>
              <p className="project-requirements">{project.requirements || 'N/A'}</p>
              <div className="project-earnings">
                <span className="budget">Budget : {project.earnings ? `${project.earnings} EGP` : 'N/A'}</span>
                <span className="money-earned">Money Earned : {project.moneyEarned !== null && project.moneyEarned !== undefined ? `${project.moneyEarned} EGP` : 'N/A'}</span>
              </div>
              <p className="deadline">Deadline: {project.deadline || 'N/A'}</p>
              <hr className='card-separator' />
              <div className="client-data">
                <span className="client-name">Client: {project.client || 'N/A'}</span>
                <span className="client-email">Email: {project.clientEmail || 'N/A'}</span>
                <span className="client-phone">Phone: {project.clientPhone || 'N/A'}</span>
              </div>
              <hr className='card-separator' />
              <div className="tasks-info">
                {project.tasks && project.tasks.length > 0 ? (
                  project.tasks.map((task, index) => (
                    <div key={index} className={`task-item ${task.status.toLowerCase().replace(' ', '')}`}>
                      <span className={`task-status ${task.status.toLowerCase().replace(' ', '')}`}>{task.status || 'N/A'}</span>
                      <span className="task-name">{task.name || 'N/A'}</span>
                    </div>
                  ))
                ) : (
                  <span>N/A</span>
                )}
              </div>

            </div>
          ))}
        </div>
        {filteredProjects.length > 0 && (
          <>
            <div className="paging">
              <button 
                className="page-btn" 
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="page-numbers">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`dots-${index}`} className="page-dots">...</span>
                  ) : (
                    <button
                      key={page}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageClick(page)}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>
              <button 
                className="page-btn" 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <span className="page-info">
              Page {currentPage} of {totalPages} ({filteredProjects.length} projects)
            </span>
          </>
        )}
      </div>

      {isPopupOpen && (
        <>
          <div className="add-project-popup">
            <button className="close-btn" onClick={closeAddProjectPopup}>
              <X size={20} />
            </button>
            <AddProject 
              onClose={closeAddProjectPopup} 
              onAddProject={handleAddProject}
              existingProjects={projects}
            />
          </div>
          <div className="blur active" onClick={closeAddProjectPopup}></div>
        </>
      )}

      {isEditPopupOpen && projectToEdit && (
        <>
          <div className="add-project-popup">
            <button className="close-btn" onClick={closeEditProjectPopup}>
              <X size={20} />
            </button>
            <EditProject 
              onClose={closeEditProjectPopup} 
              onEditProject={handleEditProject}
              projectToEdit={projectToEdit}
            />
          </div>
          <div className="blur active" onClick={closeEditProjectPopup}></div>
        </>
      )}
    </div>
  )
}

export default Projects
