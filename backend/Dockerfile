# Use Node.js base image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD [ "node", "index.js" ]
