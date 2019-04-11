package njuics.demos.petsalon.repository;

import org.springframework.data.repository.CrudRepository;
import njuics.demos.petsalon.model.Service;

//This will be AUTO IMPLEMENTED by Spring into a Bean called serviceRepository
//CRUD refers Create, Read, Update, Delete

public interface ServiceRepository extends CrudRepository<Service, Integer> {
	
}
