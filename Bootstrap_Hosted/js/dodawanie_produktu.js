function addProduct() {
	var product = 
	{
		productName: document.getElementById("nazwaProduktu").value,
		quantity: (document.getElementById("ilosc").value * 1),
		categoryProduct:{
			id: document.getElementById("kategorieProdukty").value
			},
		categoryShopping:{
			id:	document.getElementById("kategorieZakupy").value
		},
		measure:{
			id: document.getElementById("miara").value
		},
		autoPurchase: document.getElementById("autoZakup").checked,
		autoPurchaseCount: (document.getElementById("progAutoZakupu").value * 1),
		group:{
			code: localStorage.getItem("ActiveGroupCode"),
			name: localStorage.getItem("ActiveGroupName")
		}
	}
	const xhr = new XMLHttpRequest();
	if(product.productName.length>0)
	{
		xhr.open('POST','http://46.41.141.26:8080/products');
		xhr.responseType = 'json';
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.onload = () =>{
			//document.getElementById("content").innerHTML += "<h3 class='display-5 text-center'>"+"Dodano produkt "+product.productName+"</h3>";
			location.replace("produkty.html");
		};
	//console.log(JSON.stringify(product));
	xhr.send(JSON.stringify(product));
	}
	else{
		alert("Nazwa nie może być pusta");
	}
};

function fetchOptions(){
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/category-product/all?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="";
		for(var i=0;i<xhr.response.length;i++)
		{
			lista+="<option value="+xhr.response[i].id+">"+xhr.response[i].name+"</option>";
		}
		document.getElementById("kategorieProdukty").innerHTML = lista;
	}
	xhr.send();
	const xhr2 = new XMLHttpRequest();
	xhr2.open('GET','http://46.41.141.26:8080/category-shopping/all?code='+localStorage.getItem("ActiveGroupCode"));
	xhr2.responseType = 'json';
	xhr2.onload = () =>{
		var lista="";
		for(var i=0;i<xhr2.response.length;i++)
		{
			lista+="<option value="+xhr2.response[i].id+">"+xhr2.response[i].name+"</option>";
		}
		document.getElementById("kategorieZakupy").innerHTML = lista;
	}
	xhr2.send();
	const xhr3 = new XMLHttpRequest();
	xhr3.open('GET','http://46.41.141.26:8080/measures/all?code='+localStorage.getItem("ActiveGroupCode"));
	xhr3.responseType = 'json';
	xhr3.onload = () =>{
		var lista="";
		for(var i=0;i<xhr3.response.length;i++)
		{
			lista+="<option value="+xhr3.response[i].id+">"+xhr3.response[i].name+"</option>";
		}
		document.getElementById("miara").innerHTML = lista;
	}
	xhr3.send();
}
fetchOptions();