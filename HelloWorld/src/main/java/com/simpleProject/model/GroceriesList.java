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
@Table(name = "groceriesList")
public class GroceriesList implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	
	@Column(name = "listName")
    private String listName;
	
	@Column(name = "restaurantId")
    private Integer restaurantId;
	
	
	@Column(name = "startingTime")
    private String startingTime;
	
	@Column(name = "endingTime")
    private String endingTime;
	
	@OneToMany(mappedBy = "gl", fetch = FetchType.EAGER)
	private Collection<GroceriesListItem> items;
	
	@OneToMany(mappedBy = "gl", fetch = FetchType.LAZY)
	private Collection<Offer> offers;
	
	@Column(name = "active")
    private boolean active;
	
	public GroceriesList() {

	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Integer getRestaurantId() {
		return restaurantId;
	}


	public void setRestaurantId(Integer restaurantId) {
		this.restaurantId = restaurantId;
	}


	public String getStartingTime() {
		return startingTime;
	}


	public void setStartingTime(String startingTime) {
		this.startingTime = startingTime;
	}


	public String getEndingTime() {
		return endingTime;
	}


	public void setEndingTime(String endingTime) {
		this.endingTime = endingTime;
	}


	public Collection<GroceriesListItem> getItems() {
		return items;
	}


	public void setItems(Collection<GroceriesListItem> items) {
		this.items = items;
	}


	public String getListName() {
		return listName;
	}


	public void setListName(String listName) {
		this.listName = listName;
	}


	public Collection<Offer> getOffers() {
		return offers;
	}


	public void setOffers(Collection<Offer> offers) {
		this.offers = offers;
	}


	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
	}

}
