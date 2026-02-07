import {projects} from './user.data'

const projectStatusThisMonth = projects.reduce((statusCount, project) => {
        const projectDate = new Date(project.deadline)
        const currentDate = new Date()
        if (projectDate.getMonth() === currentDate.getMonth() && projectDate.getFullYear() === currentDate.getFullYear()) {
            if (project.status === 'Completed') {
                statusCount.completed += 1
            } else if (project.status === 'In Progress') {
                statusCount.inProgress += 1
            } else if (project.status === 'Pending') {
                statusCount.pending += 1
            }
        }
        return statusCount
    }, { completed: 0, inProgress: 0, pending: 0 })

const categoryCounts = projects.reduce((counts, project) => {
    counts[project.type] = (counts[project.type] || 0) + 1
    return counts
}, {})


const earningByMonth = projects.reduce((earnings, project) => {
    const month = new Date(project.deadline).toLocaleString('default', { month: 'short' })
    earnings[month] = (earnings[month] || 0) + project.moneyEarned
    return earnings
}, {})

// Task completion rate across all projects
const taskStats = projects.reduce((stats, project) => {
    project.tasks.forEach(task => {
        if (task.status === 'Completed') {
            stats.completed += 1
        } else if (task.status === 'In Progress') {
            stats.inProgress += 1
        } else {
            stats.pending += 1
        }
    })
    return stats
}, { completed: 0, inProgress: 0, pending: 0 })

// Earnings over time (last 6 months)
const earningsOverTime = projects
    .filter(p => p.earnedDate)
    .sort((a, b) => new Date(a.earnedDate) - new Date(b.earnedDate))
    .reduce((acc, project) => {
        const month = new Date(project.earnedDate).toLocaleString('default', { month: 'short', year: '2-digit' })
        if (!acc[month]) {
            acc[month] = 0
        }
        acc[month] += project.moneyEarned
        return acc
    }, {})

// Monthly project count (last 6 months)
const projectsByMonth = projects.reduce((acc, project) => {
    const month = new Date(project.deadline).toLocaleString('default', { month: 'short' })
    if (!acc[month]) {
        acc[month] = 0
    }
    acc[month] += 1
    return acc
}, {})

// Earnings vs Budget
const earningsVsBudget = projects.reduce((acc, project) => {
    acc.earned += project.moneyEarned
    acc.budget += project.earnings
    return acc
}, { earned: 0, budget: 0 })

export { 
    projectStatusThisMonth, 
    categoryCounts, 
    earningByMonth, 
    taskStats,
    earningsOverTime,
    projectsByMonth,
    earningsVsBudget
}