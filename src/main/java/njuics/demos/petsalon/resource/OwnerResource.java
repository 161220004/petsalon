package njuics.demos.petsalon.resource;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.springframework.hateoas.Resource;

import njuics.demos.petsalon.controller.OwnerController;
import njuics.demos.petsalon.model.Owner;

public class OwnerResource extends Resource<Owner> {
	
	public OwnerResource(Owner owner) {
		super(owner);
		add(linkTo(methodOn(OwnerController.class).getOneOwner(owner.getId())).withSelfRel());
		add(linkTo(methodOn(OwnerController.class).getAllOwners()).withRel("owners"));
	}
}
