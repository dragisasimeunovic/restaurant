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
@Table(name="restorani")
public class Restaurant implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name="ime")
	private String ime;
	
	@Column(name="tip")
	private String tip;
	
	@Column(name="ocena")
	private Integer ocena;
	
	@OneToMany(mappedBy = "restaurant" , fetch = FetchType.EAGER)
	private Collection<Tablee> tables;

	public Restaurant() {
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public Integer getOcena() {
		return ocena;
	}

	public void setOcena(Integer ocena) {
		this.ocena = ocena;
	}

	public Collection<Tablee> getTables() {
		return tables;
	}

	public void setTables(Collection<Tablee> tables) {
		this.tables = tables;
	}

	
	
	
}
