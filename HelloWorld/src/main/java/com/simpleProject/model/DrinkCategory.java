package com.simpleProject.model;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "drinkCategory")
public class DrinkCategory implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "idDrinkCard")
    private Integer idDrinkCard;
	
	@Column(name = "drinkCategoryName")
    private String drinkCategoryName;
	
	
	@OneToMany(mappedBy = "dCategory", fetch = FetchType.EAGER)
	private Collection<Drink> drinks;
	
	public DrinkCategory() {
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdDrinkCard() {
		return idDrinkCard;
	}

	public void setIdDrinkCard(Integer idDrinkCard) {
		this.idDrinkCard = idDrinkCard;
	}

	public String getDrinkCategoryName() {
		return drinkCategoryName;
	}

	public void setDrinkCategoryName(String drinkCategoryName) {
		this.drinkCategoryName = drinkCategoryName;
	}
	
	public Collection<Drink> getDrinks() {
		return drinks;
	}

	public void setDrinks(Collection<Drink> drinks) {
		this.drinks = drinks;
	}
	
}
