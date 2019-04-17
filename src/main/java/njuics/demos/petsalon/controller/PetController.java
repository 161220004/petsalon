package njuics.demos.petsalon.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import njuics.demos.petsalon.model.Pet;
import njuics.demos.petsalon.repository.PetRepository;
import njuics.demos.petsalon.repository.OwnerRepository;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /api
public class PetController {
	@Autowired 
	private OwnerRepository ownerRepository;
	@Autowired
	private PetRepository petRepository;

	private static Resource<Pet> toResource(Pet pet) {
		return new Resource<>(pet
				, linkTo(methodOn(PetController.class).getOnePet(pet.getId())).withSelfRel() // 自己的url
				, linkTo(methodOn(PetController.class).getAllPets()).withRel("pets") // 全体pet的url
				, linkTo(methodOn(OwnerController.class).getOneOwner(pet.getOwner().getId())).withRel("owner") // 主人的url
				);
	}
	
	@GetMapping(path="/pets")
	public @ResponseBody 
	List<Resource<Pet>> getAllPets() {
		// 先将 petRepository.findAll() 从 Iterable<> 转换为 List<>
		Iterable<Pet> petsIt = petRepository.findAll();
		List<Pet> petsLs = new ArrayList<>();
		petsIt.forEach(i -> { petsLs.add(i); });
		
		List<Resource<Pet>> pets = petsLs.stream().map(
				pet -> toResource(pet)
				).collect(Collectors.toList());
		
		return pets;
	}

	@GetMapping("/pets/{id}")
	public @ResponseBody 
	Resource<Pet> getOnePet(@PathVariable Integer id) {
		Pet pet = petRepository.findById(id)
				.orElseThrow(() -> new RuntimeException());
		return toResource(pet);
	}

	@GetMapping(path="/owners/{ownerId}/pets")
	public @ResponseBody 
	List<Resource<Pet>> getMyPets(@PathVariable Integer ownerId) {
		// 先将 petRepository.findAll() 从 Iterable<> 转换为 List<>
		Iterable<Pet> petsIt = petRepository.findAll();
		List<Pet> petsLs = new ArrayList<>();
		petsIt.forEach(i -> { 
			if (i.getOwner().getId() == ownerId) // 筛选：仅获取当前owner对应的pets
				petsLs.add(i); 
		});
		
		List<Resource<Pet>> pets = petsLs.stream().map(
				pet -> toResource(pet)
				).collect(Collectors.toList());
		
		return pets;
	}
	
	@PostMapping(path="/owners/{ownerId}/pets")
	public @ResponseBody 
	Pet addNewPet (@RequestBody Pet pet, @PathVariable Integer ownerId) {
		
		pet.setOwner(ownerRepository.findById(ownerId)
				.orElseThrow(() -> new RuntimeException()));
		petRepository.save(pet);
		return pet;
	}
	
	@PutMapping("/pets/{id}")
	public @ResponseBody 
	Pet replacePet(@RequestBody Pet newPet, @PathVariable Integer id) {
		
		return petRepository.findById(id)
			.map(pet -> {
				pet.setName(newPet.getName());
				pet.setType(newPet.getType());
				return petRepository.save(pet);
			})
			.orElseGet(() -> {
				newPet.setId(id);
				return petRepository.save(newPet);
			});
	}

	@DeleteMapping("/pets/{id}")
	public @ResponseBody 
	Pet deletePet(@PathVariable Integer id) {
		Pet pet = petRepository.findById(id)
				.orElseThrow(() -> new RuntimeException());
		petRepository.deleteById(id);
		return pet;
	}
}
