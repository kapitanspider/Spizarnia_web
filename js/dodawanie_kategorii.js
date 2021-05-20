function addCategory() {
	var category = 
	{
		lista: document.getElementById("lista").value,
		nazwa: document.getElementById("nazwa").value
	}
	const testTableStore = Backendless.Data.of('Kategorie');
	testTableStore.save(category)
      .then(function (object) {
		  
      })
	document.getElementById("content").innerHTML += "<h3>"+"Dodano kategorię "+category.nazwa+"</h3>";
}