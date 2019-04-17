package njuics.demos.petsalon.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity // This tells Hibernate to make a table out of this class
public class Owner {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    
    private String name;

	@JsonBackReference // 防止双向关联死循环
    @OneToMany(targetEntity=Pet.class, cascade=CascadeType.ALL)
	@JoinColumn(name="owner", referencedColumnName = "id")
    private Set<Pet> petSet; // 宠物集合
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Set<Pet> getPetSet() {
		return petSet;
	}
	public void setPetSet(Set<Pet> petSet) {
		this.petSet = petSet;
	}
}
