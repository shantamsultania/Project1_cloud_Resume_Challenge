$('.navbar').on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});
//
//var visitorCount = localStorage.getItem("page_view");
//
//  //setting up a visitor count
//
//
//if(visitorCount){
//visitorCount = Number(visitorCount) + 1;
//}
//else{
//visitorCount = 1;
//}
//localStorage.setItem("page_view", visitorCount);
//
//console.log("count is ", visitorCount);
//
//visitorCountUpdated = visitorCount+" users "
//var display = document.getElementById("counter-output");
//const textnode = document.createTextNode(visitorCountUpdated);
//display.appendChild(textnode);
//
//// setting up a reset btn after 50 visitor count
//if(visitorCount >= 50 ){
//visitorCount = 1;
//localStorage.setItem("page_view", visitorCount);
//}

const VISITORS_ENDPOINT_LAMBDA = "https://aj7aehpsepznxd6traq5uwcxsm0mbpxo.lambda-url.us-east-1.on.aws/"
var display = document.getElementById("counter-output");

async function updateCounter() {
    return await fetch(VISITORS_ENDPOINT_LAMBDA)
        .then(it => {
        console.log("log 1")
            if (!it.ok) {
                throw "Server error: [${it.status}] [${it.statusText}] [${it.url}]";
            }
            return it.json();
        })
        .then(receivedJson => {
        console.log("log 2")
            console.log(receivedJson);
            const visitorCount = receivedJson.visits;
            const visitorCountUpdated = visitorCount+" users "
            const textnode = document.createTextNode(visitorCountUpdated);
            display.appendChild(textnode);
        })
        .catch(err => {
        console.log("log 3 ")
            console.log("Error in fetch", err);
        });
}
console.log("working ")
window.addEventListener("DOMContentLoaded", updateCounter());