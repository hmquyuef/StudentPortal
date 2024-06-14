$(document).ready(function () {
    renderAsideMenu()
});
function renderAsideMenu() {
    $.ajax({
        url: 'http://192.168.98.60:8080/api/settings',
        type: 'GET',
        success: function (result) {
            console.log("MENU: ", result)
            if (result.data.items.length > 0) {
                result.data.items.map((item, index) => {
                    if (item.childrensMenus.length > 0) {
                        //get current page url
                        var currentPage = window.location.pathname;
                        console.log(currentPage)
                        $("#loadUrl").append(`
                            <li class="menu-item ${currentPage === item.url ? 'active open' : ''}" id="${item.id}">
                                <a href="${item.url}" class="menu-link menu-toggle">
                                    <i class="menu-icon tf-icons ${item.icon}"></i>
                                    <div class="text-truncate">${item.text}</div>
                                </a>
                            </li>`);
                        item.childrensMenus.map((child, index) => {
                            $("#" + item.id).append(`
                                <ul class="menu-sub">
                                    <li class="menu-item ${currentPage === (item.url + child.url) ? 'active' : ''}">
                                        <a href="${item.url + child.url}" class="menu-link">
                                            <div class="text-truncate">${child.url}</div>
                                        </a>
                                    </li>
                                </ul>`);
                        });
                    } else {
                        $("#loadUrl").append(`
                            <li class="menu-item ${currentPage === item.url ? 'active' : ''}">
                                <a href="${item.url}" class="menu-link">
                                    <i class="menu-icon tf-icons ${item.icon}"></i>
                                    <div class="text-truncate">${item.text}</div>
                                </a>
                            </li>`);
                    }
                });
            }
        },
        error: function (err) {
            console.log(err)
        }
    });
}