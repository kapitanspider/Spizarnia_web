function addMiara() {
	var miara = 
	{
		name: document.getElementById("nazwa").value,
		group:{
			code: localStorage.getItem("ActiveGroupCode"),
			name: localStorage.getItem("ActiveGroupName")
		}
	}
	if (miara.name.length>0)
	{
	const xhr = new XMLHttpRequest();
	xhr.open('POST','http://46.41.141.26:8080/measures');
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.onload = () =>{
	getMiary();
	};
	xhr.send(JSON.stringify(miara));
	}
	else{
		alert("Nazwa nie może być pusta");
	}
}

function removeMiara(id)
{
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE','http://46.41.141.26:8080/measures?id='+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.onload = () =>{
	try
	{
		if(xhr.response.status==500){
			alert("Nie można usunąń miary przypisanej do produktu");
		}
	}
	catch
	{
	}
	getMiary();
	};
	xhr.send();
}
function getMiary(){
	var temp = document.getElementById("inputs").innerHTML;
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/measures/all?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.onload = () =>{
	var lista = "<h2 class='display-5 text-center'>Istniejące Miary</h2><table class='table table-striped table-bordered text-center'>";
	for(var i=0;i<xhr.response.length;i++)
		{

			lista+="<tr><td>"+xhr.response[i].name+"</td><td><button class='btn btn-primary' onclick='removeMiara(`"+xhr.response[i].id+"`)'>Usuń</button></td></tr>";
		}
		lista+="</table>";
	lista+="<div id='inputs'></div>"
	document.getElementById("content").innerHTML = lista ;
	document.getElementById("inputs").innerHTML += temp;
	};
	xhr.send();
};
getMiary();