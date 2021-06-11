function addCategory() {
	var category = 
	{
		name: document.getElementById("nazwa").value
	}
	var list = document.getElementById("lista").value;
	if (list == 'produkty')
	{
		if (category.name.length>0)
		{
			const xhr = new XMLHttpRequest();
			xhr.open('POST','http://127.0.0.1:8080/category-product');
			xhr.responseType = 'json';
			xhr.setRequestHeader('Content-Type','application/json');
			xhr.onload = () =>{
			getCategories();
		};
		xhr.send(JSON.stringify(category));
		document.getElementById("comm").innerHTML = "<h3>"+"Dodano kategorię "+category.name+"</h3>";
		}
		else{
			alert("Nazwa nie może być pusta");
		}
	}
	if (list == 'zakupy')
	{
		if (category.name.length>0)
		{
			const xhr = new XMLHttpRequest();
			xhr.open('POST','http://127.0.0.1:8080/category-shopping');
			xhr.responseType = 'json';
			xhr.setRequestHeader('Content-Type','application/json');
			xhr.onload = () =>{
			getCategories();
		};
		xhr.send(JSON.stringify(category));
		document.getElementById("comm").innerHTML = "<h3>"+"Dodano kategorię "+category.name+"</h3>";
		}
		else{
			alert("Nazwa nie może być pusta");
		}
	}
}

function getCategories(){
	document.getElementById("tables").innerHTML = "";
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://127.0.0.1:8080/category-product/all');
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista = "<h2>Istniejące Kategorie Produktów</h2><table class='tabelaZakupow'>";
		for(var i=0;i<xhr.response.length;i++)
			{
				lista+="<tr><td>"+xhr.response[i].name+"</td></tr>";
			}
			lista+="</table>";
		document.getElementById("tables").innerHTML += lista ;
	};
	xhr.send();
	const xhr2 = new XMLHttpRequest();
	xhr2.open('GET','http://127.0.0.1:8080/category-shopping/all');
	xhr2.responseType = 'json';
	xhr2.onload = () =>{
		var lista = "<h2>Istniejące Kategorie Zakupowe</h2><table class='tabelaZakupow'>";
		for(var i=0;i<xhr2.response.length;i++)
			{
				lista+="<tr><td>"+xhr2.response[i].name+"</td></tr>";
			}
			lista+="</table>";
		console.log(lista);
		document.getElementById("tables").innerHTML += lista ;
	};
	xhr2.send();
	
}
getCategories();