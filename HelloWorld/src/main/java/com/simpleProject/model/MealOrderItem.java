package com.simpleProject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "mealOrderItem")
public class MealOrderItem {
	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@ManyToOne
    private Meal meal;
	
	@Column(name = "preparationDeadline")
    private String preparationDeadline;
	
	@Column(name = "isPrepared")
    private Boolean isPrepared;
	
	@Column(name = "isPreparing")
    private Boolean isPreparing;
	
	@Column(name = "quantity")
	private Integer quantity;
	
	@Column(name = "price")
	private Integer price;
	
	@ManyToOne 
	private MealOrderList mealOrderList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Meal getMeal() {
		return meal;
	}

	public void setMeal(Meal meal) {
		this.meal = meal;
	}

	public String getPreparationDeadline() {
		return preparationDeadline;
	}

	public void setPreparationDeadline(String preparationDeadline) {
		this.preparationDeadline = preparationDeadline;
	}

	public Boolean getIsPrepared() {
		return isPrepared;
	}

	public void setIsPrepared(Boolean isPrepared) {
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

	public MealOrderList getMealOrderList() {
		return mealOrderList;
	}

	@JsonIgnore
	public void setMealOrderList(MealOrderList mealOrderList) {
		this.mealOrderList = mealOrderList;
	}

	public Boolean getIsPreparing() {
		return isPreparing;
	}

	public void setIsPreparing(Boolean isPreparing) {
		this.isPreparing = isPreparing;
	}
	

}
