import React from "react";
import posts from "../data/data.js";
import {LayoutGrid , LayoutList } from 'lucide-react'
const Posts = () => {

    function sortDataByDate(data){
        return data.sort((a, b) => {
            const dateA = new Date(a.date.split("-").reverse().join("-"));
            const dateB = new Date(b.date.split("-").reverse().join("-"));
            return dateB - dateA
        });
    }
    const sortedPosts = sortDataByDate(posts);

 const [displayType, setDisplayType] = React.useState("grid");

 function toggleDisplayType(type) {
    setDisplayType(type);
 }

 const [displayCategory , setDisplayCategory] = React.useState("All");
 const [search, setSearch] = React.useState("");
 
 let filteredPosts = sortedPosts;
 
 if (search) {
   filteredPosts = filteredPosts.filter(post => 
     post.title.toLowerCase().includes(search.toLowerCase()) || 
     post.short_desc.toLowerCase().includes(search.toLowerCase())
   );
 }
 
 if (displayCategory !== "All") {
   filteredPosts = filteredPosts.filter(post => post.category === displayCategory);
 }
 
 const numPostsToShow = 6;
 const numPages = Math.ceil(filteredPosts.length / numPostsToShow);
 const [currentPage, setCurrentPage] = React.useState(1);

    
 const getPageNumbers = () => {
   const pages = [];
   const startPage = Math.max(1, currentPage - 3);
   const endPage = Math.min(numPages, currentPage + 3);
   
   for (let i = startPage; i <= endPage; i++) {
     pages.push(i);
   }
   
   return pages;
 };

 React.useEffect(() => {
   const input_search = (e) => {
     if (e.target.classList.contains('input')) {
       setSearch(e.target.value);
       setCurrentPage(1);
     }
   };

   document.addEventListener('input', input_search);

   return () => {
     document.removeEventListener('input', input_search);
   };
 }, []);

 React.useEffect(() => {
   setCurrentPage(1);
 }, [displayCategory]);

  return (
    <div className="posts_big_cont">
      <div className="posts-header">
        <h2>Latest Posts</h2>
      </div>

      <div id="posts" className="posts">
        <div className={`All-posts ${displayType}`}>
          {filteredPosts.slice((currentPage - 1) * numPostsToShow, currentPage * numPostsToShow).map((post) => (
            <a href="#" key={post.id} className="post-card">
              <img src={post.image} alt={post.title} className="post-image" />
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-desc">{post.short_desc}</p>
                <p className="post-date">{post.date}</p>
                </div>
            </a>
          ))}
        </div>

        <div className="sidebar">
          <h3>Filter by</h3>
          <div className="displayType">
            <div  className={`displayBtn ${displayType === "grid" ? "active" : ""}`} onClick={() => toggleDisplayType("grid")}>
                <LayoutGrid/>
                <span>grid</span>
            </div>
            <div className={`displayBtn ${displayType === "list" ? "active" : ""}`} onClick={() => toggleDisplayType("list")}>
                <LayoutList/>
                <span>list</span> 
            </div>
          </div>
          <h3>Categories</h3>
          <ul className="categories-list">
            <li className={`category-item ${displayCategory === "All" ? "active" : ""}`} onClick={() => setDisplayCategory("All")}>All</li>
            <li className={`category-item ${displayCategory === "Tech" ? "active" : ""}`} onClick={() => setDisplayCategory("Tech")}>Tech</li>
            <li className={`category-item ${displayCategory === "Health" ? "active" : ""}`} onClick={() => setDisplayCategory("Health")}>Health</li>
            <li className={`category-item ${displayCategory === "Travel" ? "active" : ""}`} onClick={() => setDisplayCategory("Travel")}>Travel</li>
            <li className={`category-item ${displayCategory === "Business" ? "active" : ""}`} onClick={() => setDisplayCategory("Business")}>Business</li>
            <li className={`category-item ${displayCategory === "Art" ? "active" : ""}`} onClick={() => setDisplayCategory("Art")}>Art</li>
            <li className={`category-item ${displayCategory === "Finance" ? "active" : ""}`} onClick={() => setDisplayCategory("Finance")}>Finance</li>
          </ul>
        </div>
      </div>

      <div className={`paging ${numPages <= 1 ? "hidden" : ""}`}>
        <button 
          className="paging-btn" 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <div className="page-numbers ">
          {getPageNumbers().map((pageNum) => (
            pageNum === currentPage ? (
              <span key={pageNum} className="page-number active">
                {pageNum}
              </span>
            ) : (
              <button 
                key={pageNum}
                className="page-number" 
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            )
          ))}
        </div>
        
        <button 
          className="paging-btn" 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numPages))}
          disabled={currentPage === numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
