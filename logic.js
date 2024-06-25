var tname;
var desc;
var dt;
var stime;
var etime;
var task = [];
var count;
var taskno;
var tasks = [];

function add() {
    tname = document.getElementById("task_name").value;
    desc = document.getElementById("desc").value;
    dt = document.getElementById("dt").value;
    stime = document.getElementById("from").value;
    etime = document.getElementById("to").value;
    
    if(window.localStorage.getItem("count")==null){
        window.localStorage.setItem("count", 0);
    }
    
    count=window.localStorage.getItem("count");
    var counter=Number(count)+1;
    taskno = "task"+counter;

    task={
        name: tname,
        description: desc,
        date: dt,
        start: stime,
        end: etime,
    };

    let str = JSON.stringify(task);
    window.localStorage.setItem(taskno, str);
    count++;
    window.localStorage.setItem("count", count);
    
    // window.localStorage.clear();
}

function disp() {
    if(window.localStorage.getItem("count")==null || window.localStorage.getItem("count")==0){
        document.getElementById("printTodos").innerHTML="No tasks yet!";
    }
    else{
        count=window.localStorage.getItem("count");
        var i=0;
        var printstr = "";
        for(i; i<count; i++){
            var counter=Number(i)+1;
            taskno = "task"+counter;
            let str = window.localStorage.getItem(taskno);
            task=JSON.parse(str);
            tasks.push(task);
            printstr += "<br />Task Name: "+task.name+"<br />Description: "+task.description+"<br />Task Date: "+task.date+"<br />Task Time:<br />From "+task.start+" to "+task.end+"<br /><br />";
            document.getElementById("printTodos").innerHTML=printstr;
        }
    }
}

function editDisp(){
    count=window.localStorage.getItem("count");
    var i=0;
    for(i; i<count; i++){
        var counter=Number(i)+1;
        taskno = "task"+counter;
        let str = window.localStorage.getItem(taskno);
        task=JSON.parse(str);
        tasks.push(task);
    }
    if(tasks==null){
        document.getElementById("edit_disp").innerHTML="No tasks yet!";
    }
    else{
        var printstr = "";
        for(a in tasks){
            printstr += "<br />"+(Number(a)+1)+". "+tasks[a].name+"<br />";
        }
        document.getElementById("edit_disp").innerHTML=printstr;
    }
}

function assignSelected() {
    var selected=document.getElementById("selected").value;
    window.sessionStorage.setItem("sel", selected);
}

function taskView(){
    var sel=window.sessionStorage.getItem("sel");
    taskno="task"+sel;
    let str = window.localStorage.getItem(taskno);
    task=JSON.parse(str);
    document.getElementById("tname").innerHTML=task.name;
    document.getElementById("taskProps").innerHTML="<br />Description: "+task.description+"<br />Task Date: "+task.date+"<br />Task Time:<br />From "+task.start+" to "+task.end+"<br /><br />";
}

function dlt(){
    var sel = window.sessionStorage.getItem("sel");
    var i=Number(sel);
    var count = window.localStorage.getItem("count");
    for (i; i<count; i++){
        var j=i+1;
        taskno="task"+j;
        task=window.localStorage.getItem(taskno);
        taskno="task"+i;
        window.localStorage.setItem(taskno, task);
    }
    taskno="task"+Number(count);
    window.localStorage.removeItem(taskno);
    count = Number(count)-1;
    window.localStorage.setItem("count", count);

}