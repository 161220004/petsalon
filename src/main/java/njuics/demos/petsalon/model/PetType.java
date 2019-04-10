package njuics.demos.petsalon.model;

public enum PetType {
	// 狗，猫，仓鼠，鸟
	Dog("Dog"),
	Cat("Cat"),
	Hamster("Hamster"),
	Bird("Bird");
	
	private String description;
	
	private PetType(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
