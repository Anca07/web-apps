const searchButton = document.querySelector("#search-supplier-button");
const searchInput = document.querySelector("#search-supplier-input");
const table = document.querySelector("#orders-table");

const getOrdersBySupplier = (searchedSupplier) => {
    let selectedSuppliers = data.supplierList.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(searchedSupplier.toLowerCase())
    );

    let ordersBySupplier = selectedSuppliers.map(supplier => {
        let orders = data.orders.filter(order =>
            supplier.supplierId === order.supplierId
        )

        let ordersGrouped = orders.reduce((result, current) => {
            (result[current["articleId"]] = result[current["articleId"]] || []).push(current);
            return result;
        }, {});

        let lastOrders = [];
        Object.keys(ordersGrouped).forEach(item => {
            let max = ordersGrouped[item].reduce(function (prev, current) {
                return new Date(prev.orderDate).getTime() > new Date(current.orderDate).getTime() ? prev : current;
            });
            lastOrders.push(max);
        });

        return {
            "supplierId": supplier.supplierId,
            "supplierName": supplier.supplierName,
            "orders": lastOrders
        }
    });

    return ordersBySupplier;
}

const getArticlesOrderedBySupplier = (ordersBySupplier) => {
    let articlesOrderedBySupplier = [];
    ordersBySupplier.forEach(order => {
        order.orders.forEach(article => {
            let currentArticle = data.articleList.find(currentArticle =>
                currentArticle.articleId === article.articleId
            )

            if (currentArticle) {
                let currentArticleClass = data.articleClass.find(articleClass =>
                    articleClass.classId === currentArticle.articleClass
                )

                let articleOrderedBySupplier = {
                    "articleId": currentArticle.articleId,
                    "description": currentArticle.description,
                    "lastOrderDate": article.orderDate,
                    "supplierName": order.supplierName,
                    "articleClass": currentArticleClass.className
                }
                articlesOrderedBySupplier.push(articleOrderedBySupplier);
            }
        });
    })

    return articlesOrderedBySupplier;
}

 buildArticlesTable = (articlesOrderedBySupplier) => {
    let tbody = `<tbody>
            ${articlesOrderedBySupplier.map((article) => {
        return `<tr>
                <td>${article.articleId}</td>
                <td>${article.description}</td>
                <td>${article.lastOrderDate}</td>
                <td>${article.supplierName}</td>
                <td>${article.articleClass}</td>
            </tr>`;
    }).join(" ")}
        </tbody>`;
    table.innerHTML += tbody;
}

searchButton.addEventListener("click", () => {
    let searchedSupplier = searchInput.value;

    utils.cleanUpTable(table);

    if (searchedSupplier && searchedSupplier.trim() != "") {
        let ordersBySupplier = getOrdersBySupplier(searchedSupplier);
        let articlesOrderedBySupplier = getArticlesOrderedBySupplier(ordersBySupplier);

        if (articlesOrderedBySupplier.length > 0) {
            buildArticlesTable(articlesOrderedBySupplier);
        } else {
            utils.createNotFoundMessage(table, "No orders found");
        }
    } else {
        utils.createNotFoundMessage(table, "No orders found");
    }

})


utils.createNotFoundMessage(table, "No orders to display");

