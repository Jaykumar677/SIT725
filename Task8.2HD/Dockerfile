# Use Node.js LTS image
FROM node:18

# Set app directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all remaining files
COPY . .

# Expose the app port (your app runs on port 3000)
EXPOSE 3000

# Start the server
CMD ["node", "app.js"]
