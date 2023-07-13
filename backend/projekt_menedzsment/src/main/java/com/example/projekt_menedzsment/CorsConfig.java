package com.example.projekt_menedzsment;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:8080") // Engedélyezett eredeti domainek
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // Engedélyezett HTTP metódusok
                        .allowedHeaders("*") // Engedélyezett fejlécek
                        .allowCredentials(true); // Hitelesítés engedélyezése (ha szükséges)
            }
        };
    }
}
