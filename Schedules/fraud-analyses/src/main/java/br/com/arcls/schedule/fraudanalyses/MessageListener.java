package br.com.arcls.schedule.fraudanalyses;

import br.com.arcls.schedule.fraudanalyses.config.ApplicationConfigReader;
import br.com.arcls.schedule.fraudanalyses.dto.FraudDetail;
import br.com.arcls.schedule.fraudanalyses.repository.UserRepository;
import br.com.arcls.schedule.fraudanalyses.util.ApplicationConstant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;


@Service
public class MessageListener {

    private static final Logger log = LoggerFactory.getLogger(MessageListener.class);

    @Autowired
    ApplicationConfigReader applicationConfigReader;

    @Autowired
    UserRepository userRepository;

    @RabbitListener(queues = "${fraud.queue.name}")
    public void receiveMessageForFraud(final FraudDetail data) {
        log.info("Received message: " + data);
        try {
            //TODO: Code to make REST call
        } catch(HttpClientErrorException  ex) {
            if(ex.getStatusCode() == HttpStatus.NOT_FOUND) {
                log.info("Delay...");
                try {
                    Thread.sleep(ApplicationConstant.MESSAGE_RETRY_DELAY);
                } catch (InterruptedException e) { }
                log.info("Throwing exception so that message will be requed in the queue.");
                throw new RuntimeException();
            } else {
                throw new AmqpRejectAndDontRequeueException(ex);
            }

        } catch(Exception e) {
            log.error("Internal server error occurred in python server. Bypassing message requeue {}", e);
            throw new AmqpRejectAndDontRequeueException(e);
        }

    }


}