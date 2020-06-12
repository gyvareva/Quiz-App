function gererConversionCsv()
{
    document.getElementById('csvinput').classList.remove("red-border");

    console.log('Click sur gererConversionCsv()');
    
    var composantEntree = document.getElementById('csvinput');
    var composantSortie = document.getElementById('jsonoutput');
    var separator = document.getElementById('separatorChar').value;

    if (composantEntree.value.length == 0) {
        console.log('Aucune entrée CVS à convertir!');
        document.getElementById('csvinput').classList.add("red-border");
    }

    composantSortie.value = csvtoJSON(composantEntree.value, separator);    
}


function initTest(){
    document.getElementById('csvinput').value = "question;choice1;choice2;choice3;choice4;answer\nQuestion 1;A1;A2;A3;A4;3\nQuestion 2;B1;B2;B3;B4;1";
}



/*
récupérer le composant qui a le csv "l'entrée"
tu prends la valeur du composant

tu l'envoies dans le converter
le converter le process et te ressort le json
tu stocke le json

tu prends le composant de sortie "jsonoutput"
et tu mets la valeur du json dans le composant.value


*/