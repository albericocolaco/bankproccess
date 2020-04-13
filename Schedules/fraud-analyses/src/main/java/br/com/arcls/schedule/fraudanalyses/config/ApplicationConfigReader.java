package br.com.arcls.schedule.fraudanalyses.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
public class ApplicationConfigReader {

    @Value("${fraud.exchange.name}")
    private String fraudExchange;

    @Value("${fraud.queue.name}")
    private String fraudQueue;

    @Value("${fraud.routing.key}")
    private String fraudRoutingKey;


    public String getFraudExchange() {
        return fraudExchange;
    }

    public String getFraudQueue() {
        return fraudQueue;
    }

    public String getFraudRoutingKey() {
        return fraudRoutingKey;
    }
}