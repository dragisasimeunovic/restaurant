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
@Table(name = "drink")
public class Drink implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "idDrinkCategory")
    private Integer idDrinkCategory;
	
	@Column(name = "drinkName")
    private String drinkName;
	
	@Column(name = "drinkDescription")
    private String drinkDescription;
	
	@Column(name = "price")
    private Integer price;
	
	@ManyToOne
	private DrinkCategory dCategory;
	
	public Drink() {
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdDrinkCategory() {
		return idDrinkCategory;
	}

	public void setIdDrinkCategory(Integer idDrinkCategory) {
		this.idDrinkCategory = idDrinkCategory;
	}

	public String getDrinkName() {
		return drinkName;
	}

	public void setDrinkName(String drinkName) {
		this.drinkName = drinkName;
	}

	public String getDrinkDescription() {
		return drinkDescription;
	}

	public void setDrinkDescription(String drinkDescription) {
		this.drinkDescription = drinkDescription;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	
	public DrinkCategory getdCategory() {
		return dCategory;
	}

	@JsonIgnore
	public void setdCategory(DrinkCategory dCategory) {
		this.dCategory = dCategory;
	}

	
	

}
