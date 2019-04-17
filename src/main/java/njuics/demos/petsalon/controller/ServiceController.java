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

import njuics.demos.petsalon.model.Service;
import njuics.demos.petsalon.repository.PetRepository;
import njuics.demos.petsalon.repository.ServiceRepository;

@RestController
@RequestMapping(path="/api") // This means URL's start with /api
public class ServiceController {
	@Autowired
	private PetRepository petRepository;
	@Autowired 
	private ServiceRepository serviceRepository;

	private static Resource<Service> toResource(Service service) {
		return new Resource<>(service
				, linkTo(methodOn(ServiceController.class).getOneService(service.getId())).withSelfRel() // 自己的url
				, linkTo(methodOn(ServiceController.class).getAllService()).withRel("service") // 全体service的url
				, linkTo(methodOn(PetController.class).getOnePet(service.getPet().getId())).withRel("pet") // 宠物的url
				);
	}
	
	@GetMapping(path="/service")
	public @ResponseBody 
	List<Resource<Service>> getAllService() {
		// 先将 serviceRepository.findAll() 从 Iterable<> 转换为 List<>
		Iterable<Service> serviceIt = serviceRepository.findAll();
		List<Service> serviceLs = new ArrayList<>();
		serviceIt.forEach(i -> { serviceLs.add(i); });
		
		List<Resource<Service>> service = serviceLs.stream().map(
				serv -> toResource(serv)
				).collect(Collectors.toList());
		
		return service;
	}
	
	@GetMapping("/service/{id}")
	public @ResponseBody 
	Resource<Service> getOneService(@PathVariable Integer id) {
		Service service = serviceRepository.findById(id)
				.orElseThrow(() -> new RuntimeException());
		return toResource(service);
	}

	@GetMapping(path="/pets/{petId}/service")
	public @ResponseBody 
	List<Resource<Service>> getMyService(@PathVariable Integer petId) {
		// 先将 serviceRepository.findAll() 从 Iterable<> 转换为 List<>
		Iterable<Service> serviceIt = serviceRepository.findAll();
		List<Service> serviceLs = new ArrayList<>();
		serviceIt.forEach(i -> { 
			if (i.getPet().getId() == petId) // 筛选：仅获取当前pet对应的service
				serviceLs.add(i); 
			});
		
		List<Resource<Service>> service = serviceLs.stream().map(
				serv -> ServiceController.toResource(serv)
				).collect(Collectors.toList());
		
		return service;
	}
	
	@PostMapping(path="/pets/{petId}/service")
	public @ResponseBody 
	Service addNewService (@RequestBody Service service, @PathVariable Integer petId) {

		service.setPet(petRepository.findById(petId)
				.orElseThrow(() -> new RuntimeException()));
		serviceRepository.save(service);
		return service;
	}
	
	@PutMapping("/service/{id}")
	public @ResponseBody 
	Service replaceService(@RequestBody Service newService, @PathVariable Integer id) {
		
		return serviceRepository.findById(id)
			.map(service -> {
				service.setDate(newService.getDate());
				service.setFee(newService.getFee());
				service.setCategory(newService.getCategory());
				return serviceRepository.save(service);
			})
			.orElseGet(() -> {
				newService.setId(id);
				return serviceRepository.save(newService);
			});
	}

	@DeleteMapping("/service/{id}")
	public @ResponseBody 
	Service deleteService(@PathVariable Integer id) {
		Service service = serviceRepository.findById(id)
				.orElseThrow(() -> new RuntimeException());
		serviceRepository.deleteById(id);
		return service;
	}
}