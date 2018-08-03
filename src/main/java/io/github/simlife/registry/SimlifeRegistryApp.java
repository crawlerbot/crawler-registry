package io.github.simlife.registry;

import io.github.simlife.registry.config.ApplicationProperties;
import io.github.simlife.registry.config.DefaultProfileUtil;

import io.github.simlife.config.SimlifeConstants;

import io.github.simlife.registry.config.ApplicationProperties;
import io.github.simlife.registry.config.DefaultProfileUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;

@EnableEurekaServer
@EnableConfigServer
@SpringBootApplication
@EnableConfigurationProperties({ApplicationProperties.class})
@EnableDiscoveryClient
@EnableZuulProxy
public class SimlifeRegistryApp {

    private static final Logger log = LoggerFactory.getLogger(SimlifeRegistryApp.class);

    private final Environment env;

    public SimlifeRegistryApp(Environment env) {
        this.env = env;
    }

    /**
     * Initializes SimlifeRegistry.
     * <p>
     * Spring profiles can be configured with a program arguments --spring.profiles.active=your-active-profile
     * <p>
     * You can find more information on how profiles work with Simlife on <a href="http://www.simlife.io/profiles/">http://www.simlife.io/profiles/</a>.
     */
    @PostConstruct
    public void initApplication() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains(SimlifeConstants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(SimlifeConstants.SPRING_PROFILE_PRODUCTION)) {
            log.error("You have misconfigured your application! It should not run " +
                "with both the 'dev' and 'prod' profiles at the same time.");
        }
        if (activeProfiles.contains(SimlifeConstants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(SimlifeConstants.SPRING_PROFILE_CLOUD)) {
            log.error("You have misconfigured your application! It should not" +
                "run with both the 'dev' and 'cloud' profiles at the same time.");
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments
     * @throws UnknownHostException if the local host name could not be resolved into an address
     */
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SimlifeRegistryApp.class);
        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (Exception e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info("\n----------------------------------------------------------\n\t" +
                "Application '{}' is running! Access URLs:\n\t" +
                "Local: \t\t{}://localhost:{}\n\t" +
                "External: \t{}://{}:{}\n\t" +
                "Profile(s): \t{}\n----------------------------------------------------------",
            env.getProperty("spring.application.name"),
            protocol,
            env.getProperty("server.port"),
            protocol,
            hostAddress,
            env.getProperty("server.port"),
            env.getActiveProfiles());

        String secretKey = env.getProperty("simlife.security.authentication.jwt.secret");
        if (secretKey == null ) {
            log.error("\n----------------------------------------------------------\n" +
                "Your JWT secret key is not set up, you will not be able to log into the Simlife.\n"+
                "Please read the documentation at http://www.simlife.io/simlife-registry/\n" +
                "----------------------------------------------------------");
        } else if ("this-secret-should-not-be-used-read-the-comment".equals(secretKey)) {
            log.error("\n----------------------------------------------------------\n" +
                "Your JWT secret key is not configured using Spring Cloud Config, you will not be able to \n"+
                "use the Simlife Registry dashboards to monitor external applications. \n" +
                "Please read the documentation at http://www.simlife.io/simlife-registry/\n" +
                "----------------------------------------------------------");
        }
    }
}
