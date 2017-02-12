package com.simpleProject;

//heroku
//freeMySQLHosting
//db4free
//h2 nije baza kao ovaj gore, koristiti jedino ako ne budemo mogli nijednu drugu
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/*@EnableAutoConfiguration*/
/*@ComponentScan*/
/*@EnableJpaRepositories*/
@SpringBootApplication
public class WebAppInitializer{


    public static void main(String[] args) throws Exception{
        SpringApplication.run(WebAppInitializer.class, args);
    }
}