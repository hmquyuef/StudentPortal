$(document).ready(function () {
    renderAsideMenu();
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
});
function renderAsideMenu() {
    $("#loadUrl").empty();
    $.ajax({
        url: 'http://localhost:5007/api/settings',
        //url: 'http://192.168.98.60:8080/api/settings',
        type: 'GET',
        success: function (result) {
            console.log("MENU URL: ", result.data.items)
            if (result.data.items.length > 0) {
                result.data.items.map((item, index) => {
                    if (item.children.length > 0) {
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
                        item.children.map((child, index) => {
                            $("#" + item.id).append(`
                                <ul class="menu-sub">
                                    <li class="menu-item ${currentPage === (item.url + child.url) ? 'active' : ''}">
                                        <a href="${item.url + child.url}" class="menu-link">
                                            <div class="text-truncate">${child.text}</div>
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