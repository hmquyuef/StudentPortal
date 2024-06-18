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
        url: 'http://192.168.98.60:8080/api/settings',
        type: 'GET',
        success: function (result) {
            var items = result.data.items;
            var current = window.location.pathname;
            console.log(current);
            if (items.length > 0) {
                items.map((r, i) => {
                    console.log("ITEM: ", r)
                    if (!r.isSubMenu) {
                        var child = items.filter(x => x.parentId === r.id);
                        if (child.length > 0) {
                            $("#loadUrl").append(`
                                <li class="menu-item ${current === ('/' + r.url) ? 'active open' : ''}" id="${r.id}">
                                    <a href="${r.url}" class="menu-link menu-toggle">
                                        <i class="menu-icon tf-icons ${r.contextIcon}"></i>
                                        <div class="text-truncate">${r.text}</div>
                                    </a>
                                    <ul class="menu-sub">
                                        ${child.map((c, j) => {
                                        return `<li class="menu-item ${current === ('/' + r.url) ? 'active open' : ''}" id="${c.id}">
                                                    <a href="${c.url}" class="menu-link">
                                                        <i class="menu-icon tf-icons ${c.contextIcon}"></i>
                                                        <div class="text-truncate">${c.text}</div>
                                                    </a>
                                                </li>`
                                        }).join('')}
                                    </ul>
                                </li>`);
                        }
                        else {
                            $("#loadUrl").append(`
                                <li class="menu-item ${current === ('/' + r.url) ? 'active' : ''}" id="${r.id}">
                                    <a href="${r.url}" class="menu-link">
                                        <i class="menu-icon tf-icons ${r.contextIcon}"></i>
                                        <div class="text-truncate">${r.text}</div>
                                    </a>
                                </li>`);
                        
                        }
                    }
                });
            }
        },
        error: function (err) {
            console.log(err)
        }
    });
}