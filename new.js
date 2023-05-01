import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts');
      }
    }
    fetchPosts();
  }, []);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  const filteredPosts = posts.filter((post) =>
    post.title.includes(searchQuery) || post.body.includes(searchQuery)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      {error && <div>{error}</div>}
      <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
      <select value={postsPerPage} onChange={(e) => setPostsPerPage(parseInt(e.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function Pagination({ currentPage, postsPerPage, totalPosts, onPageChange }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  function handlePageClick(page) {
    onPageChange(page);
  }

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
export deafult App;