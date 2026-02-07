import React, { useRef, useEffect } from 'react'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    DoughnutController,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    PieController,
    Filler
} from 'chart.js'

import '../css/charts.css'
import { 
    projectStatusThisMonth, 
    categoryCounts, 
    earningByMonth, 
    taskStats,
    earningsOverTime,
    projectsByMonth
} from '../data/charts.data.js'


const Charts = ({ isDarkMode = false }) => {
    const chartRef = useRef(null)
    const barChartRef = useRef(null)
    const barChartRef2 = useRef(null)
    const pieChartRef = useRef(null)
    const lineChartRef = useRef(null)
    const lineChartRef2 = useRef(null)
    
    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        DoughnutController,
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        LineController,
        LineElement,
        PointElement,
        PieController,
        Filler
    )

    const chartTheme = {
        primary: '#22c55e',
        warning: '#eab308',
        muted: '#9ca3af',
        primaryDark: '#16a34a'
    }

    const chartTextColor = isDarkMode ? '#f9fafb' : '#1f2937'
    const chartMutedText = isDarkMode ? '#d1d5db' : '#6b7280'
    
    

    useEffect(() => {
        if (!chartRef.current) return
        
        const ctx = chartRef.current.getContext('2d')
        
        if (projectStatusThisMonth.completed === 0 && projectStatusThisMonth.inProgress === 0 && projectStatusThisMonth.pending === 0) {
            ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)
            ctx.font = '16px Arial'
            ctx.fillStyle = chartMutedText
            ctx.textAlign = 'center'
            ctx.fillText('No projects this month', chartRef.current.width / 2, chartRef.current.height / 2)
            return
        }
        
        const chart = new ChartJS(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'In Progress', 'Pending'],
                    datasets: [{
                        label: 'Projects',
                        data: [projectStatusThisMonth.completed, projectStatusThisMonth.inProgress, projectStatusThisMonth.pending],
                        backgroundColor: [
                            `${chartTheme.primary}cc`,
                            `${chartTheme.warning}cc`,
                            `${chartTheme.muted}cc`
                        ],
                        borderColor: [
                            chartTheme.primary,
                            chartTheme.warning,
                            chartTheme.muted
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {   
                            position: 'top',
                            labels: {
                                color: chartTextColor
                            }
                        },
                        title: {
                            display: true,
                            text: 'Project Status Distribution for This Month',
                            color: chartTextColor,
                            font: {
                                size: 16
                            }
                        },
                    },
                },
            })

        return () => {
            chart.destroy()
        }
    }, [isDarkMode])

    useEffect(() => {
        if (!barChartRef.current) return
        
        const ctx = barChartRef.current.getContext('2d')
        
        if(Object.keys(categoryCounts).length === 0) {
            ctx.clearRect(0, 0, barChartRef.current.width, barChartRef.current.height)
            ctx.font = '16px Arial'
            ctx.fillStyle = chartMutedText
            ctx.textAlign = 'center'
            ctx.fillText('No projects available', barChartRef.current.width / 2, barChartRef.current.height / 2)
            return
        }

        const categoryLabels = Object.keys(categoryCounts)
        const categoryData = categoryLabels.map((label) => categoryCounts[label])

        const chart = new ChartJS(ctx, {
                type: 'bar',
                data: {
                    labels: categoryLabels,
                    datasets: [{
                        label: 'Projects by Category',
                        data: categoryData,
                        backgroundColor: chartTheme.primary,
                        borderColor: chartTheme.primaryDark,
                        borderWidth: 2,
                        borderRadius: 8,
                        maxBarThickness: 42
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: chartTextColor
                            }
                        },
                        title: {
                            display: true,
                            text: 'Projects by Category',
                            color: chartTextColor,
                            font: {
                                size: 16
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: chartTextColor
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.2)'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: chartTextColor,
                                stepSize: 1
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.2)'
                            }
                        }
                    }
                }
            })

        return () => {
            chart.destroy()
        }
    }, [isDarkMode])

    useEffect(() => {
        if (!barChartRef2.current) return
        
        const ctx = barChartRef2.current.getContext('2d')
        
        if(Object.keys(earningByMonth).length === 0) {
            ctx.clearRect(0, 0, barChartRef2.current.width, barChartRef2.current.height)
            ctx.font = '16px Arial'
            ctx.fillStyle = chartMutedText
            ctx.textAlign = 'center'
            ctx.fillText('No earnings data available', barChartRef2.current.width / 2, barChartRef2.current.height / 2)
            return
        }
        const earningLabels = Object.keys(earningByMonth)
        const earningData = earningLabels.map((label) => earningByMonth[label])
        const chart = new ChartJS(ctx, {
                type: 'bar',
                data: {
                    labels: earningLabels,
                    datasets: [{
                        label: 'Earnings by Month',
                        data: earningData,
                        backgroundColor: chartTheme.primary,
                        borderColor: chartTheme.primaryDark,
                        borderWidth: 2,
                        borderRadius: 8,
                        maxBarThickness: 42
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: chartTextColor
                            }
                        },  
                        title: {
                            display: true,
                            text: 'Earnings by Month',
                            color: chartTextColor,
                            font: {
                                size: 16
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: chartTextColor
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.2)'
                            }
                        },  
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: chartTextColor,
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.2)'
                            }
                        }
                        
                    }
                }
            })

        return () => {
            chart.destroy()
        }
    }, [isDarkMode])

    useEffect(() => {
        if (!pieChartRef.current) return
        
        const ctx = pieChartRef.current.getContext('2d')
        const chart = new ChartJS(ctx, {
                type: 'pie',
                data: {
                    labels: ['Completed', 'In Progress', 'Pending'],
                    datasets: [{
                        label: 'Tasks',
                        data: [taskStats.completed, taskStats.inProgress, taskStats.pending],
                        backgroundColor: [
                            `${chartTheme.primary}dd`,
                            `${chartTheme.warning}dd`,
                            `${chartTheme.muted}dd`
                        ],
                        borderColor: [
                            chartTheme.primary,
                            chartTheme.warning,
                            chartTheme.muted
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: chartTextColor
                            }
                        },
                        title: {
                            display: true,
                            text: 'Task Distribution',
                            color: chartTextColor,
                            font: {
                                size: 16
                            }
                        }
                    }
                }
            })

        return () => {
            chart.destroy()
        }
    }, [isDarkMode])

    useEffect(() => {
        if (!lineChartRef.current) return
        
        const ctx = lineChartRef.current.getContext('2d')
        const earningLabels = Object.keys(earningsOverTime)
        const earningData = earningLabels.map((label) => earningsOverTime[label])

        const chart = new ChartJS(ctx, {
                type: 'line',
                data: {
                    labels: earningLabels,
                    datasets: [{
                        label: 'Earnings',
                        data: earningData,
                        backgroundColor: `${chartTheme.primary}33`,
                        borderColor: chartTheme.primary,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: chartTheme.primary,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: chartTextColor
                            }
                        },
                        title: {
                            display: true,
                            text: 'Earnings Trend',
                            color: chartTextColor,
                            font: {
                                size: 16
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: chartTextColor
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.2)'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: chartTextColor
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.2)'
                            }
                        }
                    }
                }
            })

        return () => {
            chart.destroy()
        }
    }, [isDarkMode])

    useEffect(() => {
        if (!lineChartRef2.current) return
        
        const ctx = lineChartRef2.current.getContext('2d')
        const monthLabels = Object.keys(projectsByMonth)
        const monthData = monthLabels.map((label) => projectsByMonth[label])

        const chart = new ChartJS(ctx, {
                type: 'line',
                data: {
                    labels: monthLabels,
                    datasets: [{
                        label: 'Projects',
                        data: monthData,
                        backgroundColor: `${chartTheme.warning}33`,
                        borderColor: chartTheme.warning,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: chartTheme.warning,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: chartTextColor
                            }
                        },
                        title: {
                            display: true,
                            text: 'Projects Timeline',
                            color: chartTextColor,
                            font: {
                                size: 16
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: chartTextColor
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.2)'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: chartTextColor,
                                stepSize: 1
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.2)'
                            }
                        }
                    }
                }
            })

        return () => {
            chart.destroy()
        }
    }, [isDarkMode])

    return (
        <div className="charts-container">
            <div className="charts-top-section">
                <div className="charts-grid-left">
                    <div className="chart-card">
                        <h1 className="chart_title">Project Status This Month</h1>
                        <canvas ref={chartRef}></canvas>
                    </div>
                    <div className="chart-card">
                        <h1 className="chart_title">Projects by Category</h1>
                        <canvas ref={barChartRef}></canvas>
                    </div>
                </div>
                <div className="charts-grid-right">
                    <div className="chart-card">
                        <h1 className="chart_title">Tasks Status</h1>
                        <canvas ref={pieChartRef}></canvas>
                    </div>
                    <div className="chart-card">
                        <h1 className="chart_title">Earnings by Month Line Graph</h1>
                        <canvas ref={lineChartRef}></canvas>
                    </div>
                </div>
            </div>
            <div className="charts-bottom-section">
                <div className="chart-card chart-card-wide">
                    <h1 className="chart_title">Projects By Month</h1>
                    <canvas ref={lineChartRef2}></canvas>
                </div>
                <div className="chart-card chart-card-wide">
                    <h1 className="chart_title">Earnings by Month</h1>
                    <canvas ref={barChartRef2}></canvas>
                </div>
            </div>
        </div>
    )
}

export default Charts
