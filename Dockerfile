FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files for faster rebuild
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Install prisma client
RUN npx prisma generate

# Jalankan development server
CMD ["npm", "run", "dev"]
