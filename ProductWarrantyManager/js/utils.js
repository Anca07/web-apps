var warrantiesSection = document.getElementsByClassName("warranties")[0];
var siteDetailsSection = document.getElementsByClassName("site-details-section")[0];
var warrantyForm = document.getElementsByClassName("form-warranty")[0];
var localStorage = window.localStorage;

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_NUMBER_REGEX = /^\d{10}$/;
const NAME_REGEX = /^[A-Z]/;

function createAlert(parentElement, message, alertClass) {
    removeAlerts(parentElement, alertClass)

    var alertDiv = document.createElement("div");
    alertDiv.innerHTML = message;
    alertDiv.className = "alert" + " " + alertClass;
    alertDiv.tabIndex = -1;
    var alertSpan = document.createElement("span");
    alertSpan.className = "close-button";
    alertSpan.innerHTML = "&times";
    alertSpan.onclick = function () {
        this.parentNode.parentNode.removeChild(this.parentNode);
    }

    alertDiv.appendChild(alertSpan);
    parentElement.insertBefore(alertDiv, parentElement.childNodes[1]);

    alertDiv.focus();
}

function removeAlerts(parentElement, alertClass) {
    var alerts = parentElement.querySelectorAll("." + alertClass);
    if (alerts) {
        for (var i = 0; i < alerts.length; i++) {
            alerts[i].parentNode.removeChild(alerts[i]);
        }
    }
}

function isPositiveInRangeInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 2 && n <= 10;
}

function getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function validateFields(parentElement, customerName, customerEmail, customerPhone, productValidityYears, productDate) {
    var isValid = true;

    if (customerName === "") {
        createAlert(parentElement, "The customer name cannot be empty!", "alert-customer-name");
        isValid = false;
    } else if (customerName.length < 3 || customerName.length > 100) {
        createAlert(parentElement, "The customer name should have a length between 3 and 100 characters!", "alert-customer-name");
        isValid = false;
    } else if (!customerName.match(NAME_REGEX)) {
        createAlert(parentElement, "The customer name should start with capital letter!", "alert-customer-name");
        isValid = false;
    }

    if (customerEmail === "") {
        createAlert(parentElement, "The customer email cannot be empty!", "alert-customer-email");
        isValid = false;
    } else if (!customerEmail.match(EMAIL_REGEX)) {
        createAlert(parentElement, "The customer email is not in the correct email format!", "alert-customer-email");
        isValid = false;
    }

    if (customerPhone === "") {
        createAlert(parentElement, "The customer phone number cannot be empty!", "alert-customer-phone");
        isValid = false;
    } else if (!customerPhone.match(PHONE_NUMBER_REGEX)) {
        createAlert(parentElement, "The customer phone number is not in the correct phone number format!", "alert-customer-phone");
        isValid = false;
    }

    if (productValidityYears === "") {
        createAlert(parentElement, "The validity years cannot be empty!", "alert-product-valability");
        isValid = false;
    } else if (!isPositiveInRangeInteger(productValidityYears)) {
        createAlert(parentElement, "The validity years is not a valid number between 2 and 10 years!", "alert-product-valability");
        isValid = false;
    }

    var currentDate = new Date();
    if (productDate === "") {
        createAlert(parentElement, "The product purchase date cannot be empty!", "alert-product-date");
        isValid = false;
    } else if (new Date(productDate) > currentDate || new Date(productDate) < new Date("2000-01-01")) {
        createAlert(parentElement, "The product purchase date is not between 2000-01-01 and today!", "alert-product-date");
        isValid = false;
    }

    return isValid;
}

function setActiveTab(event) {
    var navbarAnchorElements = document.querySelectorAll(".navbar-list a");

    var homeAnchorElement;

    navbarAnchorElements.forEach(function (element) {
        element.classList.remove("active");

        if (element.href.endsWith("#")) {
            homeAnchorElement = element;
        }
    })

    var currentAnchorElement = homeAnchorElement;

    if (event) {
        currentAnchorElement = event.target;

        if (event.target.href.endsWith("#learn-more")) {
            currentAnchorElement = homeAnchorElement;
        } else if (event.target.id === "list-items-redirect-anchor") {
            currentAnchorElement = document.querySelector("#list-items-anchor");
        }
    }

    currentAnchorElement.classList.add("active");
}