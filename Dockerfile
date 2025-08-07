FROM node:latest 
WORKDIR /app/carepointStore
COPY . /app/carepointStore/
RUN npm install
EXPOSE 3000
CMD node dist/main
LABEL Author="Mathew"