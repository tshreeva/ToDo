var colorList=['#fff2df','#FFCDD2','#F8BBD0','#E1BEE7','#D1C4E9','#C5CAE9','#BBDEFB','#B3E5FC','#B2EBF2','#B2DFDB'];
var userColor=0;
var userColorPre=0;
window.onload=function(){
	getColorList();
	getTodo();
}

function getColorList(){
	var colorCircle='';
	colorList.forEach(function (value,key){
		colorCircle=colorCircle+'<div onclick="getUserSelected('+key+')" id="'+key+'" style="background:'+value+'"></div>';

	});
	document.getElementById('circle').innerHTML=colorCircle;
}
function getUserSelected(id){
	userColorPre=userColor;
	userColor=id;
	document.getElementById(id).style.border='1px solid';
	document.getElementById(userColorPre).style.border='none';


}
function addToDo(){
	var userToDo=document.getElementById('todoFeild').value;
	var getUserSelected=colorList[userColor];
	var oldNotes=JSON.parse(localStorage.getItem('userToDo'))
	var newNotes=
	{"todo":userToDo,"todoColor":getUserSelected,"isCompleted":false}
	if(oldNotes){
	oldNotes.push(newNotes)
	localStorage.setItem('userToDo',JSON.stringify(oldNotes))
}else{
	var firstNotes=[];
	firstNotes.push(newNotes);
	localStorage.setItem('userToDo',JSON.stringify(firstNotes))
}
resetToDefault();
getTodo();
}
function resetToDefault(){
	document.getElementById('todoFeild').value='';
	usercolor=0;
	userColorPre=0;
	document.getElementById(userColor).style.border='1px solid';
	document.getElementById(userColor).style.border='none';
}
function getTodo(){
	var todos=JSON.parse(localStorage.getItem('userToDo'));
	var todo='';
	todos.reverse().forEach(function(value,key){
		todo=todo+'<div style="background:'+value.todoColor+'"><span>'+value.todo+'</span>'+(value.isCompleted?'<button style="background: #33aa1ac">completed</button>':'<button onclick="markAsComplete('+key+')">Mark as Complete</button>')+'</div>';

	});
	document.getElementById('todolist').innerHTML=todo;
}
function markAsComplete(id){
	var todo=JSON.parse(localStorage.getItem('userToDo'));
	todo[(todo.length-1)-parseInt(id)].isCompleted=true;
	localStorage.setItem('userToDo',JSON.stringify(todo));

}