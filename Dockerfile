# Base Image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose server port
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
