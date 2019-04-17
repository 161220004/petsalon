package njuics.demos.petsalon.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import njuics.demos.petsalon.model.Owner;
import njuics.demos.petsalon.repository.OwnerRepository;

@RestController
@RequestMapping(path="/api") // This means URL's start with /api
public class OwnerController {
	@Autowired 
	private OwnerRepository ownerRepository;

	private static Resource<Owner> toResource(Owner owner) {
		return new Resource<>(owner,
				linkTo(methodOn(OwnerController.class).getOneOwner(owner.getId())).withSelfRel(),
				linkTo(methodOn(OwnerController.class).getAllOwners()).withRel("owners"));
	}
	
	@GetMapping(path="/owners")
	public @ResponseBody 
	List<Resource<Owner>> getAllOwners() {
		// 先将 ownerRepository.findAll() 从 Iterable<> 转换为 List<>
		Iterable<Owner> ownersIt = ownerRepository.findAll();
		List<Owner> ownersLs = new ArrayList<>();
		ownersIt.forEach(i -> { ownersLs.add(i); });
		
		List<Resource<Owner>> owners = ownersLs.stream().map(
				owner -> toResource(owner)
				).collect(Collectors.toList());
		
		return owners;
	}
	
	@GetMapping("/owners/{id}")
	public @ResponseBody 
	Resource<Owner> getOneOwner(@PathVariable Integer id) {
		Owner owner = ownerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException());
		return toResource(owner);
	}
	
	@PostMapping(path="/owners")
	public @ResponseBody 
	Owner addNewOwner (@RequestBody Owner owner) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request
		ownerRepository.save(owner);
		return owner;
	}
	
	@PutMapping("/owners/{id}")
	public @ResponseBody 
	Owner replaceOwner(@RequestBody Owner newOwner, @PathVariable Integer id) {
		
		return ownerRepository.findById(id)
			.map(owner -> {
				owner.setName(newOwner.getName());
				return ownerRepository.save(owner);
			})
			.orElseGet(() -> {
				newOwner.setId(id);
				return ownerRepository.save(newOwner);
			});
	}

	@DeleteMapping("/owners/{id}")
	public @ResponseBody 
	Owner deleteOwner(@PathVariable Integer id) {
		Owner owner = ownerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException());
		ownerRepository.deleteById(id);
		return owner;
	}
}