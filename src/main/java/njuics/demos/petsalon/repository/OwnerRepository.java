package njuics.demos.petsalon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import njuics.demos.petsalon.model.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

}
