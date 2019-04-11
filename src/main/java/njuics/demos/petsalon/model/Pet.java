package njuics.demos.petsalon.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity // This tells Hibernate to make a table out of this class
public class Pet {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    private PetType type;
    
	@JsonBackReference // 防止双向关联死循环
	@ManyToOne(targetEntity=Owner.class)
    @JoinColumn(name="owner", referencedColumnName = "id")
    private Owner owner; // 对应主人
/*
	@JsonBackReference // 防止双向关联死循环
    @OneToMany(targetEntity=Service.class, cascade=CascadeType.ALL, mappedBy="pet")
    private List<Service> serviceList; // 服务列表
*/    
	
	

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
	public PetType getType() {
		return type;
	}
	public void setType(PetType type) {
		this.type = type;
	}
	public Owner getOwner() {
		return owner;
	}
	public void setOwner(Owner owner) {
		this.owner = owner;
	}
	/*
	public List<Service> getServiceList() {
		return serviceList;
	}
	public void setServiceList(List<Service> serviceList) {
		this.serviceList = serviceList;
	}
	*/
}

