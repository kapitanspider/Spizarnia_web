function getlista() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://127.0.0.1:8080//shopping-list/all-sorted-category-shopping');
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="<table class='tabelaZakupow'><tr><td>Nazwa Produktu</td><td>Miara</td><td>Ilość</td></tr>";
		var kategoria="";
		for(var i=0;i<xhr.response.length;i++)
		{
			if (kategoria!=xhr.response[i].product.categoryShopping.name)
			{
				kategoria=xhr.response[i].product.categoryShopping.name;
				lista+="</table><h2>"+kategoria+"</h2><table class='tabelaZakupow'>"
				
			}
			lista+="<tr><td>"+xhr.response[i].product.productName+"</td><td>"+xhr.response[i].product.measure.name+"</td><td>"+xhr.response[i].quantityToBuy+"</td></tr>";
		}
		lista+="</table>";
		lista+="<button onclick='addToList()'>Dodaj produkt do listy zakupów</button>"
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send();
}
getlista();

function addToList(){
	lista="";
	lista+="<h3>Produkt</h3>"
	lista+="<select  type='text' id='produkt'></select>"
	lista+="<h2>Ilość</h2>"
	lista+="<input type='number' id='ilosc' value='0'>"
	lista+="<button onclick='addToListDB()'>Dodaj</button>"
	document.getElementById("content").innerHTML = lista;
	
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://127.0.0.1:8080/products/all');
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="";
		for(var i=0;i<xhr.response.length;i++)
		{
			//// console.log(result[i].foo);
			lista+="<option value="+xhr.response[i].id+">"+xhr.response[i].productName+"</option>";
		}
		// console.log(result.length);*
		document.getElementById("produkt").innerHTML = lista;
	}
	xhr.send();	
	
}
function addToListDB(){
	var obiekt = {
		quantityToBuy: (document.getElementById("ilosc").value *1),
		product:
		{
			id: document.getElementById("produkt").value,
		}
	}
	const xhr = new XMLHttpRequest();
	xhr.open('POST','http://127.0.0.1:8080/shopping-list');
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.onload = () =>{
	getlista();
	}
	console.log(JSON.stringify(obiekt));
	xhr.send(JSON.stringify(obiekt));	
	
}