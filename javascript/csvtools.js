//var csv is the CSV file with headers
function csvtoJSON(csv, separator){

    var separator = document.getElementById('separator').value;
    console.log(separator);

    if(separator == ""){
        separator = ","
    }
    
    var lines=csv.split("\n");
  
    var result = [];

    
    // var headers=lines[0].split(separator);
    
    for(var i=0;i<lines.length;i++){
        var choiceResult = [];
        
        var questionObject = {};
        var currentLineArray=lines[i].split(separator); 
        //tableau contenant les différents éléments d'une ligne
  

        for(k=3; k<currentLineArray.length; k++){
            if (currentLineArray[k] == "") continue;

            var choicesObject = {};
            choicesObject.id = k-2;
            choicesObject.value = currentLineArray[k];
            choiceResult.push(choicesObject);
        }

        questionObject.question = currentLineArray[0];
        questionObject.level = currentLineArray[1];
        questionObject.answers = currentLineArray[2].trim().split(" ").map(Number);
        questionObject.choices = choiceResult;


            // questionObject[headers[j]] = currentline[j];
  
        result.push(questionObject);
  
    }
    
    //return result; //JavaScript object
    return JSON.stringify(result, null,"  "); //JSON
  };