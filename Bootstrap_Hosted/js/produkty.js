function getProducts() {
  
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080//products/all-no-zero?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		var lista="<table class='table table-striped table-bordered'>";
		var kategoria=""
		for(var i=0;i<xhr.response.length;i++)
		{
			if(kategoria!=xhr.response[i].categoryProduct.name)
			{
				kategoria=xhr.response[i].categoryProduct.name;
				lista+="<tr><th colspan='3'><h2 class='display-5 text-center'>"+kategoria+"</h2></th></tr>"
			}
			lista+="<tr><td>"+xhr.response[i].productName+"</td><td>"+xhr.response[i].quantity+"</td><td><button class='btn btn-primary' onclick=productMod('"+xhr.response[i].id+"')>Edytuj</button> <button class='btn btn-primary' onclick=productEditor('"+xhr.response[i].id+"')>Ilość i atrybuty</button> <button class='btn btn-primary' onclick=expDates('"+xhr.response[i].id+"')>Daty Warzności</button> <button class='btn btn-primary' onclick=barCodes('"+xhr.response[i].id+"')>Kody kreskowe</button></td></tr>";
		}
		lista+="</table><div class='d-flex justify-content-center'><a href='dodawanie_produktu.html' class='btn btn-primary'>+ Utwórz nowy produkt</a>&nbsp<button class='btn btn-primary' onclick=changeFromZero()>Dodaj istniejący produkt</button></div>";
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send();
}

function productEditor(id)
{
	document.getElementById("content").innerHTML = "";
	document.getElementById("content").innerHTML += "<h3 class='display-5 text-center' id='nag'>Produkt: </h3>";
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/products?id='+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		var lista = "";
		lista+=xhr.response.productName;
	document.getElementById("nag").innerHTML += lista;
	document.getElementById("content").innerHTML +="<h4 class='display-5 text-center'>Ilość:</h4><div class='d-flex justify-content-center'><input class='text-center form-control' type='number' value='"+xhr.response.quantity+"' id='"+id+"'></div><br><div class='d-flex justify-content-center'><button class='btn btn-primary' onclick="+'zmienilosc("'+id+'")'+">Zmień ilość</button></div>";
	var listaAtrybutów="<h3 class='display-5 text-center'>Atrybuty:</h3>";
		if (xhr.response.attributeList.length>0){
			listaAtrybutów+="<table class='table table-striped table-bordered text-center' id='tabelaAtrybotow'>"
			for(var i=0;i<xhr.response.attributeList.length;i++)
			{
				listaAtrybutów+="<tr><td>"+xhr.response.attributeList[i].name+"<button class='btn btn-primary float-right' onclick=removeAtt('"+xhr.response.attributeList[i].id+','+id+"')>usuń</button></td></tr>";
			}
			listaAtrybutów+="</table>"
			document.getElementById("content").innerHTML += listaAtrybutów;
		}
		else{
			listaAtrybutów+= "<p class='text-center'>Brak Atrybutów</p>";
			document.getElementById("content").innerHTML += listaAtrybutów;
		}
		document.getElementById("content").innerHTML += "<div class='d-flex justify-content-center'><input class='text-center form-control' type='text' id='nazwaAtrybutu'></div><br><div class='d-flex justify-content-center'><button class='btn btn-primary' onclick="+'dodajAtrybut("'+id+'")'+">Dodaj atrybut</button></div></br><div class='d-flex justify-content-center'><a href='produkty.html' class='btn btn-primary'>Wróć</a></div>";
	}
	xhr.send()
	
	
}
function productMod(id)
{
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/products?id='+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		var lista = "";
		lista += "<h3 class='display-5 text-center'>Nazwa Produktu:</h3>";
		lista += "<input class='text-center form-control' type='text' id='nazwaProduktu' value='"+xhr.response.productName+"'>";
		lista += "<h3 class='display-5 text-center'>Ilość:</h3>";
		lista += "<input class='text-center form-control' type='number' id='ilosc' value='"+xhr.response.quantity+"'>";
		lista += "<h3 class='display-5 text-center'>Kategorie Produktów:</h3>";
		lista += "<select  class='text-center form-control' type='text' id='kategorieProdukty'></select>";
		lista += "<h3 class='display-5 text-center'>Kategorie Zakupy:</h3>";
		lista += "<select  class='text-center form-control' type='text' id='kategorieZakupy'></select>";
		lista += "<h3 class='display-5 text-center'>Miara:</h3>";
		lista += "<select  class='text-center form-control' type='text' id='miara'></select>";
		lista += "<h3 class='display-5 text-center'>AutoZakup:</h3>";
		if(xhr.response.autoPurchase)
		{
		lista += "<div class='d-flex justify-content-center'><input class='form-check-input position-static' type='checkbox' id='autoZakup' checked></div>";
		}
		else
		{
		lista += "<div class='d-flex justify-content-center'><input class='form-check-input position-static' type='checkbox' id='autoZakup'></div>";
		}
		lista += "<h3 class='display-5 text-center'>Próg Auto Zakupu:</h3>";
		lista += "<input class='text-center form-control' type='number' id='progAutoZakupu' value='"+xhr.response.autoPurchaseCount+"'>";
		lista += "</br>";
		lista += "<div class='d-flex justify-content-center'><button class='btn btn-primary' id='updatebutton'>Zapisz</button></div>";
		lista+="</br><div class='d-flex justify-content-center'><a href='produkty.html' class='btn btn-primary'>Wróć</a></div>";
		document.getElementById("content").innerHTML = lista;
		document.getElementById("updatebutton").addEventListener("click", function(){uppProduct(xhr.response.attributeList,id);});
		fetchOptions(xhr.response.categoryProduct,xhr.response.categoryShopping,xhr.response.measure);
	}
	xhr.send()
}

function uppProduct(attributeList,ID)
{
	var categoryProduct = document.getElementById("kategorieProdukty").value.split(",");
	var categoryShopping = document.getElementById("kategorieZakupy").value.split(",");
	var measure = document.getElementById("miara").value.split(",");
	var produkt = 
	{
		attributeList: attributeList,
		autoPurchase: document.getElementById("autoZakup").checked,
		autoPurchaseCount: (document.getElementById("progAutoZakupu").value * 1),
		categoryProduct:{
			id: categoryProduct[0],
			name: categoryProduct[1]
			},
		categoryShopping:{
			id: categoryShopping[0],
			name: categoryShopping[1]
		},
		measure:{
			id: measure[0],
			name: measure[1]
		},
		productName: document.getElementById("nazwaProduktu").value,
		quantity: (document.getElementById("ilosc").value * 1),
		id: ID,
		group:{
			code: localStorage.getItem("ActiveGroupCode"),
			name: localStorage.getItem("ActiveGroupName")
		}
	}
	//console.log(produkt);
	
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://46.41.141.26:8080//products/update');
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		//console.log(xhr.response);
		getProducts();
	}
	xhr.send(JSON.stringify(produkt));
}
function removeAtt(parse)
{
	var tab = parse.split(',')
	var product_id=tab[1];
	var id=tab[0];
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE','http://46.41.141.26:8080/products/attribute/'+product_id+"?attributeId="+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		//console.log(xhr.response);
		 productEditor(product_id);
	}
	xhr.send();
}

function fetchOptions(categoryProduct,categoryShopping,measure){
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/category-product/all?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		var lista="";
		for(var i=0;i<xhr.response.length;i++)
		{
			if(xhr.response[i].id==categoryProduct.id)
			{
				lista+="<option value="+xhr.response[i].id+','+xhr.response[i].name+" selected>"+xhr.response[i].name+"</option>";
			}
			else
			{
				lista+="<option value="+xhr.response[i].id+','+xhr.response[i].name+">"+xhr.response[i].name+"</option>";
			}

		}
		document.getElementById("kategorieProdukty").innerHTML = lista;
	}
	xhr.send();
	const xhr2 = new XMLHttpRequest();
	xhr2.open('GET','http://46.41.141.26:8080/category-shopping/all?code='+localStorage.getItem("ActiveGroupCode"));
	xhr2.responseType = 'json';
	xhr2.setRequestHeader('Content-Type', 'application/json');
	xhr2.onload = () =>{
		var lista="";
		for(var i=0;i<xhr2.response.length;i++)
		{
			if(xhr2.response[i].id==categoryShopping.id)
			{
				lista+="<option value="+xhr2.response[i].id+','+xhr2.response[i].name+" selected>"+xhr2.response[i].name+"</option>";
			}
			else
			{
				lista+="<option value="+xhr2.response[i].id+','+xhr2.response[i].name+">"+xhr2.response[i].name+"</option>";
			}
		}
		document.getElementById("kategorieZakupy").innerHTML = lista;
	}
	xhr2.send();
	const xhr3 = new XMLHttpRequest();
	xhr3.open('GET','http://46.41.141.26:8080/measures/all?code='+localStorage.getItem("ActiveGroupCode"));
	xhr3.responseType = 'json';
	xhr3.setRequestHeader('Content-Type', 'application/json');
	xhr3.onload = () =>{
		var lista="";
		for(var i=0;i<xhr3.response.length;i++)
		{
			if(xhr3.response[i].id==measure.id)
			{
				lista+="<option value="+xhr3.response[i].id+','+xhr3.response[i].name+" selected>"+xhr3.response[i].name+"</option>";
			}
			else
			{
				lista+="<option value="+xhr3.response[i].id+','+xhr3.response[i].name+">"+xhr3.response[i].name+"</option>";
			}
		}
		document.getElementById("miara").innerHTML = lista;
	}
	xhr3.send();
}

function dodajAtrybut(id){
	var newAtt = document.getElementById("nazwaAtrybutu").value
	if (newAtt.length>0){
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://46.41.141.26:8080/products/attribute/'+id+"?attributeName="+newAtt);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
	productEditor(id);
	}
	xhr.send();
	}
	else{
		alert("Atrybut nie może być pusty");
	}
}

function zmienilosc(id){
	quantity = (document.getElementById(id).value*1)
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://46.41.141.26:8080/products/quantity/'+id+"?quantity="+quantity);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
	}
	xhr.send();
}

function zmienilosc2(id){
	quantity = (document.getElementById(id).value*1)
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://46.41.141.26:8080/products/quantity/'+id+"?quantity="+quantity);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		changeFromZero();
	}
	xhr.send();
}

function expDates(id){
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/products?id='+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		var lista=' ';
		var today = new Date() 
		if(xhr.response.expirationDateList.length>0)
		{
			lista+="<h3 class='display-5 text-center'>Daty Warzności:</h3><table class='table table-striped table-bordered text-center' id='listaDatWaznosci'>";
			for(i=0;i<xhr.response.expirationDateList.length;i++)
			{
				temp=xhr.response.expirationDateList[i].date.split('-');
				var expDate=new Date(temp[0],temp[1]-1,temp[2],0,0,0,0);
				if(((expDate-today)/86400000)>xhr.response.expirationDateList[i].remainderDays)
				{
				lista+="<tr><td class='text-success'>"+xhr.response.expirationDateList[i].date+"</td><td>"+xhr.response.expirationDateList[i].note+"</td>";
				}
				else
				{
				lista+="<tr><td class='text-danger'>"+xhr.response.expirationDateList[i].date+"</td><td>"+xhr.response.expirationDateList[i].note+"</td>";
				}
				lista+="<td><button class='btn btn-primary float-right' onclick=removeExpDate('"+id+','+xhr.response.expirationDateList[i].id+"')>usuń</button></td></tr>"
			}
			lista+="</table>";
		}
		lista+="<h3 class='display-5 text-center'>Dodaj Datę warzności:</h3>";
		lista+="<h3 class='display-5 text-center'>Data:</h3>";
		lista+="<div class='d-flex justify-content-center'><input type='date' id='dataWarznosci'></div>";
		lista+="<h3 class='display-5 text-center'>Notatka:</h3>";
		lista+="<div class='d-flex justify-content-center'><input type='text' id='notkaWarznosci'></div>";
		lista+="<h3 class='display-5 text-center'>Ile dni przed końcem powiadamiać:</h3>";
		lista+="<div class='d-flex justify-content-center'><input type='number' value='3' id='dniWarznosci'></div>";
		lista+="<div class='d-flex justify-content-center'><button class='btn btn-primary' onclick=addExpDate('"+id+"')>Dodaj datę</button></div>";
		lista+="</br><div class='d-flex justify-content-center'><a href='produkty.html' class='btn btn-primary'>Wróć</a></div>";
		document.getElementById("content").innerHTML = lista;
		var today = new Date();
		document.getElementById("dataWarznosci").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
	}
	xhr.send()
}

function addExpDate(id){

	var date = document.getElementById("dataWarznosci").value;
	var note = document.getElementById("notkaWarznosci").value;
	if(note.length==0){
		note="Nie podano notatki";
	}
	var reminderDays = document.getElementById("dniWarznosci").value*1;
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://46.41.141.26:8080/products/exp-date/'+id+'?date='+date+'&days='+reminderDays+'&note='+note);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = () =>{
			expDates(id);
		};
	//console.log(JSON.stringify(product));
	xhr.send();
}

function removeExpDate(string){
	string=string.split(",");
	var id=string[0];
	var date=string[1];
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE','http://46.41.141.26:8080/products/exp-date/'+id+'?expirationDateId='+date);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = () =>{
			expDates(id);
		};
	//console.log(JSON.stringify(product));
	xhr.send();
}

function barCodes(id){
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/products?id='+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		console.log(xhr.response);
		var lista=' ';
		var today = new Date() 
		if(xhr.response.barcodeList.length>0)
		{
			lista+="<h3 class='display-5 text-center'>Kody kreskowe:</h3><table class='table table-striped table-bordered text-center' id='listaBarCodow'>";
			for(i=0;i<xhr.response.barcodeList.length;i++)
			{
				
				lista+="<tr><td class='text-danger'>"+xhr.response.barcodeList[i].barcode+"</td><td>"+xhr.response.barcodeList[i].note+"</td>";
				lista+="<td><button class='btn btn-primary float-right' onclick=removeBarcode('"+id+','+xhr.response.barcodeList[i].id+"')>usuń</button></td></tr>"
			}
			lista+="</table>";
		}
		lista+="</br><div class='d-flex justify-content-center'><a href='produkty.html' class='btn btn-primary'>Wróć</a></div>";
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send()
}

function removeBarcode(string){
	string=string.split(",");
	var id=string[0];
	var barcode=string[1];
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE','http://46.41.141.26:8080/products/barcode/'+id+'?barcodeId='+barcode);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = () =>{
			barCodes(id);
		};
	//console.log(JSON.stringify(product));
	xhr.send();
}

function changeFromZero(){
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080//products/all-sorted-category-product?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		var lista="<table class='table table-striped table-bordered'>";
		var kategoria=""
		for(var i=0;i<xhr.response.length;i++)
		{
			if(kategoria!=xhr.response[i].categoryProduct.name)
			{
				kategoria=xhr.response[i].categoryProduct.name;
				lista+="<tr><th colspan='3'><h2 class='display-5 text-center'>"+kategoria+"</h2></th></tr>"
			}
			if(xhr.response[i].quantity==0)
			{
			lista+="<tr><td>"+xhr.response[i].productName+"</td><td><input class='text-center form-control' type='number' id='"+xhr.response[i].id+"' value='"+xhr.response[i].quantity+"'></td><td><button class='btn btn-primary' onclick=zmienilosc2('"+xhr.response[i].id+"')>Dodaj</button>";
			}
		}
		lista+="</table><div class='d-flex justify-content-center'><a href='dodawanie_produktu.html' class='btn btn-primary'>+ Utwórz nowy produkt</a>&nbsp<button class='btn btn-primary' onclick=changeFromZero()>Dodaj istniejący produkt</button></div>";
		lista+="</br><div class='d-flex justify-content-center'><a href='produkty.html' class='btn btn-primary'>Wróć</a></div>";
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send();
}

getProducts();
