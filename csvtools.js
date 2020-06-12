//var csv is the CSV file with headers
function csvtoJSON(csv, separator){

    var separator = document.getElementById('separator').value;
    console.log(separator);

    if(separator == ""){
        separator = ","
    }
    
    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].split(separator);
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(separator);
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
    
    //return result; //JavaScript object
    return JSON.stringify(result, null,"  "); //JSON
  };