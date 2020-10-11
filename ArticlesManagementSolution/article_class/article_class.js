const COLLAPSED_CLASS_NAME = "collapsed";
const EXPANDED_CLASS_NAME = "expanded";
const ARROW_RIGHT_CLASS_NAME = "fa-angle-right";
const ARROW_DOWN_CLASS_NAME = "fa-angle-down";
const ARTICLE_CLASS_ID = "#article-class"
const EXPAND_ALL_BUTTON_ID = "#expand-all"
const COLLAPSE_ALL_BUTTON_ID = "#collapse-all"

const divArticleClass = document.querySelector(ARTICLE_CLASS_ID);
const buttonExpandAll = document.querySelector(EXPAND_ALL_BUTTON_ID);
const buttonCollapseAll = document.querySelector(COLLAPSE_ALL_BUTTON_ID);

const toggleList = (ul, isCollapsed) => {
    if (isCollapsed) {
        ul.classList.remove(COLLAPSED_CLASS_NAME);
        ul.classList.add(EXPANDED_CLASS_NAME);
    } else {
        ul.classList.remove(EXPANDED_CLASS_NAME);
        ul.classList.add(COLLAPSED_CLASS_NAME);
    }
}

const toggleIcon = (icon, isCollapsed) => {
    if (isCollapsed) {
        icon.classList.remove(ARROW_RIGHT_CLASS_NAME);
        icon.classList.add(ARROW_DOWN_CLASS_NAME);
    } else {
        icon.classList.remove(ARROW_DOWN_CLASS_NAME);
        icon.classList.add(ARROW_RIGHT_CLASS_NAME);
    }
}

const onListItemClickHandler = (event, li) => {
    event.stopPropagation();
    let ul = li.querySelector("ul");
    let icon = li.querySelector("i");

    if (ul) {
        toggleList(ul, ul.classList.contains(COLLAPSED_CLASS_NAME));

        if (icon) {
            toggleIcon(icon, ul.classList.contains(EXPANDED_CLASS_NAME));
        }
    }
}

const createList = (container, arr) => {
    let ul = document.createElement("ul");

    arr.forEach((currentElement) => {
        let li = document.createElement("li");
        li.id = currentElement.classId;

        let icon = utils.createIcon(`fas ${ARROW_RIGHT_CLASS_NAME} expand-icon`);
        icon.style.visibility = "hidden";
        li.appendChild(icon);

        li.appendChild(document.createTextNode(currentElement.className));
        li.addEventListener("click", (event) => onListItemClickHandler(event, li));

        if (currentElement.children.length !== 0) {
            icon.style.visibility = "visible";
            createList(li, currentElement.children);
        }

        ul.appendChild(li);
        toggleList(ul, false);
    })

    container.appendChild(ul);
};

const toggleAllItems = (isCollapsed) => {
    let uls = mainList.querySelectorAll("ul");
    let icons = mainList.querySelectorAll("i");
    uls.forEach(ul => {
        toggleList(ul, isCollapsed);
    })
    icons.forEach(icon => {
        toggleIcon(icon, isCollapsed);
    })
}

buttonExpandAll.addEventListener("click", () => {
    toggleAllItems(true);
})

buttonCollapseAll.addEventListener("click", () => {
    toggleAllItems(false);
})

const articleClassTree = utils.arrayToTree(data.articleClass);
createList(divArticleClass, articleClassTree);

const mainList = document.querySelector(`${ARTICLE_CLASS_ID} > ul`);
mainList.classList.add("main-list");
toggleList(mainList, true);



