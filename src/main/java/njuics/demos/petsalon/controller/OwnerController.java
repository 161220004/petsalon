package njuics.demos.petsalon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import njuics.demos.petsalon.model.Owner;
import njuics.demos.petsalon.repository.OwnerRepository;

@RestController
@RequestMapping(path="/owners") // This means URL's start with /owners
public class OwnerController {
	@Autowired // This means to get the bean called ownerRepository
               // Which is auto-generated by Spring, we will use it to handle the data
	private OwnerRepository ownerRepository;

	@PostMapping(path="/add")
	public @ResponseBody String addNewOwner (@RequestBody Owner owner) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request
		ownerRepository.save(owner);
		return "New Owner Saved";
	}
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Owner> getAllOwners() {
		// This returns a JSON or XML
		return ownerRepository.findAll();
	}
}