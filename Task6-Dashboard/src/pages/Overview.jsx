import React from 'react'
import { Target, BanknoteArrowUp, CheckCircle, Clock, DollarSign, TrendingUp , TrendingDown } from 'lucide-react'
import Sidebar_Header from '../components/Sidebar_Header'
import Charts from '../components/Charts'
import { projects, getTodayEarnings,get7daysEarnings ,get30DaysEarnings, getYearlyEarnings, getAvgMonthlyEarnings, getTotalProjects, getCompletedTasks, getDueTasks , getLast3Projects } from '../data/user.data.js'

const Overview = ({ userName, isDarkMode, setIsDarkMode }) => {
    const totalProjects = getTotalProjects()
    const totalEarnings = projects.reduce((total, project) => total + project.moneyEarned, 0)
    const completedTasks = getCompletedTasks()
    const dueTasks = getDueTasks()
    const todayEarnings = getTodayEarnings()
    const last7DaysEarnings = get7daysEarnings()
    const last30DaysEarnings = get30DaysEarnings()
    const yearlyEarnings = getYearlyEarnings()
    const avgMonthlyEarnings = getAvgMonthlyEarnings()
    const latestProjects = getLast3Projects();


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-EG', {
            style: 'currency',
            currency: 'EGP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

  return (
    <div>
        <Sidebar_Header page="Overview" userName={userName} isDarkMode={isDarkMode} onToggleTheme={setIsDarkMode} />
        <div className="content">
            <div className="summary-cards">
                <div className="card">
                    <div className="card-header">
                        <Target size={20} />
                        <h3>Total Tasks</h3>
                    </div>
                    <p>{totalProjects}</p>
                </div>
                
                <div className="card">
                    <div className="card-header">
                        <BanknoteArrowUp size={20} />
                        <h3>Total Earnings</h3>
                    </div>
                    <p>{formatCurrency(totalEarnings)}</p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <CheckCircle size={20} />
                        <h3>Completed Tasks</h3>
                    </div>
                    <p>{completedTasks}</p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <Clock size={20} />
                        <h3>Due Tasks</h3>
                    </div>
                    <p>{dueTasks}</p>
                </div>
            </div>

            <div className="summary-cards">
                <div className= {`card ${todayEarnings.trend == "better" ? "better" : todayEarnings.trend == "worse" ? "worse" : ""}`} >
                    <div className="card-header">
                        {todayEarnings.trend == "better" ? <TrendingUp size={20} color="green" /> : todayEarnings.trend == "worse" ? <TrendingDown size={20} color="red" /> : <DollarSign size={20} />}
                        <h3>Today's Earnings</h3>
                    </div>
                    <p>{formatCurrency(todayEarnings.amount)}</p>
                    <p className={`Percentage ${todayEarnings.trend == "better" ? "better" : todayEarnings.trend == "worse" ? "worse" : ""}`}>
                        {Math.round(todayEarnings.percentage * 100) / 100}%
                    </p>
                </div>

                <div className= {`card ${last7DaysEarnings.trend == "better" ? "better" : last7DaysEarnings.trend == "worse" ? "worse" : ""}`} >
                    <div className="card-header">
                        {last7DaysEarnings.trend == "better" ? <TrendingUp size={20} color="green" /> : last7DaysEarnings.trend == "worse" ? <TrendingDown size={20} color="red" /> : <DollarSign size={20} />}
                        <h3>Last Week Earnings</h3>
                    </div>
                    <p>{formatCurrency(last7DaysEarnings.amount)}</p>
                    <p className={`Percentage ${last7DaysEarnings.trend == "better" ? "better" : last7DaysEarnings.trend == "worse" ? "worse" : ""}`}>
                        {Math.round(last7DaysEarnings.percentage * 100) / 100}%
                    </p>
                </div>

                <div className= {`card ${last30DaysEarnings.trend == "better" ? "better" : last30DaysEarnings.trend == "worse" ? "worse" : ""}`} >
                    <div className="card-header">
                        {last30DaysEarnings.trend == "better" ? <TrendingUp size={20} color="green" /> : last30DaysEarnings.trend == "worse" ? <TrendingDown size={20} color="red" /> : <DollarSign size={20} />}
                        <h3>Last Month Earnings</h3>
                    </div>
                    <p>{formatCurrency(last30DaysEarnings.amount)}</p>
                    <p className={`Percentage ${last30DaysEarnings.trend == "better" ? "better" : last30DaysEarnings.trend == "worse" ? "worse" : ""}`}>
                        {Math.round(last30DaysEarnings.percentage * 100) / 100}%
                    </p>
                </div>

                <div className= {`card ${yearlyEarnings.trend == "better" ? "better" : yearlyEarnings.trend == "worse" ? "worse" : ""}`} >
                    <div className="card-header">
                        {yearlyEarnings.trend == "better" ? <TrendingUp size={20} color="green" /> : yearlyEarnings.trend == "worse" ? <TrendingDown size={20} color="red" /> : <DollarSign size={20} />}
                        <h3>{new Date().getFullYear()} Earnings</h3>
                    </div>
                    <p>{formatCurrency(yearlyEarnings.amount)} </p>
                    <p className={`Percentage ${yearlyEarnings.trend == "better" ? "better" : yearlyEarnings.trend == "worse" ? "worse" : ""}`}>
                        {Math.round(yearlyEarnings.percentage * 100) / 100}%
                    </p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <TrendingUp size={20} />
                        <h3>Avg Monthly Earnings</h3>
                    </div>
                    <p>{formatCurrency(avgMonthlyEarnings)}</p>

                </div>
            </div>
        </div>


        <div className="projects-section">
            <h2>Latest Projects</h2>
            <div className="recent-projects">
                {latestProjects.map((project, index) => (
                    <div key={index} className="project-card">
                        <span className={`project-status ${project.status.toLowerCase().replace(" ", "-")}`}></span>
                        <div className="project-info">
                            <h3>{project.name}</h3>
                            <p>Earned: {formatCurrency(project.moneyEarned)}</p>
                        </div>
                        <div className="project-tasks">
                            {project.tasks.map((task, taskIndex) => (
                                <span key={taskIndex} className={`task-chip ${task.status.toLowerCase().replace(" ", "-")}`}>
                                    {task.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
     
       <h1 className="charts_title">Projects Statistics</h1>
        <Charts isDarkMode={isDarkMode} />
    </div>
  )
}

export default Overview
