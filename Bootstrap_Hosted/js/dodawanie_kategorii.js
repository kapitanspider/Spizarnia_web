function addCategory() {
	var category = 
	{
		name: document.getElementById("nazwa").value,
		group:{
			code: localStorage.getItem("ActiveGroupCode"),
			name: localStorage.getItem("ActiveGroupName")
		}
	}
	var list = document.getElementById("lista").value;
	if (list == 'produkty')
	{
		if (category.name.length>0)
		{
			const xhr = new XMLHttpRequest();
			xhr.open('POST','http://46.41.141.26:8080/category-product');
			xhr.responseType = 'json';
			xhr.setRequestHeader('Content-Type','application/json');
			xhr.onload = () =>{
			getCategories();
		};
		xhr.send(JSON.stringify(category));
		document.getElementById("comm").innerHTML = "<h3 class='display-5 text-center'>"+"Dodano kategorię "+category.name+"</h3>";
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
			xhr.open('POST','http://46.41.141.26:8080/category-shopping');
			xhr.responseType = 'json';
			xhr.setRequestHeader('Content-Type','application/json');
			xhr.onload = () =>{
			getCategories();
		};
		xhr.send(JSON.stringify(category));
		document.getElementById("comm").innerHTML = "<h3 class='display-5 text-center'>"+"Dodano kategorię "+category.name+"</h3>";
		}
		else{
			alert("Nazwa nie może być pusta");
		}
	}
}
function removeCatProduct(id)
{
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE','http://46.41.141.26:8080/category-product?id='+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.onload = () =>{
		try
	{
		if(xhr.response.status==500){
			alert("Nie można usunąń kategorii przypisanej do produktu");
		}
	}
	catch
	{
	}
		getCategories();
		};
	xhr.send();
} 

function removeCatShopping(id)
{
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE','http://46.41.141.26:8080/category-shopping?id='+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.onload = () =>{
		try
	{
		if(xhr.response.status==500){
			alert("Nie można usunąń kategorii przypisanej do produktu");
		}
	}
	catch
	{
	}
		getCategories();
		};
	xhr.send();
} 

function getCategories(){
	document.getElementById("tables").innerHTML = "";
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/category-product/all?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista = "<h2 class='display-5 text-center'>Istniejące Kategorie Produktów:</h2><table class='table table-striped table-bordered text-center'>";
		for(var i=0;i<xhr.response.length;i++)
			{
				lista+="<tr><td>"+xhr.response[i].name+"</td><td><button class='btn btn-primary' onclick='removeCatProduct(`"+xhr.response[i].id+"`)'>Usuń</button></td></tr>";
			}
			lista+="</table>";
		document.getElementById("tables").innerHTML += lista ;
	};
	xhr.send();
	const xhr2 = new XMLHttpRequest();
	xhr2.open('GET','http://46.41.141.26:8080/category-shopping/all?code='+localStorage.getItem("ActiveGroupCode"));
	xhr2.responseType = 'json';
	xhr2.onload = () =>{
		var lista = "<h2 class='display-5 text-center'>Istniejące Kategorie Zakupowe:</h2><table class='table table-striped table-bordered text-center'>";
		for(var i=0;i<xhr2.response.length;i++)
			{
				lista+="<tr><td>"+xhr2.response[i].name+"</td><td><button class='btn btn-primary' onclick='removeCatShopping(`"+xhr2.response[i].id+"`)'>Usuń</button></td></tr>";
			}
			lista+="</table>";
		//console.log(lista);
		document.getElementById("tables").innerHTML += lista ;
	};
	xhr2.send();
	
}
getCategories();