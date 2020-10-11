
function loadWarranties(event) {
    scroll(0,0);
    setActiveTab(event);

    while (warrantiesSection.firstChild) {
        warrantiesSection.firstChild.remove();
    }

    warranties = JSON.parse(localStorage.getItem("warranties"));

    if (warranties !== null) {
        warranties.forEach(function (warranty) {
            var article = document.createElement("article");
            article.className = "warranty";
            article.id = warranty.id;

            var id = document.createElement("div");
            id.className = "warranty_id";
            var idContent = document.createTextNode(warranty.id)
            id.appendChild(idContent);

            var form = document.createElement("form");
            form.className = "form-group";

            var formFieldSets = document.createElement("div");
            formFieldSets.className = "form-fieldsets";

            var customerFieldSet = document.createElement("fieldset");
            var customerLegend = document.createElement("legend");
            customerLegend.textContent = "Customer information"
            customerFieldSet.appendChild(customerLegend);

            createInputField("Name", warranty.customer_name, "text", "customer-name", customerFieldSet);
            createInputField("Email", warranty.customer_email, "email", "customer-email", customerFieldSet);
            createInputField("Phone number", warranty.customer_phone, "tel", "customer-phone", customerFieldSet);

            formFieldSets.appendChild(customerFieldSet);

            var productFieldSet = document.createElement("fieldset");
            var productLegend = document.createElement("legend");
            productLegend.textContent = "Product information"
            productFieldSet.appendChild(productLegend);

            createRadioButtonFields("Product type", warranty.product_type, productFieldSet);
            createInputField("Purchase date", warranty.purchase_date, "date", "product-date", productFieldSet);
            createInputField("Validity years", warranty.validity_years, "number", "product-years", productFieldSet);

            formFieldSets.appendChild(productFieldSet);

            var damageFieldSet = document.createElement("fieldset");
            var damageLegend = document.createElement("legend");
            damageLegend.textContent = "Damage covered"
            damageFieldSet.appendChild(damageLegend);

            createCheckboxFields(warranty.damages_covered, damageFieldSet);

            formFieldSets.appendChild(damageFieldSet);

            form.appendChild(formFieldSets);

            var buttonsSection = document.createElement("div");
            buttonsSection.className = "buttons";

            var buttonEdit = document.createElement("div");
            buttonEdit.className = "button edit-button";
            var buttonEditContent = document.createTextNode("Edit");
            buttonEdit.appendChild(buttonEditContent);
            buttonEdit.onclick = function () {
                editWarranty(warranty.id);
            }

            buttonsSection.appendChild(buttonEdit);

            var buttonDelete = document.createElement("div");
            buttonDelete.className = "button delete-button";
            var buttonDeleteContent = document.createTextNode("Delete");
            buttonDelete.appendChild(buttonDeleteContent);
            buttonDelete.onclick = function () {
                deleteWarranty(warranty.id);
            };

            buttonsSection.appendChild(buttonDelete);

            var buttonSave = document.createElement("div");
            buttonSave.className = "button save-button";
            var buttonSaveContent = document.createTextNode("Save");
            buttonSave.appendChild(buttonSaveContent);
            buttonSave.onclick = function () {
                saveWarranty(warranty.id);
            };
            buttonSave.style.display = "none";

            buttonsSection.appendChild(buttonSave);

            var buttonDiscard = document.createElement("div");
            buttonDiscard.className = "button discard-button";
            var buttonDiscardContent = document.createTextNode("Discard");
            buttonDiscard.appendChild(buttonDiscardContent);
            buttonDiscard.onclick = function () {
                discardWarranty(warranty.id);
            };
            buttonDiscard.style.display = "none";

            buttonsSection.appendChild(buttonDiscard);

            form.appendChild(buttonsSection);

            article.appendChild(id);
            article.appendChild(form);

            warrantiesSection.appendChild(article);
        });
    }

    warrantiesSection.style.display = "flex";
    siteDetailsSection.style.display = "none";
    warrantyForm.style.display = "none";
}

function createCheckboxFields(values, fieldSet) {
    Object.keys(damages).forEach(function (key) {
        var checkboxLabel = document.createElement("label");
        checkboxLabel.for = key;

        var inputCheckbox = document.createElement("input");
        inputCheckbox.type = "checkbox";
        inputCheckbox.name = "product-damages";
        inputCheckbox.value = key;
        inputCheckbox.disabled = true;

        for (var i = 0; i < values.length; i++) {
            if (key === values[i]) {
                inputCheckbox.checked = true;
                checkboxLabel.style.fontWeight = "bold";
            }
        }

        var text = document.createTextNode(damages[key]);
        checkboxLabel.appendChild(inputCheckbox);
        checkboxLabel.appendChild(text);
        fieldSet.appendChild(checkboxLabel)
    })
}

function createRadioButtonFields(name, value, fieldSet) {
    var warrantyFieldLabel = document.createElement("p");
    warrantyFieldLabel.textContent = name;
    fieldSet.appendChild(warrantyFieldLabel)

    productTypes.forEach(function (productType) {
        var radiobuttonLabel = document.createElement("label");
        radiobuttonLabel.for = productType;

        var inputRadioButton = document.createElement("input");
        inputRadioButton.type = "radio";
        inputRadioButton.name = "product-type";
        inputRadioButton.value = productType;
        inputRadioButton.disabled = true;

        if (productType === value) {
            inputRadioButton.checked = true;
            radiobuttonLabel.style.fontWeight = "bold";
        }
        var text = document.createTextNode(productType);

        radiobuttonLabel.appendChild(inputRadioButton);
        radiobuttonLabel.appendChild(text);
        fieldSet.appendChild(radiobuttonLabel)
    })
}

function createInputField(name, value, type, className, fieldSet) {
    var warrantyFieldLabel = document.createElement("label");
    warrantyFieldLabel.textContent = name;
    warrantyFieldLabel.className = "floating-label";

    var warrantyField = document.createElement("input");
    warrantyField.type = type;
    warrantyField.disabled = true;
    warrantyField.value = value;
    warrantyField.className = className;

    if (type === "date") {
        warrantyField.min = "2000-01-01";
        warrantyField.max = getTodayDate();
    } else if (type === "number") {
        warrantyField.min = "2";
        warrantyField.max = "10";
    }

    fieldSet.appendChild(warrantyFieldLabel);
    fieldSet.appendChild(warrantyField);
}

function deleteWarranty(id) {
    var modal = document.querySelector("#modal-delete");
    modal.style.display = "block";

    var yesButton = document.querySelector(".yes-button");
    yesButton.onclick = function () {
        warranties = warranties.filter(warranty => warranty.id != id);
        localStorage.setItem("warranties", JSON.stringify(warranties));

        var selectedWarranty = document.querySelector("#" + id);
        selectedWarranty.parentNode.removeChild(selectedWarranty);
        modal.style.display = "none";
    }

    var noButton = document.querySelector(".no-button");
    noButton.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function editWarranty(id) {
    var selectedWarranty = document.getElementById(id);
    var inputElements = selectedWarranty.getElementsByTagName("input");
    Array.prototype.forEach.call(inputElements, function (element) {
        element.disabled = false;
    });

    var firstInputElement = inputElements[0];
    firstInputElement.focus();

    var allProductTypes = selectedWarranty.querySelectorAll('input[name="product-type"]');
    for (var i = 0; i < allProductTypes.length; i++) {
        allProductTypes[i].parentNode.style.fontWeight = 100;
    }

    var allDamages = selectedWarranty.querySelectorAll('input[name="product-damages"]');
    for (var i = 0; i < allDamages.length; i++) {
        allDamages[i].parentNode.style.fontWeight = 100;
    }

    toggleButtonsEditMode(selectedWarranty);
}

function saveWarranty(id) {
    var selectedWarranty = document.getElementById(id);
    removeAlerts(selectedWarranty, "alert");

    var inputElements = selectedWarranty.getElementsByTagName("input");
    const currentWarrantyIndex = warranties.findIndex(warranty => warranty.id === id);

    var customerName = selectedWarranty.getElementsByClassName("customer-name")[0].value;
    var customerEmail = selectedWarranty.getElementsByClassName("customer-email")[0].value;
    var customerPhone = selectedWarranty.getElementsByClassName("customer-phone")[0].value;
    var productDate = selectedWarranty.getElementsByClassName("product-date")[0].value;
    var productYears = selectedWarranty.getElementsByClassName("product-years")[0].value;

    var isValid = validateFields(selectedWarranty, customerName, customerEmail, customerPhone, productYears, productDate);


    if (isValid) {
        warranties[currentWarrantyIndex].customer_name = customerName;

        warranties[currentWarrantyIndex].customer_email = customerEmail;

        warranties[currentWarrantyIndex].customer_phone = customerPhone;

        var selectedProductType = selectedWarranty.querySelector('input[name="product-type"]:checked');
        selectedProductType.parentNode.style.fontWeight = 800;
        warranties[currentWarrantyIndex].product_type = selectedProductType.value;

        warranties[currentWarrantyIndex].purchase_date = productDate;

        warranties[currentWarrantyIndex].validity_years = productYears;

        warranties[currentWarrantyIndex].damages_covered = [];

        var selectedDamages = selectedWarranty.querySelectorAll('input[name="product-damages"]:checked');
        for (var i = 0; i < selectedDamages.length; i++) {
            selectedDamages[i].parentNode.style.fontWeight = 800;
            warranties[currentWarrantyIndex].damages_covered.push(selectedDamages[i].value);
        }

        localStorage.setItem("warranties", JSON.stringify(warranties));

        removeAlerts(selectedWarranty, "alert");
        Array.prototype.forEach.call(inputElements, function (element) {
            element.disabled = true;
        });
        toggleButtonsViewMode(selectedWarranty);
    }
}

function discardWarranty(id) {
    var selectedWarranty = document.getElementById(id);
    var inputElements = selectedWarranty.getElementsByTagName("input");
    Array.prototype.forEach.call(inputElements, function (element) {
        element.disabled = true;
    });

    const currentWarranty = warranties.find(warranty => warranty.id === id);

    selectedWarranty.getElementsByClassName("customer-name")[0].value = currentWarranty.customer_name;
    selectedWarranty.getElementsByClassName("customer-email")[0].value = currentWarranty.customer_email;
    selectedWarranty.getElementsByClassName("customer-phone")[0].value = currentWarranty.customer_phone;

    var allProductTypes = selectedWarranty.querySelectorAll('input[name="product-type"]');
    for (var i = 0; i < allProductTypes.length; i++) {
        allProductTypes[i].parentNode.style.fontWeight = 100;
        allProductTypes[i].checked = false;
        if (allProductTypes[i].value === currentWarranty.product_type) {
            allProductTypes[i].parentNode.style.fontWeight = 800;
            allProductTypes[i].checked = true;
        }
    }

    var allDamages = selectedWarranty.querySelectorAll('input[name="product-damages"]');
    for (var i = 0; i < allDamages.length; i++) {
        allDamages[i].parentNode.style.fontWeight = 100;
        allDamages[i].checked = false;

        for (var j = 0; j < currentWarranty.damages_covered.length; j++) {
            if (allDamages[i].value === currentWarranty.damages_covered[j]) {
                allDamages[i].parentNode.style.fontWeight = 800;
                allDamages[i].checked = true;
            }
        }
    }

    selectedWarranty.getElementsByClassName("product-date")[0].value = currentWarranty.purchase_date;
    selectedWarranty.getElementsByClassName("product-years")[0].value = currentWarranty.validity_years;

    removeAlerts(selectedWarranty, "alert");

    toggleButtonsViewMode(selectedWarranty);
}

function toggleButtonsViewMode(selectedWarranty) {
    var editButton = selectedWarranty.getElementsByClassName("edit-button")[0];
    editButton.style.display = "";

    var deleteButton = selectedWarranty.getElementsByClassName("delete-button")[0];
    deleteButton.style.display = "";

    var saveButton = selectedWarranty.getElementsByClassName("save-button")[0];
    saveButton.style.display = "none";

    var discardButton = selectedWarranty.getElementsByClassName("discard-button")[0];
    discardButton.style.display = "none";
}

function toggleButtonsEditMode(selectedWarranty) {
    var editButton = selectedWarranty.getElementsByClassName("edit-button")[0];
    editButton.style.display = "none";

    var deleteButton = selectedWarranty.getElementsByClassName("delete-button")[0];
    deleteButton.style.display = "none";

    var saveButton = selectedWarranty.getElementsByClassName("save-button")[0];
    saveButton.style.display = "";

    var discardButton = selectedWarranty.getElementsByClassName("discard-button")[0];
    discardButton.style.display = "";
}