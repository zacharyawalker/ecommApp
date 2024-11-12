# Use the official Node.js image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json to leverage Docker cache for dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Vite project files into the container
COPY . .

# Expose Vite's development server port (default is 5173)
EXPOSE 5173

# Start the Vite development server with host set to 0.0.0.0 for Docker compatibility
CMD ["npm", "run", "dev", "--", "--host"]