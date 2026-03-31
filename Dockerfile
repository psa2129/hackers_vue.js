FROM node:20 AS build
WORKDIR /app

# src 폴더 전체 복사
COPY src/ .

# src 안에 package.json 있다고 가정
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]