function loadForm() {
    scroll(0, 0);
    setActiveTab(event);
    warranties = JSON.parse(localStorage.getItem("warranties"));
    warrantiesSection.style.display = "none";
    siteDetailsSection.style.display = "none";
    warrantyForm.style.display = "flex";

    var formInputFields = document.getElementsByClassName('form-input-field');

    for (var i = 0; i < formInputFields.length; i++) {
        formInputFields[i].addEventListener("focus", bindFocus);
        formInputFields[i].addEventListener("blur", bindBlur);
    }

    document.getElementById("customer-name").value = '';
    document.getElementById("customer-email").value = '';
    document.getElementById("customer-phone").value = '';
    document.getElementById("product-validity").value = '';
    document.getElementById("product-purchase-date").value = '';

    createRadioButtonFieldsForm("Product type");
    createCheckboxFieldsForm();

    var okButton = document.querySelector(".ok-button");
    okButton.onclick = function () {
        var modal = document.querySelector("#modal-success");
        modal.style.display = "none";
    }

    var productPurchaseDateField = document.getElementById("product-purchase-date");
    productPurchaseDateField.max = getTodayDate();

    restoreFocus(formInputFields);
}

function bindFocus(event) {
    event.target.parentNode.classList.add('active');
}

function bindBlur(event) {
    if (!event.target.value) {
        event.target.parentNode.classList.remove('active');
    }
}

function createRadioButtonFieldsForm(name) {
    var fieldSet = document.querySelector("#product-fieldset");
    var divRadioButtonsSection = fieldSet.querySelector("#radio-group");
    if (divRadioButtonsSection) {
        divRadioButtonsSection.remove();
    }

    var divRadioButtons = document.createElement("div");
    divRadioButtons.id = "radio-group";

    var warrantyFieldLabel = document.createElement("p");
    warrantyFieldLabel.textContent = name;

    divRadioButtons.appendChild(warrantyFieldLabel);

    for (var i = 0; i < productTypes.length; i++) {
        var radiobuttonLabel = document.createElement("label");
        radiobuttonLabel.for = productTypes[i];
        radiobuttonLabel.style.display = "block";

        var inputRadioButton = document.createElement("input");
        inputRadioButton.type = "radio";
        inputRadioButton.name = "product-type";
        inputRadioButton.value = productTypes[i];

        if (i === 0) {
            inputRadioButton.checked = true;
        }

        var text = document.createTextNode(productTypes[i]);

        radiobuttonLabel.appendChild(inputRadioButton);
        radiobuttonLabel.appendChild(text);
        divRadioButtons.appendChild(radiobuttonLabel);
    }
    fieldSet.insertBefore(divRadioButtons, fieldSet.childNodes[2]);
}

function createCheckboxFieldsForm() {
    var fieldSet = document.querySelector("#damages-fieldset");
    var divCheckboxesSection = fieldSet.querySelector("#checkbox-group");
    if (divCheckboxesSection) {
        divCheckboxesSection.remove();
    }

    var divCheckboxes = document.createElement("div");
    divCheckboxes.id = "checkbox-group";

    Object.keys(damages).forEach(function (key) {
        var checkboxLabel = document.createElement("label");
        checkboxLabel.for = key;
        checkboxLabel.style.display = "block";

        var inputCheckbox = document.createElement("input");
        inputCheckbox.type = "checkbox";
        inputCheckbox.name = "product-damages";
        inputCheckbox.value = key;

        var text = document.createTextNode(damages[key]);
        checkboxLabel.appendChild(inputCheckbox);
        checkboxLabel.appendChild(text);
        divCheckboxes.appendChild(checkboxLabel)
    })

    fieldSet.appendChild(divCheckboxes);
}

function validateWarrantyForm() {
    var formWarranty = document.querySelector(".form-warranty");
    removeAlerts(formWarranty, "alert");

    var customerName = document.getElementById("customer-name").value;
    var customerEmail = document.getElementById("customer-email").value;
    var customerPhone = document.getElementById("customer-phone").value;
    var selectedProductType = document.querySelector('#radio-group input[name="product-type"]:checked').value;
    var productValidityYears = document.getElementById("product-validity").value;
    var productDate = document.getElementById("product-purchase-date").value;
    var damagesCovered = [];
    var checkboxes = document.querySelectorAll('#checkbox-group input[name="product-damages"]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        damagesCovered.push(checkboxes[i].value);
    }

    var isValid = validateFields(formWarranty, customerName, customerEmail, customerPhone, productValidityYears, productDate);

    var nextId = 100;
    if (warranties !== null && warranties.length > 0) {
        nextId = getNextId();
    }

    if (isValid) {
        removeAlerts(formWarranty, "alert");
        var warranty = {
            id: "X" + nextId,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            product_type: selectedProductType,
            validity_years: productValidityYears,
            purchase_date: productDate,
            damages_covered: damagesCovered
        }

        warranties.push(warranty);
        localStorage.setItem("warranties", JSON.stringify(warranties));

        var modal = document.querySelector("#modal-success");
        modal.style.display = "block";
    }

    return false;
}

function getNextId() {
    var idList = warranties.map(function (warranty) {
        return warranty.id.substring(1);
    })

    var lastId = Math.max.apply(Math, idList);
    return ++lastId;
}

function restoreFocus(formInputFields) {
    for (var i = 0; i < formInputFields.length; i++) {
        formInputFields[i].focus();
        formInputFields[i].blur();
    }

    document.getElementById("customer-name").focus();
}