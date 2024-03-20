import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from "./../../components/Layout/Layout";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const getAllPosts = async () => {
    try {
      const response = await axios.get("/api/v1/post/get-posts");
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const getBackgroundImage = (category) => {
    if (category.toLowerCase() === 'graphic card') {
      return '/images/header.jpg'; // Replace with the correct image source
    } else {
      return '/images/background.jpg'; // Replace with the default image source
    }
  };

  const handleEdit = (postId) => {
    // Navigate to the update post page with the postId
    navigate(`/api/v1/post/update-posts/${postId}`);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/v1/post/delete-posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="row">
                  {posts?.map((post) => (
                    <div key={post._id} className="col-md-4 mb-4">
                      <div className="card text-white bg-light mb-3">
                        <img
                          src={getBackgroundImage(post.category)}
                          className="card-img"
                          alt="background"
                        />
                        <div className="card-img-overlay">
                          <h5 className="card-title">{post.topic}</h5>
                          <p className="card-text">{post.description}</p>
                          <p className="card-text">Category: {post.category}</p>
                          <div className="d-flex justify-content-between mt-2">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEdit(post.slug)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(post._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Posts;
