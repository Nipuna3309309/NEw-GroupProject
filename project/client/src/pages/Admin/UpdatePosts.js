// UpdatePosts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';

const UpdatePosts = ({ fetchPosts }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Fetch the existing post data using postId and populate the form
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/v1/post/get-posts/${postId}`);
        const postData = response.data.data;
        setTopic(postData.topic);
        setDescription(postData.description);
        setCategory(postData.category);
      } catch (error) {
        console.error('Error fetching post data:', error);
        toast.error('Failed to fetch post data. Please try again.');
      }
    };

    fetchPostData();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/post/update-posts/${postId}`, {
        topic,
        description,
        category,
      });

      if (data?.success) {
        console.log(`${topic} is updated`);
        fetchPosts();

        // Display success toast message
        toast.success('Post updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });

        // Navigate back to All Posts after successful update
        navigate('/get-posts');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title={'Dashboard - Update Post'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Post</h1>
          
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="topic" className="form-label">Topic</label>
                <input type="text" id="topic" className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" className="form-control" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" id="category" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePosts;
