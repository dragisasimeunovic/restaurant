package com.simpleProject.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "meal")
public class Meal implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "idMenuCategory")
    private Integer idMenuCategory;
	
	public Meal() {
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdMenuCategory() {
		return idMenuCategory;
	}

	public void setIdMenuCategory(Integer idMenuCategory) {
		this.idMenuCategory = idMenuCategory;
	}

	public Meal(Integer id, Integer idMenuCategory) {
		super();
		this.id = id;
		this.idMenuCategory = idMenuCategory;
	}

}
