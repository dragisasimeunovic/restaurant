package com.simpleProject.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "drinkOrder")
public class DrinkOrder implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "guestId")
    private String guestId;
	
	@ManyToOne
    private Drink drink;
	
	@Column(name = "preparationDeadline")
    private String preparationDeadline;
	
	@Column(name = "isPrepared")
    private boolean isPrepared;
	
	public DrinkOrder() {
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGuestId() {
		return guestId;
	}

	public void setGuestId(String guestId) {
		this.guestId = guestId;
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

	public boolean isPrepared() {
		return isPrepared;
	}

	public void setPrepared(boolean isPrepared) {
		this.isPrepared = isPrepared;
	}
	
	
	

}
