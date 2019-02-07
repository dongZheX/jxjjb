function getConfig(param) {
    $.getJSON("config/config.json",function (data) {
        if (!data){
            $.getJSON("../config/config.json",function (data2) {
                obj2 = JSON.parse(JSON.stringify(data2));
                return obj2[param];
            });
        }
        obj = JSON.parse(JSON.stringify(data));
        return obj[param];
    })
}
