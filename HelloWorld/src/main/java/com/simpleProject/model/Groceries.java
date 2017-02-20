package com.simpleProject.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "groceries")
public class Groceries implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "groceriesName")
    private String groceriesName;
	
	@ManyToOne
	private GroceriesCategory gCategory;
	
	public Groceries() {
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGroceriesName() {
		return groceriesName;
	}

	public void setGroceriesName(String groceriesName) {
		this.groceriesName = groceriesName;
	}

	public GroceriesCategory getgCategory() {
		return gCategory;
	}

	@JsonIgnore
	public void setgCategory(GroceriesCategory gCategory) {
		this.gCategory = gCategory;
	}
	
	

}
