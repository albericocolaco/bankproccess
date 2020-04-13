package br.com.arcls.schedule.fraudanalyses.repository;

import br.com.arcls.schedule.fraudanalyses.document.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserDocument, Long> {

}
