function getlista() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/shopping-list/all-sorted-category-shopping');
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="<table class='table table-striped table-bordered'><tr><th scope='col'>Nazwa Produktu</th><th scope='col'>Miara</th><th scope='col'>Ilość</th></tr>";
		var kategoria="";
		console.log(xhr.response);
		for(var i=0;i<xhr.response.length;i++)
		{
			if (kategoria!=xhr.response[i].product.categoryShopping.name)
			{
				kategoria=xhr.response[i].product.categoryShopping.name;
				lista+="<tr><th colspan='3'><h2 class='display-4 text-center'>"+kategoria+"</h2></th></tr>"
				
			}
			lista+="<tr><td>"+xhr.response[i].product.productName+"</td><td>"+xhr.response[i].product.measure.name+"</td><td>"+xhr.response[i].quantityToBuy+"<button class='btn btn-primary float-right' onclick=removeFromList('"+xhr.response[i].id+"')>Usuń z listy</button></td></tr>";
		}
		lista+="</table>";
		lista+="<div class='d-flex justify-content-center'><button class='btn btn-primary' onclick='addToList()'>Dodaj produkt do listy zakupów</button></div>"
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send();
}
getlista();

function addToList(){
	lista="";
	lista+="<h3 class='display-4 text-center'>Produkt</h3>"
	lista+="<div class='d-flex justify-content-center'><select class='text-center form-control' type='text' id='produkt'></select></div>"
	lista+="<h2 class='display-4 text-center'>Ilość</h2>"
	lista+="<div class='d-flex justify-content-center'><input class='text-center form-control' type='number' id='ilosc' value='0'></div><br>"
	lista+="<div class='d-flex justify-content-center'><button class='btn btn-primary' onclick='addToListDB()'>Dodaj</button><div>"
	document.getElementById("content").innerHTML = lista;
	
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/products/all');
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
	xhr.open('POST','http://46.41.141.26:8080/shopping-list');
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.onload = () =>{
	getlista();
	}
	xhr.send(JSON.stringify(obiekt));	
	
}

function removeFromList(id){
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE','http://46.41.141.26:8080/shopping-list/'+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.onload = () =>{
			console.log(xhr.response);
	getlista();
	}
	xhr.send();	
}