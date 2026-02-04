import React from 'react'
import { Star } from 'lucide-react'
import benImg from '../assets/reviews_imgs/ben.jpg'
import daveImg from '../assets/reviews_imgs/dave.jpg'
import johnImg from '../assets/reviews_imgs/john.jpg'
import steveImg from '../assets/reviews_imgs/steve.jpg'

const Reviews = () => {
  const reviews = [
    {
      name: "Ben",
      role: "Product Manager",
      image: benImg,
      rating: 5,
      text: "TaskFlow has completely transformed how our team manages projects. The intuitive interface and powerful features have cut our planning time in half. Highly recommend for any team looking to boost productivity!"
    },
    {
      name: "Dave",
      role: "Freelance Designer",
      image: daveImg,
      rating: 5,
      text: "As a freelancer serving multiple clients, TaskFlow keeps me organized and on track. The customizable workflows adapt perfectly to each project's unique needs. It's become absolutely essential to my daily routine."
    },
    {
      name: "John",
      role: "Software Developer",
      image: johnImg,
      rating: 4,
      text: "The real-time collaboration features are outstanding. Our distributed team stays in sync effortlessly. The only thing I'd love to see is more integration options, but overall it's a fantastic tool."
    },
    {
      name: "Steve",
      role: "Marketing Director",
      image: steveImg,
      rating: 5,
      text: "We've tried countless task management tools, but TaskFlow stands out. The clean design makes onboarding new team members quick and painless. It's rare to find a tool that's both powerful and user-friendly."
    }
  ];

  return (
    <div id="reviews" className="reviews-section reveal">
      <hr className="section-divider" />

      <h2 className="section-title">What Our Users Say</h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <img src={review.image} alt={review.name} className="review-avatar" />
              <div className="review-info">
                <h4 className="review-author">{review.name}</h4>
                <p className="review-role">{review.role}</p>
              </div>
            </div>
            <div className="review-rating">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < review.rating ? "var(--primary)" : "none"}
                  color={i < review.rating ? "var(--primary)" : "var(--text-muted)"}
                />
              ))}
            </div>
            <p className="review-text">"{review.text}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews
