package com.simpleProject.controllers;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {


    @RequestMapping(
            value = "/hello",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArrayList<String>> getBartenders() {
    	ArrayList<String> lista =  new ArrayList<String>();
    	lista.add("aaa");
        return new ResponseEntity <ArrayList <String>>(lista, HttpStatus.OK);
    }

}
