import PostModel from '../models/postsModel.js';
import slugify from 'slugify';

export const createPostController = async (req, res) => {
    try {
        const { topic, description, category } = req.body;

        const existingTopicPost = await PostModel.findOne({ topic });

        if (existingTopicPost) {
            return res.status(200).json({
                success: true,
                message: "Topic already exists",
            });
        }

        const newPost = new PostModel({
            topic,
            slug: slugify(topic),
            description,
            category,
        });

        await newPost.save();

        res.status(201).json({
            success: true,
            message: 'Post successfully created',
            data: newPost,
        });
    } catch (error) {
        console.error(error);

        let errorMessage = 'Error in creating the post';
        let statusCode = 500;

        if (error.name === 'ValidationError') {
            errorMessage = 'Validation error. Please check your input.';
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            error,
            message: errorMessage,
        });
    }
};

export const getPostController = async (req, res) => {
    try {
        const posts = await PostModel.find({});

        res.status(200).json({
            success: true,
            message: 'All posts retrieved successfully',
            data: posts,
        });
    } catch (error) {
        console.error(error);

        let errorMessage = 'Error in getting the posts';
        let statusCode = 500;

        if (error.name === 'ValidationError') {
            errorMessage = 'Validation error. Please check your input.';
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            error,
            message: errorMessage,
        });
    }
};

export const getSinglePostController = async (req, res) => {
    try {
        const post = await PostModel.findOne({ slug: req.params.slug });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'One post retrieved successfully',
            data: post,
        });
    } catch (error) {
        console.error(error);

        let errorMessage = 'Error in getting the post';
        let statusCode = 500;

        if (error.name === 'ValidationError') {
            errorMessage = 'Validation error. Please check your input.';
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            error,
            message: errorMessage,
        });
    }
};

export const updatePostController = async (req, res) => {
    try {
        const postId = req.params.id;
        const { topic, description, category } = req.body;

        // Perform validation or any necessary checks before updating

        // Assuming you have a PostModel
        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { topic, description, category },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: updatedPost,
        });
    } catch (error) {
        console.error(error);

        let errorMessage = 'Error in updating the post';
        let statusCode = 500;

        if (error.name === 'ValidationError') {
            errorMessage = 'Validation error. Please check your input.';
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            error,
            message: errorMessage,
        });
    }
};

export const deletePostController = async (req, res) => {
    try {
        const postId = req.params.id;

        // Assuming you have a PostModel
        const deletedPost = await PostModel.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: deletedPost,
        });
    } catch (error) {
        console.error(error);

        let errorMessage = 'Error in deleting the post';
        let statusCode = 500;

        if (error.name === 'ValidationError') {
            errorMessage = 'Validation error. Please check your input.';
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            error,
            message: errorMessage,
        });
    }
};