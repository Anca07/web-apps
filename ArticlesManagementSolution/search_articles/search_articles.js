const articleClassTree = utils.arrayToTree(data.articleClass);
const table = document.querySelector("#filtered-articles-table");
const selectArticlesContainer = document.querySelector(".select-articles-container");

const displayAllArticles = (articleClassTree, tbody) => {
    articleClassTree.forEach(article => {
        filterArticles(article, tbody);
    })
}

const onSelectOptionChangeHandler = (event, select, articleClassList) => {
    while (select.nextSibling) {
        select.parentNode.removeChild(select.nextSibling);
    }
    let selectedOption = event.target.value;
    let selectedArticle = articleClassList.find(item => item.className === selectedOption)

    if (selectedArticle && selectedArticle.children.length > 0) {
        buildSelect(selectedArticle.children);
    }

    utils.cleanUpTable(table);

    let tbody = utils.createTableBody(table);

    if (selectedArticle) {
        filterArticles(selectedArticle, tbody)
    } else {
        let prevSelectArticle = searchArticle(articleClassTree, select.id);
        if (prevSelectArticle) {
            filterArticles(prevSelectArticle, tbody);
        } else {
            displayAllArticles(articleClassTree, tbody);
        }
    }
}

const buildSelect = (articleClassList) => {
    let select = document.createElement("select");

    let defaultOption = document.createElement("option");
    defaultOption.text = "ALL";
    defaultOption.selected = true;

    select.id = articleClassList[0].parentId;
    select.appendChild(defaultOption);

    articleClassList.forEach(article => {
        let option = document.createElement("option");
        option.text = article.className;
        select.appendChild(option);
    })

    select.addEventListener("change", (event) => { onSelectOptionChangeHandler(event, select, articleClassList) })
    selectArticlesContainer.appendChild(select);
}

const buildArticlesTable = (articles, container) => {
    let tableRows = `${articles.map((article) => {
        return `<tr>
                <td>${article.articleId}</td>
                <td>${article.description}</td>
                <td>${article.className}</td>
            </tr>`;
    }).join(" ")}`;
    container.innerHTML += tableRows;
}

const filterArticles = (selectedArticle, container) => {
    if (selectedArticle) {
        let filteredArticles = data.articleList.filter(currentArticle => selectedArticle.classId === currentArticle.articleClass)
            .map(filteredArticle => {
                return {
                    "articleId": filteredArticle.articleId,
                    "description": filteredArticle.description,
                    "className": selectedArticle.className
                }
            })

        if (selectedArticle.children.length > 0) {
            selectedArticle.children.forEach(childArticle => {
                filterArticles(childArticle, container)
            })
        }

        buildArticlesTable(filteredArticles, container);
    }
}

const searchArticle = (tree, id) => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].classId == id) {
            return tree[i];
        } else if (tree[i].children) {
            var result = null;
            result = searchArticle(tree[i].children, id);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

buildSelect(articleClassTree);

let tbody = utils.createTableBody(table);
displayAllArticles(articleClassTree, tbody);