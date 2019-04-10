package njuics.demos.petsalon.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data // create all the getters, setters, equals, hash, and toString methods, based on the fields
@Entity // This tells Hibernate to make a table out of this class
public class Service {

    private @Id @GeneratedValue Long id;
    private Date date;
    private double fee;
    private ServiceCategory category;
    
    Service(){
        this.date = new Date();
        this.fee = 0;
		this.category = ServiceCategory.Examination;
    }
    Service(Date date, double fee, ServiceCategory category) {
		this.date = date;
		this.fee = fee;
		this.category = category;
    }
}
