const utils = (function () {
    const arrayToTree = (arr) => {
        return arr
            .map((parent) => {
                parent.children = arr.filter((currentElement) => currentElement.parentId === parent.classId)
                return parent;
            })
            .filter((currentElement) => currentElement.parentId === 0);
    }

    const getFormattedDate = (dateString) => {
        let date = new Date(dateString);
        let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        let year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    const createIcon = (className) => {
        let icon = document.createElement("i");
        icon.className = className;
        return icon;
    }

    const getActiveIconClass = (isActive) => {
        let activeIconClass = null;
        if (isActive) {
            activeIconClass = 'far fa-check-square active-icon active-true-icon'
        } else {
            activeIconClass = 'far fa-window-close active-icon active-false-icon'
        }

        return activeIconClass;
    }

    const createNotFoundMessage = (container, message) => {
        cleanUpTable(container);

        let tbody = `<tbody>
                    <tr>
                        <td class='no-entry-found-message' colSpan=5>
                            ${message}
                        </td>
                    </tr>
                </tbody>`

        container.innerHTML += tbody;
    }

    const cleanUpTable = (table) => {
        let tbodyList = table.getElementsByTagName("tbody");

        if (tbodyList && tbodyList.length > 0) {
            let tbody = tbodyList[0];
            if (tbody) {
                table.removeChild(tbody);
            }
        }
    }

    const createTableBody = (table) =>{
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);
        return tbody;
    }

    const setActiveTab = () => {
        let aList = document.getElementById("navbar").getElementsByTagName('a');
        for (i = 0; i < aList.length; i++) {
            if (document.location.href.indexOf(aList[i].href) >= 0) {
                aList[i].className = "active";
            }
        }
    }

    return {
        arrayToTree,
        getFormattedDate,
        createIcon,
        getActiveIconClass,
        createNotFoundMessage,
        cleanUpTable,
        createTableBody,
        setActiveTab
    }
}());
