# Use official node image as the base image
FROM arm64v8/node:lts-bullseye  as build

# Set the working directory
WORKDIR "/usr/app"

# Add the source code to app
COPY "./" "/usr/app/"

# Install all the dependencies
RUN npm install --legacy-peer-deps

# Generate the build of the application
RUN npm run build-self-hosted


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.24.0

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/app/dist/front-end /usr/share/nginx/html

# Expose port 80
EXPOSE 80