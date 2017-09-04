const MySQL  = require('./mysql').MySQL;
const alertMe  = require('./mysql').alertMe;
const actualYear = new Date();

let test = function () {
    MySQL.connect();
    alertMe('je test dtc')
};

$(document).ready(function() {
    $('#actual-year').html(actualYear.getFullYear());
});

$("form").submit(function(){
    alert("I've submited :)");

})

