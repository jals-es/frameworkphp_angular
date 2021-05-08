function change_lang(lang) {
    lang = lang || localStorage.getItem('app-lang') || 'es';
    localStorage.setItem('app-lang', lang);
    var elements = document.querySelectorAll('[data-tr]');
    // alert("entra");
    $.ajax({
        type: "POST",
        url: "frontend/view/inc/lang/" + lang + ".json",
        dataType: "JSON",
        success: function(data) {
            // alert("entra1");
            console.log(elements);
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = data.hasOwnProperty(lang) ?
                    data[lang][elements[i].dataset.tr] :
                    elements[i].dataset.tr;
            }
            switch (lang) {
                case "val":
                    $("#op-val").attr("selected", true);
                    break;
                case "es":
                    $("#op-es").attr("selected", true);
                    break;
                case "en":
                    $("#op-en").attr("selected", true);
                    break;
            }
        }
    });
}

$(document).ready(function() {
    change_lang();
    $("#lang-btn").on("change", function() {
        switch (this.value) {
            case "val":
                change_lang("val");
                break;
            case "es":
                change_lang("es");
                break;
            case "en":
                change_lang("en");
                break;
        }
    });
});