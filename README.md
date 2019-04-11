# Petsalon v1.3

- 此前版本均还不够“RESTFUL”（大概在 Richardson 的 REST 成熟度模型的 Level 2 ？），这个版本将开始使用HATEOAS（即 Level 3）
- 突然发现不小心把宠物美容店当成了宠物医院……其实只有 ServiceCategory 的内容有点歪，原理还是一样的，更改 ServiceCategory 之前的运行结果就不改了……



### HATEOAS

- 以 OwnerController 的 @GetMapping 为例

  （PetController 和 ServiceController 的 @GetMapping 同理）

  ```java
  @RestController
  @RequestMapping(path="/owners") 
  public class OwnerController {
      ...
  	@GetMapping(path="")
  	public @ResponseBody 
  	Resources<Resource<Owner>> getAllOwners() {
  		// 先将 ownerRepository.findAll() 从 Iterable<> 转换为 List<>
  		Iterable<Owner> ownersIt = ownerRepository.findAll();
  		List<Owner> ownersLs = new ArrayList<>();
  		ownersIt.forEach(i -> { ownersLs.add(i); });
  		
  		List<Resource<Owner>> owners = ownersLs.stream().map(
  				owner -> new Resource<>(owner, 
  						linkTo(methodOn(OwnerController.class).getOneOwner(owner.getId())).withSelfRel(),
  						linkTo(methodOn(OwnerController.class).getAllOwners()).withRel("owners")
  						)
  				).collect(Collectors.toList());
  		
  		return new Resources<>(owners, linkTo(methodOn(OwnerController.class).getAllOwners()).withSelfRel());
  	}
  	
  	@GetMapping("/{id}")
  	public @ResponseBody 
  	Resource<Owner> getOneOwner(@PathVariable Integer id) {
  		Owner owner = ownerRepository.findById(id)
  				.orElseThrow(() -> new RuntimeException());
  
  		return new Resource<>(owner,
  			linkTo(methodOn(OwnerController.class).getOneOwner(id)).withSelfRel(),
  			linkTo(methodOn(OwnerController.class).getAllOwners()).withRel("owners"));
  	}
  }
  ```

  





# Petsalon v1.2

- 添加 Owner - Pet 的一对多关联（双向）
- 添加 Pet - Service 的一对多关联（双向）

以上两个关联，添加时需要注意：

1. 在 @OneToMany 之下使用 @JoinColumn(name="...") 来指定生成外键的名字，而不能使用 @OneToMany(mappedBy="...")，否则会产生中间表，据我个人猜测，这导致同时具有 @OneToMany 和 @ManyToOne 的类 Pet 的 Table 内部产生分歧（两个中间表），导致无法 Post
2. 在 @ManyToOne 之上使用 @JsonBackReference，避免双向关联导致的输出 Json 文件产生死循环



### 关联代码

- Owner (1*Owner >>> n * Pet)

  ```java
  @Entity
  public class Owner {
      ...
      @OneToMany(targetEntity=Pet.class, cascade=CascadeType.ALL)
  	@JoinColumn(name="owner", referencedColumnName = "id")
      private Set<Pet> petSet; // 宠物集合
      ...
      ... // getter-setter for petSet
  }
  ```

  

- Pet (1*Pet >>> n * Service)

  ```java
  @Entity
  public class Pet {
      ...    
  	@JsonBackReference // 防止双向关联死循环
  	@ManyToOne(targetEntity=Owner.class)
      @JoinColumn(name="owner", referencedColumnName = "id")
      private Owner owner; // 对应主人
  
      @OneToMany(targetEntity=Service.class, cascade=CascadeType.ALL)
  	@JoinColumn(name="pet", referencedColumnName = "id")
      private List<Service> serviceList; // 服务列表
      ...
      ... // getter-setter for serviceList & owner
  }
  ```

  

- Service

  ```java
  @Entity
  public class Service {
      ...
  	@JsonBackReference // 防止双向关联死循环
  	@ManyToOne(targetEntity=Pet.class)
      @JoinColumn(name="pet", referencedColumnName = "id")
      private Pet pet; // 对应宠物
      ...
      ... // getter-setter for pet
  }
  ```








# Petsalon v1.0

- 三组 Model - Repository - Controller：

  Owner - OwnerRepository - OwnerController

  Pet - PetRepository - PetController

  Service - ServiceRepository - ServiceController

  

- resources/application.properties：

  ```properties
  spring.jpa.hibernate.ddl-auto=create
  spring.datasource.url=jdbc:mysql://localhost:3306/petsalon_db?serverTimezone=GMT%2B8
  # user: 'aldebarain'@'%' ; password=''
  spring.datasource.username=aldebarain
  spring.datasource.password=
  ```

  

### Model (njuics.demos.petsalon.model)

- Owner

  ```java
  @Entity
  public class Owner {
      @Id
      @GeneratedValue(strategy=GenerationType.AUTO)
      private Integer id;
      private String name;
      ... // getter-setter
  }
  ```

- Pet

  ```java
  @Entity
  public class Pet {
      @Id
      @GeneratedValue(strategy=GenerationType.AUTO)
      private Integer id;
      private String name;
      private PetType type; // 包括：Dog, Cat, Hamster, Bird
      ... // getter-setter
  }
  ```

- Service 

  ```java
  @Entity
  public class Service {
      @Id
      @GeneratedValue(strategy=GenerationType.AUTO)
      private Integer id;
      @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
      @DateTimeFormat(pattern="yyyy-MM-dd")
      private Date date;
      private Double fee;
      private ServiceCategory category; // 包括：Examination, Injection, Medicine, Operation, Nursing, Cosmetology
      ... // getter-setter
  }
  ```

  

### Repository (njuics.demos.petsalon.repository)

- OwnerController (extends CrudRepository<Owner, Integer>)
- PetController (extends CrudRepository<Pet, Integer>)
- ServiceController (extends CrudRepository<Service, Integer>)



### Controller (njuics.demos.petsalon.controller)

- OwnerController

  ```java
  @RestController
  @RequestMapping(path="/owners") // URL start with /owners
  public class OwnerController {
  	@Autowired
  	private OwnerRepository ownerRepository; // 连接 OwnerRepository
  
  	@PostMapping(path="/add") // 添加Owner
  	public @ResponseBody String addNewOwner (@RequestBody Owner owner) {
  		ownerRepository.save(owner);
  		return "New Owner Saved"; // the response (not a view)
  	}
  	
  	@GetMapping(path="/all") // 查看所有Owner
  	public @ResponseBody Iterable<Owner> getAllOwners() {
  		return ownerRepository.findAll();
  	}
  }
  ```

  

- PetController

  ```java
  @Controller 
  @RequestMapping(path="/pets") // URL start with /pets
  public class PetController {
  	@Autowired
  	private PetRepository petRepository; // 连接 PetRepository
  
  	@PostMapping(path="/add") // 添加Pet
  	public @ResponseBody String addNewPet (@RequestBody Pet pet) { ... }
  	
  	@GetMapping(path="/all") // 查看所有Pet
  	public @ResponseBody Iterable<Pet> getAllPets() { ... }
  }
  ```

  

- ServiceController

  ```java
  @RestController
  @RequestMapping(path="/service") // URL start with /service
  public class ServiceController {
  	@Autowired
  	private ServiceRepository serviceRepository; // 连接 ServiceRepository
  
  	@PostMapping(path="/add") // 添加Service
  	public @ResponseBody String addNewService (@RequestBody Service service) { ... }
  	
  	@GetMapping(path="/all") // 查看所有Service
  	public @ResponseBody Iterable<Service> getAllService() { ... }
  }
  ```

