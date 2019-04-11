package njuics.demos.petsalon.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity // This tells Hibernate to make a table out of this class
public class Service {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    
    private Date date;
    
    private Double fee;
    
    private ServiceCategory category;
/*    
	@JsonBackReference // 防止双向关联死循环
	@ManyToOne(targetEntity=Pet.class)
    @JoinColumn(name="pet", referencedColumnName = "id")
    private Pet pet; // 对应宠物
*/
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Double getFee() {
		return fee;
	}
	public void setFee(Double fee) {
		this.fee = fee;
	}
	public ServiceCategory getCategory() {
		return category;
	}
	public void setCategory(ServiceCategory category) {
		this.category = category;
	}
	/*
	public Pet getPet() {
		return pet;
	}
	public void setPet(Pet pet) {
		this.pet = pet;
	}
	*/
}
