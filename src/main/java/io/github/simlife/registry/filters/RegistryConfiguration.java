package io.github.simlife.registry.filters;

import io.github.simlife.config.SimlifeProperties;
import io.github.simlife.registry.filters.accesscontrol.AccessControlFilter;
import io.github.simlife.registry.filters.responserewriting.SwaggerBasePathRewritingFilter;
import org.springframework.cloud.netflix.zuul.filters.RouteLocator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RegistryConfiguration {

    @Configuration
    public static class SwaggerBasePathRewritingConfiguration {

        @Bean
        public SwaggerBasePathRewritingFilter swaggerBasePathRewritingFilter(){
            return new SwaggerBasePathRewritingFilter();
        }
    }

    @Configuration
    public static class AccessControlFilterConfiguration {

        @Bean
        public AccessControlFilter accessControlFilter(RouteLocator routeLocator, SimlifeProperties jSimlifeProperties){
            return new AccessControlFilter(routeLocator, jSimlifeProperties);
        }
    }

}
