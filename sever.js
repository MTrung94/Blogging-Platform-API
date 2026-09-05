import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request body

// In-Memory Database (Initial sample data)
let posts = [
  {
    id: 1,
    title: 'First Blog Post',
    content: 'This is the content of the first blog post.',
    category: 'Tech',
    tags: ['Nodejs', 'Express'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
let nextId = 2;

// ==========================================
// API ROUTES
// ==========================================

// 1. POST /posts - Create a new blog post
app.post('/posts', (req, res) => {
  const { title, content, category, tags } = req.body;

  // Input Validation
  if (!title || !content || !category) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation Error: Title, content, and category are required.'
    });
  }

  const newPost = {
    id: nextId++,
    title,
    content,
    category,
    tags: Array.isArray(tags) ? tags : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  posts.push(newPost);
  return res.status(201).json({
    status: 'success',
    data: newPost
  });
});

// 2. GET /posts - Fetch all posts or search by term (?term=keyword)
app.get('/posts', (req, res) => {
  const { term } = req.query;

  if (term) {
    const searchTerm = term.toLowerCase();
    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
    );
    return res.status(200).json({
      status: 'success',
      results: filteredPosts.length,
      data: filteredPosts
    });
  }

  return res.status(200).json({
    status: 'success',
    results: posts.length,
    data: posts
  });
});

// 3. GET /posts/:id - Fetch a single post by ID
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({
      status: 'fail',
      message: `Post with ID ${id} not found.`
    });
  }

  return res.status(200).json({
    status: 'success',
    data: post
  });
});

// 4. PUT /posts/:id - Update an existing post
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content, category, tags } = req.body;

  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Post with ID ${id} not found.`
    });
  }

  // Input Validation
  if (!title || !content || !category) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation Error: Title, content, and category are required.'
    });
  }

  const updatedPost = {
    ...posts[postIndex],
    title,
    content,
    category,
    tags: Array.isArray(tags) ? tags : posts[postIndex].tags,
    updatedAt: new Date().toISOString()
  };

  posts[postIndex] = updatedPost;

  return res.status(200).json({
    status: 'success',
    data: updatedPost
  });
});

// 5. DELETE /posts/:id - Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Post with ID ${id} not found.`
    });
  }

  posts.splice(postIndex, 1);
  return res.status(204).send();
});

// Fallback Route for Undefined Paths (404)
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
