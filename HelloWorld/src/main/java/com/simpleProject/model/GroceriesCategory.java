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
@Table(name = "groceriesCategory")
public class GroceriesCategory implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "categoryName")
    private String categoryName;
	
	@OneToMany(mappedBy = "gCategory", fetch = FetchType.EAGER)
	private Collection<Groceries> groceries;
	
	public GroceriesCategory() {
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Collection<Groceries> getGroceries() {
		return groceries;
	}

	public void setGroceries(Collection<Groceries> groceries) {
		this.groceries = groceries;
	}
	
	

}
