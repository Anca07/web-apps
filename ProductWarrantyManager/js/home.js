var headerElement = document.getElementById("header");

var headerPromise = fetch("/templates/header.html");

headerPromise.then(function (response) {
    return response.text();
})
    .then(function (headerTemplate) {
        headerElement.insertAdjacentHTML("afterend", headerTemplate);
    })

var footerElement = document.getElementById("footer");
footerElement.insertAdjacentHTML("afterend", footerTemplate);

function loadHome(event) {
    scroll(0, 0);
    setActiveTab(event);
    warrantiesSection.style.display = "none";
    siteDetailsSection.style.display = "";
    warrantyForm.style.display = "none";

}

function onLoad() {
    if(localStorage.getItem("warranties") === null){
        localStorage.setItem("warranties", JSON.stringify(warranties));
    }
    setTimeout(setActiveTab, 500);
}

window.onload = onLoad;