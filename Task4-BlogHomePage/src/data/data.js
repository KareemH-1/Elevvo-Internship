const posts = [
    {
        id: 1,
        title: "React tutorial for beginners",
        short_desc: "Learn the basics of React, including components, state, and props.",
        date: "06-02-2026",
        image: "https://cloudmatetechnologies.com/wp-content/uploads/2024/06/react.js.png",
        category: "Tech"
    },
    {
        id: 2,
        title: "Tips for living a healthy life",
        short_desc: "Discover practical tips for maintaining a healthy lifestyle, including diet, exercise, and mental well-being.",
        date: "15-01-2026",
        image: "data:image/jpeg;base64,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",
        category: "Health"
    },
    {
        id: 3,
        title: "10 Best places to visit in 2026",
        short_desc: "Explore the most stunning travel destinations around the world this year.",
        date: "20-06-2025",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
        category: "Travel"
    },
    {
        id: 4,
        title: "JavaScript ES2026 features",
        short_desc: "Discover the latest features and improvements in JavaScript ES2026.",
        date: "25-11-2025",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        category: "Tech"
    },
    {
        id: 5,
        title: "The Art of Meditation",
        short_desc: "Learn how meditation can transform your mind and improve your overall well-being.",
        date: "01-02-2026",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
        category: "Health"
    },
    {
        id: 6,
        title: "Building RESTful APIs with Node.js",
        short_desc: "A comprehensive guide to creating scalable REST APIs using Node.js and Express.",
        date: "05-01-2026",
        image: "https://nodejs.org/static/images/logo.svg",
        category: "Tech"
    },
    {
        id: 7,
        title: "Digital Marketing Strategies for 2026",
        short_desc: "Stay ahead with the latest digital marketing trends and strategies.",
        date: "10-10-2025",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        category: "Business"
    },
    {
        id: 8,
        title: "Healthy Meal Prep Ideas",
        short_desc: "Simple and nutritious meal prep recipes to save time and eat healthy.",
        date: "12-02-2024",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
        category: "Health"
    },
    {
        id: 9,
        title: "Introduction to Machine Learning",
        short_desc: "Understand the basics of machine learning and how to get started.",
        date: "18-12-2024",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
        category: "Tech"
    },
    {
        id: 10,
        title: "Budget Travel Tips",
        short_desc: "How to travel the world on a budget without sacrificing experiences.",
        date: "22-02-2023",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
        category: "Travel"
    },
    {
        id: 11,
        title: "CSS Grid vs Flexbox",
        short_desc: "Compare CSS Grid and Flexbox to choose the right layout tool for your project.",
        date: "28-02-2025",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800",
        category: "Tech"
    },
    {
        id: 12,
        title: "Mindfulness in Daily Life",
        short_desc: "Practical ways to incorporate mindfulness into your everyday routine.",
        date: "03-03-2021",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
        category: "Health"
    },
    {
        id: 13,
        title: "Startup Success Stories",
        short_desc: "Learn from the journeys of successful startups and their founders.",
        date: "08-03-2021",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
        category: "Business"
    },
    {
        id: 14,
        title: "Top Photography Tips for Beginners",
        short_desc: "Master the basics of photography with these essential tips and techniques.",
        date: "15-03-2025",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
        category: "Art"
    },
    {
        id: 15,
        title: "Understanding Cryptocurrency",
        short_desc: "A beginner's guide to cryptocurrency, blockchain, and digital assets.",
        date: "20-03-2025",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800",
        category: "Finance"
    }
];

export default posts;