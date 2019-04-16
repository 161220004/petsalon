package njuics.demos.petsalon.resource;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.springframework.hateoas.Resource;

import njuics.demos.petsalon.controller.PetController;
import njuics.demos.petsalon.model.Pet;

public class PetResource extends Resource<Pet> {

	public PetResource(Pet pet) {
		super(pet);
		add(linkTo(methodOn(PetController.class).getOnePet(pet.getId())).withSelfRel());
		add(linkTo(methodOn(PetController.class).getAllPets()).withRel("pets"));
	}
}
