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
@Table(name = "drinkOrderItem")
public class DrinkOrderItem implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@ManyToOne
    private Drink drink;
	
	@Column(name = "preparationDeadline")
    private String preparationDeadline;
	
	@Column(name = "isPrepared")
    private Boolean isPrepared;
	
	@Column(name = "quantity")
	private Integer quantity;
	
	@Column(name = "price")
	private Integer price;
	
	@ManyToOne 
	private DrinkOrderList drinkOrderList;
	
	public DrinkOrderItem() {
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Drink getDrink() {
		return drink;
	}

	public void setDrink(Drink drink) {
		this.drink = drink;
	}

	public String getPreparationDeadline() {
		return preparationDeadline;
	}

	public void setPreparationDeadline(String preparationDeadline) {
		this.preparationDeadline = preparationDeadline;
	}

	public Boolean isPrepared() {
		return isPrepared;
	}

	public void setPrepared(Boolean isPrepared) {
		this.isPrepared = isPrepared;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public DrinkOrderList getDrinkOrderList() {
		return drinkOrderList;
	}

	@JsonIgnore
	public void setDrinkOrderList(DrinkOrderList drinkOrderList) {
		this.drinkOrderList = drinkOrderList;
	}

	public Boolean getIsPrepared() {
		return isPrepared;
	}

	public void setIsPrepared(Boolean isPrepared) {
		this.isPrepared = isPrepared;
	}
	

}
