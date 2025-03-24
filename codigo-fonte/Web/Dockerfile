# Base stage with Node.js 18 Alpine image
FROM public.ecr.aws/docker/library/node:18-alpine AS base

# Install libc6-compat package (required by some Node.js packages)
RUN apk add --no-cache libc6-compat

# Set working directory inside the container
WORKDIR /app

# Copy package.json, .env, and .npmrc files to the working directory
COPY package.json .env .npmrc ./

# Install dependencies using Yarn, with a frozen lockfile
RUN yarn --frozen-lockfile

# Builder stage
FROM base as builder

# Set working directory inside the container
WORKDIR /app

# Copy all files from the host to the container
COPY . .

# Remove .npmrc file (not needed in production)
RUN rm .npmrc

# Build the project
RUN yarn build

# Production stage
FROM base as production

# Set working directory inside the container
WORKDIR /app

# Install dependencies using Yarn, with a frozen lockfile
RUN yarn install --frozen-lockfile

# Create a nodejs user with the specified UID and GID
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Switch to the nextjs user
USER nextjs

# Copy files from the builder stage to the production stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Set the default command to start the application
CMD ["npm", "run", "start"]
