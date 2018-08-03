package io.github.simlife.registry.config;

import io.github.simlife.async.ExceptionHandlingAsyncTaskExecutor;
import io.github.simlife.config.SimlifeProperties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.aop.interceptor.SimpleAsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.*;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
@EnableScheduling
public class AsyncConfiguration implements AsyncConfigurer {

    private final Logger log = LoggerFactory.getLogger(AsyncConfiguration.class);

    private final SimlifeProperties jSimlifeProperties;

    public AsyncConfiguration(SimlifeProperties jSimlifeProperties) {
        this.jSimlifeProperties = jSimlifeProperties;
    }

    @Override
    @Bean(name = "taskExecutor")
    public Executor getAsyncExecutor() {
        log.debug("Creating Async Task Executor");
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(jSimlifeProperties.getAsync().getCorePoolSize());
        executor.setMaxPoolSize(jSimlifeProperties.getAsync().getMaxPoolSize());
        executor.setQueueCapacity(jSimlifeProperties.getAsync().getQueueCapacity());
        executor.setThreadNamePrefix("j-hipster-registry-Executor-");
        return new ExceptionHandlingAsyncTaskExecutor(executor);
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new SimpleAsyncUncaughtExceptionHandler();
    }
}
