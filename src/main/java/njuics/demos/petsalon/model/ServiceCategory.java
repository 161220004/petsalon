package njuics.demos.petsalon.model;

public enum ServiceCategory {
	// 清洗，剪毛，染色，装扮，购物
	Bathing("Bathing"),
	Cutting("Cutting"),
	Dyeing("Dyeing"),
	DressingUp("DressingUp"),
	Shopping("Shopping");

	private String description;
	
	private ServiceCategory(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
