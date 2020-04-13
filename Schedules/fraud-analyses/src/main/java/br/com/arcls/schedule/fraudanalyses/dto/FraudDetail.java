package br.com.arcls.schedule.fraudanalyses.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;

public final class FraudDetail implements Serializable{

    private static final long serialVersionUID = 1L;

    @JsonProperty("_id")
    private String id;
    @JsonProperty("doc")
    private String document;
    @JsonProperty("name")
    private String name;
    @JsonProperty("email")
    private String email;
    @JsonProperty("type")
    private String type;
    @JsonProperty("birthDate")
    private Date birthDate;
    @JsonProperty("fraudAnalysis")
    private Integer fraudAnalysis;
    @JsonProperty("phone")
    private Phone phone;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public Integer getFraudAnalysis() {
        return fraudAnalysis;
    }

    public void setFraudAnalysis(Integer fraudAnalysis) {
        this.fraudAnalysis = fraudAnalysis;
    }

    public Phone getPhone() {
        return phone;
    }

    public void setPhone(Phone phone) {
        this.phone = phone;
    }

    public FraudDetail(String id, String document, String name, String email, String type, Date birthDate, Integer fraudAnalysis, Phone phone) {
        this.id = id;
        this.document = document;
        this.name = name;
        this.email = email;
        this.type = type;
        this.birthDate = birthDate;
        this.fraudAnalysis = fraudAnalysis;
        this.phone = phone;
    }

    public FraudDetail() {
    }

    @Override
    public String toString() {
        return "FraudDetail{" +
                "id='" + id + '\'' +
                ", document='" + document + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", type='" + type + '\'' +
                ", birthDate=" + birthDate +
                ", fraudAnalysis=" + fraudAnalysis +
                ", phone=" + phone +
                '}';
    }
}