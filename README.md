# Các bước bắt đầu

- [Các bước bắt đầu](#các-bước-bắt-đầu)
  - [1. MySQL](#1-mysql)
  - [2. Chạy App](#2-chạy-app)
    - [Production](#production)
    - [Development](#development)
  - [3. Swagger](#3-swagger)

## 1. MySQL

```jsx
docker-compose up --force-recreate --build -d


# dump
docker exec mysql-nodejs /usr/bin/mysqldump -u root --password=123456 nodejs > backup.sql

# import sql file
docker exec -i mysql-nodejs mysql -h127.0.0.1 -uroot -p123456 mysql < ./prisma/sakila-mysql.sql
```

Chạy MySQL

Mở navicat và execute file `prisma/sakila-mysql.sql`

![image](https://user-images.githubusercontent.com/40380704/195895495-f7b855ac-4235-40f6-b79b-b34a1892b4df.png)

Hiển thị như thế này là thành công

![image](https://user-images.githubusercontent.com/40380704/195895845-c736c337-216d-4ca5-aae1-0eaf9a1320f1.png)

## 2. Chạy App

### Production

```jsx
yarn start
# or npm run start
```

### Development

```jsx
yarn dev 
# or npm run dev
```

## 3. Swagger

💡 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

![Screen Shot 2022-10-14 at 23 25 11](https://user-images.githubusercontent.com/40380704/195895043-ce388c46-fb51-4fb1-91dd-ece5290b0c2b.png)
[![Youtube Video](https://img.youtube.com/vi/SoKLEQ4UwFs/0.jpg)](https://www.youtube.com/watch?v=SoKLEQ4UwFso)
