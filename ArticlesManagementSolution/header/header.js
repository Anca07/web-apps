var headerTemplate = `
<header>
        <nav id="navbar">
            <h1 id="header-title">Articles Management Solution</h1>
            <a href="../article_class/article_class.html">Articles classes</a>
            <a href="../articles/articles.html">Articles list</a>
            <a href="../suppliers/suppliers.html">Suppliers list</a>
            <a href="../search_orders/search_orders.html">Search orders</a>
            <a href="../search_articles/search_articles.html">Search articles</a>
            <p>Copyright &copy; 2020</p>
        </nav>
    </header>
`

onLoad = () => {
    utils.setActiveTab();
}

window.onload = onLoad;

const headerElement = document.getElementById("header");
headerElement.insertAdjacentHTML("afterend", headerTemplate);

const headerTitle = document.getElementById("header-title");
headerTitle.addEventListener("click", () => {
    location.href = "../index.html";
})