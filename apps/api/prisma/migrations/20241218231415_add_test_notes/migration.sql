-- Add 20 test notes
INSERT INTO Note (title, text, created_datetime, updated_datetime)
VALUES
  ('Getting Started with TypeScript', 'TypeScript adds static typing to JavaScript, making it easier to catch errors early in development.', datetime('now'), datetime('now')),
  ('React Best Practices', 'Learn about key React patterns including hooks, context, and performance optimization techniques.', datetime('now'), datetime('now')),
  ('GraphQL vs REST', 'Compare the benefits and tradeoffs between GraphQL and REST API architectures.', datetime('now'), datetime('now')),
  ('Node.js Performance Tips', 'Discover ways to optimize your Node.js applications for better performance.', datetime('now'), datetime('now')),
  ('Testing React Components', 'A comprehensive guide to testing React components using Jest and React Testing Library.', datetime('now'), datetime('now')),
  ('CSS Grid Layout Guide', 'Master CSS Grid to create complex layouts with ease and flexibility.', datetime('now'), datetime('now')),
  ('JavaScript ES6+ Features', 'Explore modern JavaScript features that make coding more efficient.', datetime('now'), datetime('now')),
  ('Docker for Developers', 'Learn how to containerize your applications using Docker.', datetime('now'), datetime('now')),
  ('Git Workflow Strategies', 'Understanding different Git workflows and when to use them.', datetime('now'), datetime('now')),
  ('API Security Best Practices', 'Implement secure API endpoints and protect against common vulnerabilities.', datetime('now'), datetime('now')),
  ('Database Optimization Tips', 'Improve database performance with indexing and query optimization.', datetime('now'), datetime('now')),
  ('Frontend State Management', 'Compare different state management solutions for frontend applications.', datetime('now'), datetime('now')),
  ('Responsive Design Patterns', 'Create websites that work seamlessly across all device sizes.', datetime('now'), datetime('now')),
  ('Web Accessibility Guide', 'Make your web applications accessible to all users.', datetime('now'), datetime('now')),
  ('Microservices Architecture', 'Understanding microservices and their implementation patterns.', datetime('now'), datetime('now')),
  ('CI/CD Pipeline Setup', 'Set up continuous integration and deployment for your projects.', datetime('now'), datetime('now')),
  ('WebSocket Implementation', 'Add real-time features to your application using WebSockets.', datetime('now'), datetime('now')),
  ('Code Review Guidelines', 'Best practices for conducting effective code reviews.', datetime('now'), datetime('now')),
  ('Error Handling Patterns', 'Implement robust error handling in your applications.', datetime('now'), datetime('now')),
  ('Performance Monitoring', 'Tools and techniques for monitoring application performance.', datetime('now'), datetime('now'));
