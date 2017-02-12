function sendMessage() {

    var deferred;
    var elements = document.forms.sendMessage.elements;
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

 	document.getElementById("sendMessageText").value = "";
    document.forms.sendMessage.submit();
}
