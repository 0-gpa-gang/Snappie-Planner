//Functions
function monthvalue(){
    var month = document.getElementById("month").value;
    return month;

}
function weekvalue(){
    var week = document.getElementById("week").value;
    return week;
}

function weeklydates(newdates,neww){
    span = document.getElementById("Wednesday");
    if (neww==2){
        txt = document.createTextNode(newdates[0]);
        span.innerHTML = "";
    span.appendChild(txt);
    } else if (neww==3){
        txt = document.createTextNode(newdates[3]);
        span.innerHTML = "";
    span.appendChild(txt);
    }
    
}
//event listener
var newdates = [7,8,9,10,11,12,13];
var weekday = "Wednesday";
var lineup = "4";
var neww = monthvalue();
console.log(neww);
var realmonth = document.getElementById("month");
realmonth.addEventListener("change", weeklydates(newdates,neww));