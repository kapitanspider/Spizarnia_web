	var group = localStorage.getItem("ActiveGroupCode");
	if(group == null){
		alert("Najperw utwórz lub wybierz grupę");
		location.replace("grupy.html");
	}
