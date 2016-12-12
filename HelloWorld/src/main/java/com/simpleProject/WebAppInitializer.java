package com.simpleProject;

//heroku
//freeMySQLHosting
//db4free
//h2 nije baza kao ovaj gore, koristiti jedino ako ne budemo mogli nijednu drugu
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@EnableAutoConfiguration
@ComponentScan
@SpringBootApplication
public class WebAppInitializer{


    public static void main(String[] args) throws Exception{
        SpringApplication.run(WebAppInitializer.class, args);
    }
}