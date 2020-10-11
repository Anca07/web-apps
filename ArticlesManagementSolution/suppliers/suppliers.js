const SUPPLIER_ARTICLES_CLASS_NAME = 'supplier-article';

let suppliersWithOrders = data.supplierList.map(supplier => {
    let currrentSupplierOrders = data.orders.filter(order => supplier.supplierId === order.supplierId && order.orderDate != null);

    return {
        "supplierId": supplier.supplierId,
        "supplierName": supplier.supplierName,
        "ordersCount": currrentSupplierOrders.length
    }
}).filter(supplier => {
    return supplier.ordersCount > 0;
}).sort((a, b) => {
    return b.ordersCount - a.ordersCount;
})

const container = document.querySelector("main");

let suppliers = `<div class='suppliers-container'>
        ${suppliersWithOrders.map(supplier => {
    return `<article class='${SUPPLIER_ARTICLES_CLASS_NAME}'>
                        <div class='${SUPPLIER_ARTICLES_CLASS_NAME}-header'>
                            <h3>${supplier.supplierId}</h3>
                        </div>
                        <div class='${SUPPLIER_ARTICLES_CLASS_NAME}-content'>
                            <p>${supplier.supplierName}</p>
                            <div class='${SUPPLIER_ARTICLES_CLASS_NAME}-orders-count'>
                                <i class='fas fa-shopping-cart order-icon'></i>
                                <p>${supplier.ordersCount}</p>
                            </div>
                        </div>
                    </article>`
})
        .join(" ")}
                </div>`;

container.innerHTML += suppliers;