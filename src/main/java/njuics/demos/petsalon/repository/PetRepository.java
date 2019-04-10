package njuics.demos.petsalon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import njuics.demos.petsalon.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {

}
