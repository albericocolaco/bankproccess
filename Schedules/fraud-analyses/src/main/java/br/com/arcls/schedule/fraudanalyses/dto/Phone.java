package br.com.arcls.schedule.fraudanalyses.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Phone implements Serializable {

    private static final long serialVersionUID = 1L;

    @JsonProperty("areaCode")
    private String areaCode;
    @JsonProperty("phone")
    private String phone;

}
