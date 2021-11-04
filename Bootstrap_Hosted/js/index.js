function createGroup(){
	var newGroup = document.getElementById("nazwaGrupy").value;
	const xhr = new XMLHttpRequest();
	xhr.open('POST','http://localhost:8080//groups?name='+newGroup);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		var groups = [];
		var names = [];
		try
		{
			groups = localStorage.getItem("groupsCodes").split(",");
			names = localStorage.getItem("groupsNames").split(",");
		}
		catch
		{
		groups.shift();
		names.shift();
		}
		groups.push(xhr.response.code);
		names.push(xhr.response.name);
		localStorage.setItem("groupsCodes", groups);
		localStorage.setItem("groupsNames", names);
		setGroups();
	}
	xhr.send();
}

function addGroup(){
	var newGroup = document.getElementById("kodGrupy").value.trim();
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://localhost:8080//groups?code='+newGroup);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		var groups = [];
		var names = [];
		try
		{
		groups = localStorage.getItem("groupsCodes").split(",");
		names = localStorage.getItem("groupsNames").split(",");
		}
		catch
		{
		groups.shift();
		names.shift();
		}
		groups.push(xhr.response.code);
		names.push(xhr.response.name);
		localStorage.setItem("groupsCodes", groups);
		localStorage.setItem("groupsNames", names);
		setGroups();
	}
	xhr.send();
}


function removeGroup(i)
{
	var groups = [];
	var names = [];
	try
	{
		groups = localStorage.getItem("groupsCodes").split(",");
		names = localStorage.getItem("groupsNames").split(",");
		if(groups[0].length==0){
			groups.shift();
			names.shift();
		}
	}
	catch
	{
			
	}
	groups.splice(i,1);
	names.splice(i,1);
	localStorage.setItem("groupsCodes", groups);
	localStorage.setItem("groupsNames", names);
	setGroups();
}

function setActive(code){
	tab=code.split(",");
	localStorage.setItem("ActiveGroupCode", tab[0]);
	localStorage.setItem("ActiveGroupName", tab[1]);
	setGroups();
}

function setGroups()
{
	var lista="<tr><th>Kod</th><th>Nazwa</th></tr>";
	var groups = [];
	var names = [];
	try
	{
		groups = localStorage.getItem("groupsCodes").split(",");
		names = localStorage.getItem("groupsNames").split(",");
		if(groups[0].length==0){
			groups.shift();
			names.shift();
		}
	}
	catch
	{
	}
	for(var i = 0; i < groups.length ;i++)
	{
		if(localStorage.getItem("ActiveGroupCode")==groups[i]){
		lista+="<tr class='text-primary'><td>"+groups[i]+"</td><td>"+names[i]+"<button class='btn btn-primary float-right' onclick='removeGroup("+i+")'>Usuń</button></td></tr>"
		}
		else{
		lista+="<tr><td>"+groups[i]+"</td><td>"+names[i]+"<button class='btn btn-primary float-right' onclick='removeGroup("+i+")'>Usuń</button><button class='btn btn-primary float-right' onclick='setActive(`"+groups[i]+","+names[i]+"`)'>Aktywuj</button></td></tr>"
		}
	}
	document.getElementById("tabelaGrup").innerHTML = lista;
}
setGroups();