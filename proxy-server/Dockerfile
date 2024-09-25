# Sử dụng Node.js làm base image
FROM node:14

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và cài đặt các phụ thuộc
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Expose port 8080 cho Proxy server
EXPOSE 8080

# Chạy proxy.js
CMD ["node", "proxy.js"]
