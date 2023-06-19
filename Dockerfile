# Use the official Node.js 14 base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose a port (if required)
# EXPOSE 3000

# Start the application
CMD ["npm", "start"]
