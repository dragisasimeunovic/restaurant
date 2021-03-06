package com.simpleProject.model;


import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "korisnici")
public class Korisnik implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @Column(name = "email")
    private String email;

    @Column(name = "ime")
    private String ime;

    @Column(name = "prezime")
    private String prezime;

    @Column(name = "lozinka")
    private String lozinka;

    @Column(name = "tip")
    private String tip;
    
    @Column(name="dateOfBirth")
    private String dateOfBirth;
    
    @Column(name = "dressSize")
    private String dressSize;
    
    @Column(name="footwearSize")
    private Integer footwearSize;
    
    @Column(name="restoran")
    private Integer restoran;
    
    @Column(name = "firstLogin")
    private Integer firstLogin;
    
    @Column(name = "activated")
    private Boolean activated;
    
    @Column(name = "menuCategoryId")
    private Integer menuCategoryId;
    
    public Korisnik() {
		
	}
    

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public String getLozinka() {
		return lozinka;
	}

	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}


	public String getDateOfBirth() {
		return dateOfBirth;
	}


	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}


	public String getDressSize() {
		return dressSize;
	}


	public void setDressSize(String dressSize) {
		this.dressSize = dressSize;
	}


	public Integer getFootwearSize() {
		return footwearSize;
	}


	public void setFootwearSize(Integer footwearSize) {
		this.footwearSize = footwearSize;
	}


	public Integer getRestoran() {
		return restoran;
	}


	public void setRestoran(Integer restoran) {
		this.restoran = restoran;
	}


	public Integer getFirstLogin() {
		return firstLogin;
	}


	public void setFirstLogin(Integer firstLogin) {
		this.firstLogin = firstLogin;
	}


	public Boolean getActivated() {
		return activated;
	}


	public void setActivated(Boolean activated) {
		this.activated = activated;
	}


	public Integer getMenuCategoryId() {
		return menuCategoryId;
	}


	public void setMenuCategoryId(Integer menuCategoryId) {
		this.menuCategoryId = menuCategoryId;
	}
 
   
}