// console.log('JS chargé !!');

// let favoritColor = prompt("What's your favorit color ?");
// let age = prompt("How old are you ?");

// if (favoriteColor === "pink" && age == 29 ){
//     console.log("my favorite color is pink and I am 29.");
// }

function formatInput(valeurNonFormattee){
    let valeurFormattee;

    valeurFormattee = valeurNonFormattee.replace(",",".");
    valeurFormattee = valeurFormattee.replace(/[^0-9.]/g, " ");
    return valeurFormattee;
}

function calculerTVA(typeMontantDepart){

    let montantHT = formatInput(document.getElementById("montantHT").value);
    let montantTVA = formatInput(document.getElementById("montantTVA").value);
    let montantTTC = formatInput(document.getElementById("montantTTC").value);
    let tauxTVA = formatInput(document.getElementById("tauxTVA").value);
    // console.log("mont HT :" + montantHT);
    // console.log("mont TVA :" + montantTVA);
    // console.log("mont TTC :" + montantTTC);
    // console.log("tauxTVA :" + tauxTVA);

    if(typeMontantDepart == "tauxTVA"){
        typeMontantDepart = "montant HT";
    }
    
    if(typeMontantDepart == "montant HT"){        
        montantTVA = Math.round(montantHT * tauxTVA / 100);
        montantTTC = Math.round(Number(montantHT) + Number(montantTVA));

        document.getElementById('montantTVA').value = montantTVA + " €";
        document.getElementById('montantTTC').value = montantTTC + " €";

    } else if(typeMontantDepart == "montant TVA"){
        montantHT = Math.round(montantTVA / (tauxTVA / 100));
        montantTTC = Math.round(Number(montantTVA) + Number(montantHT));

        document.getElementById('montantHT').value = montantHT + " €";
        document.getElementById('montantTTC').value = montantTTC + " €";
    } else if(typeMontantDepart == "montant TTC"){
        montantHT = Math.round(montantTTC / (1 + tauxTVA / 100));
        montantTVA = Math.round(montantTTC - montantHT);

        document.getElementById('montantHT').value = montantHT + " €";
        document.getElementById('montantTVA').value = montantTVA + " €";
    }


    document.getElementById('totalTva').innerHTML = "<p>Montant HT : " + montantHT + " €</p><p>Montant TVA : " + montantTVA + " €</p><p>Montant TTC : " + montantTTC + " €</p>"
}

function mettreAjourTauxTVA(tauxTVA){
    document.getElementById("tauxTVA").value = tauxTVA;
}

function reInitInputTelValue(inputId, symbol){
    let myInput = document.getElementById(inputId),
        InputValue = myInput.value.replace(/\s/g, "");

    if(InputValue.length==0){
        myInput.value = 0 + " " + symbol;
    } else if (InputValue.indexOf(symbol) == -1) {
        myInput.value = InputValue + " " + symbol;
    }
}

// keyup
let listInputTel = document.querySelectorAll("input[type='tel']");

for(let i = 0; i < listInputTel.length; i++){
    listInputTel[i].addEventListener("keyup", function(event) {
        calculerTVA(event.currentTarget.id);
    });

    //blur
    listInputTel[i].addEventListener("blur", function(event) {
        if(event.currentTarget.id == "tauxTVA"){
            reInitInputTelValue(event.currentTarget.id, "%");
        } else {
            reInitInputTelValue(event.currentTarget.id, "€");
        }
    });
}

//click
let listInputButton = document.querySelectorAll("input[type='button']");

for(let i=0; i<listInputButton.length; i++){
    listInputButton[i].addEventListener("click", function(event) {
        mettreAjourTauxTVA(event.currentTarget.value);
        calculerTVA("tauxTVA");
    })
}

