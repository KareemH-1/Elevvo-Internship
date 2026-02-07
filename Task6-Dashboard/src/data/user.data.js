const projects = [
    {
        id: 1,
        name: "Project A",
        type: "Web Design",
        requirements: "Design a responsive website",
        deadline: "2026-02-06",
        status: "In Progress",
        earnings: 8000,
        moneyEarned: 3000,
        earnedDate: "2026-01-15",
        tasks: [
            { id: 1, name: "Design homepage", status: "Completed" },
            { id: 2, name: "Design about page", status: "In Progress" },
            { id: 3, name: "Design contact page", status: "Pending" },
        ],
    },
    {  
        id: 2,
        name: "E-Commerce Platform",
        type: "E-Commerce",
        requirements: "Build a full-stack e-commerce website with payment integration",
        deadline: "2026-02-06",
        status: "Completed",
        earnings: 12000,
        moneyEarned: 12000,
        earnedDate: "2026-02-06",
        tasks: [
            { id: 1, name: "Setup database schema", status: "Completed" },
            { id: 2, name: "Implement product catalog", status: "Completed" },
            { id: 3, name: "Payment gateway integration", status: "Completed" },
            { id: 4, name: "Testing and deployment", status: "Completed" },
        ],
    },
    {
        id: 3,
        name: "Mobile App Development",
        type: "Mobile App",
        requirements: "Create a cross-platform mobile app for fitness tracking",
        deadline: "2026-02-05",
        status: "In Progress",
        earnings: 8500,
        moneyEarned: 5000,
        earnedDate: "2026-02-01",
        tasks: [
            { id: 1, name: "UI/UX design", status: "Completed" },
            { id: 2, name: "User authentication", status: "Completed" },
            { id: 3, name: "Workout tracking feature", status: "In Progress" },
            { id: 4, name: "Social sharing", status: "Pending" },
        ],
    },
    {
        id: 4,
        name: "CRM System",
        type: "Enterprise Software",
        requirements: "Develop a customer relationship management system",
        deadline: "2025-11-12",
        status: "Completed",
        earnings: 15000,
        moneyEarned: 15000,
        earnedDate: "2025-11-10",
        tasks: [
            { id: 1, name: "Customer database design", status: "Completed" },
            { id: 2, name: "Lead management module", status: "Completed" },
            { id: 3, name: "Reporting dashboard", status: "Completed" },
        ],
    },
    {
        id: 5,
        name: "Blog Platform",
        type: "Content Platform",
        requirements: "Build a modern blogging platform with CMS",
        deadline: "2026-01-28",
        status: "In Progress",
        earnings: 6000,
        moneyEarned: 3500,
        earnedDate: "2026-01-25",
        tasks: [
            { id: 1, name: "Content management system", status: "Completed" },
            { id: 2, name: "Rich text editor", status: "In Progress" },
            { id: 3, name: "SEO optimization", status: "Pending" },
            { id: 4, name: "Comment system", status: "Pending" },
        ],
    },
    {
        id: 6,
        name: "Inventory Management",
        type: "Operations",
        requirements: "Create an inventory tracking system for warehouse",
        deadline: "2024-09-15",
        status: "In Progress",
        earnings: 10000,
        moneyEarned: 0,
        earnedDate: null,
        tasks: [
            { id: 1, name: "Requirements gathering", status: "Completed" },
            { id: 2, name: "Database design", status: "In Progress" },
            { id: 3, name: "Barcode scanning", status: "In Progress" },
            { id: 4, name: "Stock alerts", status: "In Progress" },
        ],
    },
    {
        id: 7,
        name: "Social Media Dashboard",
        type: "Analytics",
        requirements: "Build analytics dashboard for social media metrics",
        deadline: "2026-02-06",
        status: "In Progress",
        earnings: 7500,
        moneyEarned: 4500,
        earnedDate: "2026-02-05",
        tasks: [
            { id: 1, name: "API integrations", status: "Completed" },
            { id: 2, name: "Data visualization", status: "In Progress" },
            { id: 3, name: "Export reports", status: "In Progress" },
        ],
    },
    {
        id: 8,
        name: "Real Estate Portal",
        type: "Marketplace",
        requirements: "Develop a property listing and search platform",
        deadline: "2026-02-10",
        status: "In Progress",
        earnings: 13000,
        moneyEarned: 6500,
        earnedDate: "2026-02-07",
        tasks: [
            { id: 1, name: "Property listing module", status: "Completed" },
            { id: 2, name: "Advanced search filters", status: "In Progress" },
            { id: 3, name: "Map integration", status: "In Progress" },
            { id: 4, name: "Agent dashboard", status: "In Progress" },
        ],
    },
    {
        id: 9,
        name: "Learning Management System",
        type: "EdTech",
        requirements: "Create an online learning platform with courses and quizzes",
        deadline: "2024-09-20",
        status: "In Progress",
        earnings: 11000,
        moneyEarned: 0,
        earnedDate: null,
        tasks: [
            { id: 1, name: "Course structure design", status: "In Progress" },
            { id: 2, name: "Video player integration", status: "In Progress" },
            { id: 3, name: "Quiz system", status: "In Progress" },
            { id: 4, name: "Progress tracking", status: "In Progress" },
        ],
    },

]

const user ={
    name: "Kareem Ahmed",
    email: "kareem.a.hassan15@gmail.com",
    password: "password123",
    profilePicture: "../assets/user_profile.png"
}

function getTrend(currentAmount, previousAmount) {
    if (currentAmount > previousAmount) {
        return "better";
    }
    if (currentAmount < previousAmount) {
        return "worse";
    }
    return "same";
}

function getPercentageChange(currentAmount, previousAmount) {
    if (previousAmount === 0) {
        return 0;
    }
    return ((currentAmount - previousAmount) / previousAmount) * 100;
}

function getProfitAmount(currentAmount, previousAmount) {
    return currentAmount - previousAmount;
}

function sumEarningsInRange(startDate, endDate) {
    return projects.reduce((total, project) => {
        if (project.earnedDate) {
            const earnedDate = new Date(project.earnedDate);
            if (earnedDate >= startDate && earnedDate <= endDate) {
                return total + project.moneyEarned;
            }
        }
        return total;
    }, 0);
}

function getTodayEarnings() {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    const yesterday = new Date(startOfToday);
    yesterday.setDate(yesterday.getDate() - 1);
    const endOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);

    const todayAmount = sumEarningsInRange(startOfToday, endOfToday);
    const yesterdayAmount = sumEarningsInRange(yesterday, endOfYesterday);

    return {
        amount: todayAmount,
        trend: getTrend(todayAmount, yesterdayAmount),
        percentage: getPercentageChange(todayAmount, yesterdayAmount),
        profit: getProfitAmount(todayAmount, yesterdayAmount)
    };
}

function get7daysEarnings() {
    const today = new Date();
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    const startOfLast7 = new Date(endOfToday);
    startOfLast7.setDate(startOfLast7.getDate() - 6);
    startOfLast7.setHours(0, 0, 0, 0);

    const endOfPrev7 = new Date(startOfLast7);
    endOfPrev7.setMilliseconds(-1);
    const startOfPrev7 = new Date(endOfPrev7);
    startOfPrev7.setDate(startOfPrev7.getDate() - 6);
    startOfPrev7.setHours(0, 0, 0, 0);

    const currentAmount = sumEarningsInRange(startOfLast7, endOfToday);
    const previousAmount = sumEarningsInRange(startOfPrev7, endOfPrev7);

    return {
        amount: currentAmount,
        trend: getTrend(currentAmount, previousAmount),
        percentage: getPercentageChange(currentAmount, previousAmount),
        profit: getProfitAmount(currentAmount, previousAmount)
    };
}

function get30DaysEarnings() {
    const today = new Date();
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    const startOfLast30 = new Date(endOfToday);
    startOfLast30.setDate(startOfLast30.getDate() - 29);
    startOfLast30.setHours(0, 0, 0, 0);

    const endOfPrev30 = new Date(startOfLast30);
    endOfPrev30.setMilliseconds(-1);
    const startOfPrev30 = new Date(endOfPrev30);
    startOfPrev30.setDate(startOfPrev30.getDate() - 29);
    startOfPrev30.setHours(0, 0, 0, 0);

    const currentAmount = sumEarningsInRange(startOfLast30, endOfToday);
    const previousAmount = sumEarningsInRange(startOfPrev30, endOfPrev30);

    return {
        amount: currentAmount,
        trend: getTrend(currentAmount, previousAmount),
        percentage: getPercentageChange(currentAmount, previousAmount),
        profit: getProfitAmount(currentAmount, previousAmount)
    };
}

function getYearlyEarnings() {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    const currentAmount = projects.reduce((total, project) => {
        if (project.earnedDate) {
            const earnedYear = new Date(project.earnedDate).getFullYear();
            if (earnedYear === currentYear) {
                return total + project.moneyEarned;
            }
        }
        return total;
    }, 0);

    const previousAmount = projects.reduce((total, project) => {
        if (project.earnedDate) {
            const earnedYear = new Date(project.earnedDate).getFullYear();
            if (earnedYear === previousYear) {
                return total + project.moneyEarned;
            }
        }
        return total;
    }, 0);

    return {
        amount: currentAmount,
        trend: getTrend(currentAmount, previousAmount),
        percentage: getPercentageChange(currentAmount, previousAmount),
        profit: getProfitAmount(currentAmount, previousAmount)
    };
}
function getAvgMonthlyEarnings() {
    const currentYear = new Date().getFullYear();
    const monthlyEarnings = Array(12).fill(0);
    projects.forEach(project => {
        if (project.earnedDate) {
            const earnedYear = new Date(project.earnedDate).getFullYear();
            if (earnedYear === currentYear) {
                const month = new Date(project.earnedDate).getMonth();
                monthlyEarnings[month] += project.moneyEarned;
            }
        }
    });
    const monthsWithEarnings = monthlyEarnings.filter(earning => earning > 0).length;
    return monthsWithEarnings > 0 ? (monthlyEarnings.reduce((a, b) => a + b, 0) / monthsWithEarnings) : 0;
}
function getEveryMonthEarnings() {
    const currentYear = new Date().getFullYear();
    const monthlyEarnings = Array(12).fill(0);
    projects.forEach(project => {
        if (project.earnedDate) {
            const earnedYear = new Date(project.earnedDate).getFullYear();
            if (earnedYear === currentYear) {
                const month = new Date(project.earnedDate).getMonth();
                monthlyEarnings[month] += project.moneyEarned;
            }
        }
    });
    return monthlyEarnings;
}

const getTotalProjects = () => projects.length;

const getCompletedTasks = () => {
    let total = 0;
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        if (project.status === "Completed") {
            total += 1;
        }
        
    }
    return total;
}

const getDueTasks = () => {
    let total = 0;
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        if (project.status === "In Progress" || project.status === "Pending") {
            total += 1;
        }
        
    }
    return total;
}

function getLast3Projects (){
    const sortedProjects = [...projects].sort((a, b) => new Date(b.earnedDate) - new Date(a.earnedDate));
    return sortedProjects.slice(0, 3);
}
export { projects, user, getTodayEarnings,get7daysEarnings ,get30DaysEarnings, getYearlyEarnings, getAvgMonthlyEarnings, getEveryMonthEarnings, getTotalProjects, getCompletedTasks, getDueTasks , getLast3Projects};