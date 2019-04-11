package njuics.demos.petsalon.repository;

import org.springframework.data.repository.CrudRepository;
import njuics.demos.petsalon.model.Pet;

//This will be AUTO IMPLEMENTED by Spring into a Bean called petRepository
//CRUD refers Create, Read, Update, Delete

public interface PetRepository extends CrudRepository<Pet, Integer> {

}
