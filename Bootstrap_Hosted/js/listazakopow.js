function getlista() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/shopping-list/all-sorted-category-shopping?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="<table class='table table-striped table-bordered'><tr><th scope='col'>Nazwa Produktu</th><th scope='col'>Miara</th><th scope='col'>Ilość</th><th></th></tr>";
		var kategoria="";
		//console.log(xhr.response);
		for(var i=0;i<xhr.response.length;i++)
		{
			if (kategoria!=xhr.response[i].product.categoryShopping.name)
			{
				kategoria=xhr.response[i].product.categoryShopping.name;
				lista+="<tr><th colspan='3'><h2 class='display-5 text-center'>"+kategoria+"</h2></th></tr>"
				
			}
			lista+="<tr><td>"+xhr.response[i].product.productName+"</td><td>"+xhr.response[i].product.measure.name+"</td><td><input class='text-center form-control' type='number' id='"+xhr.response[i].id+"' value='"+xhr.response[i].quantityToBuy+"'></td><td><button class='btn btn-primary float-right' onclick=removeFromList('"+xhr.response[i].id+"')>Usuń z listy</button><button class='btn btn-primary float-right' onclick=updateQuantity('"+xhr.response[i].id+"')>Zmien Ilość</button></td></tr>";
		}
		lista+="</table>";
		lista+="<div class='d-flex justify-content-center'><button class='btn btn-primary' onclick='addToList()'>Dodaj produkt do listy zakupów</button></div>"
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send();
}
getlista();

function addToList(){
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/products/all-sorted-category-product?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="<table class='table table-striped table-bordered'><thead><tr><th scope='col'>Nazwa Produktu</th><th scope='col'>Ilość</th><th></th></tr></thead>";
		for(var i=0;i<xhr.response.length;i++)
		{
			lista+="<tr><td>"+xhr.response[i].productName+"</td><td><input class='text-center form-control' type='number' id='"+xhr.response[i].id+"' value='1'></td><td><button class='btn btn-primary' onclick='addToListDB(`"+xhr.response[i].id+"`)'>Dodaj do listy zakupów</button></td></tr>";
		}
		// console.log(result.length);*
		lista+="</table></br><div class='d-flex justify-content-center'><a href='listazakopow.html' class='btn btn-primary'>Wróć</a></div>";
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send();	
	
}

function updateQuantity(id){
	quantity = (document.getElementById(id).value*1)
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://46.41.141.26:8080/shopping-list/quantity/'+id+"?quantity="+quantity);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
	}
	xhr.send();
}

function addToListDB(id){
	var obiekt = {
		quantityToBuy: (document.getElementById(id).value *1),
		product:
		{
			id: id,
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
			//console.log(xhr.response);
	getlista();
	getlista();
	}
	xhr.send();	
}