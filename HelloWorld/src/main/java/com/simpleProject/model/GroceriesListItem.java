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
@Table(name = "groceriesListItem")
public class GroceriesListItem implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@ManyToOne
	private Groceries groceries;
	
	@Column(name = "quantity")
    private Integer quantity;
	
	@ManyToOne
	private GroceriesList gl;
	
	
	public GroceriesListItem() {

	}


	public Groceries getGroceries() {
		return groceries;
	}


	public void setGroceries(Groceries groceries) {
		this.groceries = groceries;
	}


	public Integer getQuantity() {
		return quantity;
	}


	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public GroceriesList getGl() {
		return gl;
	}

	@JsonIgnore
	public void setGl(GroceriesList gl) {
		this.gl = gl;
	}
	
	

}
