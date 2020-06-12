function maConversion(){
    document.getElementById('csvinput').classList.remove("red-border");

    var csvinput = document.getElementById('csvinput');
    var jsonoutput = document.getElementById('jsonoutput');
    
    if(csvinput.value.length == 0){
        document.getElementById('csvinput').classList.add("red-border");
    }

    jsonoutput.value = csvtoJSON(csvinput.value);

}