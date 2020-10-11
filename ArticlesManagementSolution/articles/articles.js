const table = document.querySelector("#articles-table");
const tableBody = document.querySelector("#articles-table tbody");

utils.cleanUpTable(table);

let tbody = `<tbody>
    ${data.articleList.map((article) => {
    let currentArticleOrders = data.orders.filter(order => {
        return order.articleId === article.articleId;
    });

    let sumQuantities = currentArticleOrders.reduce((sum, current) => {
        return sum + current.quantity
    }, 0);

    return `<tr>
                <td>${article.articleId}</td>
                <td>${article.description}</td>
                <td>${sumQuantities}</td>
                <td>${currentArticleOrders.length}</td>
                <td><i class='${utils.getActiveIconClass(article.activ)}'></i></td>
                <td>${utils.getFormattedDate(article.expirationDate)}</td>
            </tr>`;
})
        .join(" ")}
</tbody>`;

table.innerHTML += tbody;