package njuics.demos.petsalon.model;

public enum ServiceCategory {
	// 检查，注射，药物，手术，护理，美容
	Examination("Examination"),
	Injection("Injection"),
	Medicine("Medicine"),
	Operation("Operation"),
	Nursing("Nursing"),
	Cosmetology("Cosmetology");

	private String description;
	
	private ServiceCategory(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
