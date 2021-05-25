restaurant.controller('controller_verify', function(service_toastr, verify) {
    console.log(verify);
    switch (verify.type) {
        case "true":
            localStorage.removeItem('login_page');
            service_toastr.alerta("success", "VERIFICADO", verify.msg);
            console.log("success");
            window.location.href = "#/login";
            break;
        case "error":
            if (verify.msg === "404") {
                console.log("404");
                window.location.href = "#/404";
            } else {
                console.log("error");
                localStorage.removeItem('login_page');
                service_toastr.alerta("error", "NO VERIFICADO", verify.msg);
                window.location.href = "#/login";
            }
            break;
    }
});