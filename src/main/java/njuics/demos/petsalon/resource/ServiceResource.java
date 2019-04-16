package njuics.demos.petsalon.resource;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.springframework.hateoas.Resource;

import njuics.demos.petsalon.controller.ServiceController;
import njuics.demos.petsalon.model.Service;

public class ServiceResource extends Resource<Service> {

	public ServiceResource(Service service) {
		super(service);
		add(linkTo(methodOn(ServiceController.class).getOneService(service.getId())).withSelfRel());
		add(linkTo(methodOn(ServiceController.class).getAllService()).withRel("service"));
	}
}
