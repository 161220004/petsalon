package njuics.demos.petsalon.repository;

import org.springframework.data.repository.CrudRepository;
import njuics.demos.petsalon.model.Owner;

//This will be AUTO IMPLEMENTED by Spring into a Bean called ownerRepository
//CRUD refers Create, Read, Update, Delete

public interface OwnerRepository extends CrudRepository<Owner, Long> {
	
}
