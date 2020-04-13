package br.com.arcls.schedule.fraudanalyses.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "user")
public class UserDocument {
    @Id
    private long id;

    @Indexed(unique = true)
    private String doc;

    private String name;
    private Date birthDate;
    private String password;
    private String email;
    private String type;
    private Boolean smsValidate;
    private Boolean emailValidate;
    private Integer fraudAnalysis;
    private Integer creditAnalysis;
    private Integer documentAnalysis;
}
