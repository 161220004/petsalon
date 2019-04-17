# Petsalon v1.3

1. Post：http://localhost:8080/owners

   ![1.3-post1](img/1.3-post1.png)

   

2. Post：http://localhost:8080/pets

   ![1.3-post2-1](img/1.3-post2-1.png)

   ![1.3-post2-2](img/1.3-post2-2.png)

   

3. Post：http://localhost:8080/service

   ![1.3-post3-1](img/1.3-post3-1.png)

   ![1.3-post3-2](img/1.3-post3-2.png)

   

4. Get：http://localhost:8080/service

   ![1.3-get4](img/1.3-get4.png)

   

5. Get：http://localhost:8080/pets

   ![1.3-get5-1](img/1.3-get5-1.png)

   ![1.3-get5-2](img/1.3-get5-2.png)

   

6. Get：http://localhost:8080/owners

   ![1.3-get6-1](img/1.3-get6-1.png)

   ![1.3-get6-2](img/1.3-get6-2.png)

   





# Petsalon v1.2

1. Post：http://localhost:8080/owners/add

   ![1.1-post1](img/1.1-post1.png)

   

2. Post：http://localhost:8080/pets/add

   ![1.1-post2](img/1.1-post2.png)

   

3. Post：http://localhost:8080/pets/add

   ![1.1-post3](img/1.1-post3.png)

   

4. Get：http://localhost:8080/owners/all

   ![1.1-get4](img/1.1-get4.png)

   

5. Post：http://localhost:8080/service/add

   ![1.1-post5](img/1.1-post5.png)

   

6. Post：http://localhost:8080/service/add

   ![1.1-post6](img/1.1-post6.png)

   

7. Post：http://localhost:8080/service/add

   ![1.1-post7](img/1.1-post7.png)

   

8. Get：http://localhost:8080/service/all

   ![1.1-get8](img/1.1-get8.png)

   

9. Get：http://localhost:8080/pets/all

   ![1.1-get9](img/1.1-get9.png)

   

10. Get：http://localhost:8080/owners/all

    ![1.1-get10](img/1.1-get10.png)

    

11. DataBase：Owner

    ![1.1-db-owner](img/1.1-db-owner.png)

    

12. DataBase：Pet

    ![1.1-db-pet](img/1.1-db-pet.png)

    

13. DataBase：Service

    ![1.1-db-service](img/1.1-db-service.png)

    





# Petsalon v1.0

以 <http://localhost:8080/pets/> 为例：

- Get：<http://localhost:8080/pets/all> 

  ![1.0-get0](img/1.0-get0.png)

  可见，当前数据库为空，可查看数据库：

  ![1.0-db0](img/1.0-db0.png)

  

- Post：http://localhost:8080/pets/add

  ![1.0-post1](img/1.0-post1.png)

  成功传上了一个名为“Little White”的猫，查看数据库：

  ![1.0-db1](img/1.0-db1.png)

  刷新网页 <http://localhost:8080/pets/all>，可以看到：

  ![1.0-web1](img/1.0-web1.png)

  

- 终止程序，再次查看数据库，数据没有消失，持久化存储成功



