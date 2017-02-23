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
@Table(name = "drinkOrderList")
public class DrinkOrderList implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "isServed")
    private boolean isServed;
	
	@Column(name = "guestId")
	private String guestId;
	
	@Column(name = "restaurantId")
	private Integer restaurantId;
	
	@Column(name = "tableNumber")
	private String tableNumber;
	
	@OneToMany(mappedBy = "drinkOrderList", fetch = FetchType.EAGER)
	private Collection<DrinkOrderItem> items;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public boolean isServed() {
		return isServed;
	}

	public void setServed(boolean isServed) {
		this.isServed = isServed;
	}

	public String getGuestId() {
		return guestId;
	}

	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}

	public Integer getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Integer restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getTableNumber() {
		return tableNumber;
	}

	public void setTableNumber(String tableNumber) {
		this.tableNumber = tableNumber;
	}

	public Collection<DrinkOrderItem> getItems() {
		return items;
	}

	public void setItems(Collection<DrinkOrderItem> items) {
		this.items = items;
	}
	
	
	

}
