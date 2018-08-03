package io.github.simlife.registry.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Simlife.
 *
 * <p>
 *     Properties are configured in the application.yml file.
 * </p>
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

}
