package njuics.demos.petsalon.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data // create all the getters, setters, equals, hash, and toString methods, based on the fields
@Entity // This tells Hibernate to make a table out of this class
public class Pet {

    private @Id @GeneratedValue Long id;
    private String name;
    private PetType type;
    
    Pet(){
        this.name = "";
        this.type = PetType.Cat;
    }
	Pet(String name, PetType type) {
		this.name = name;
		this.type = type;
    }
}
