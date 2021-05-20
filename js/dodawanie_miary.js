function addMiara() {
	var miara = 
	{
		nazwa: document.getElementById("nazwa").value
	}
	const testTableStore = Backendless.Data.of('Miara');
	testTableStore.save(miara)
      .then(function (object) {
		  
      })
	document.getElementById("content").innerHTML += "<h3>"+"Dodano kategorię "+miara.nazwa+"</h3>";
}