package njuics.demos.petsalon.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import njuics.demos.petsalon.model.Pet;
import njuics.demos.petsalon.repository.PetRepository;

@RestController
public class PetController {

	private final PetRepository repository;

	PetController(PetRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/pets")
	List<Pet> all() {
		return repository.findAll();
	}

	@PostMapping("/pets")
	void newPet(@RequestBody Pet newPet) {
		repository.save(newPet);
	}
    
}