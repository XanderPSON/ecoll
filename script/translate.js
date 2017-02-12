function sendMessage() {

    var deferred;
    var elements = document.forms.sendMessage.elements;
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

 $.ajax({
        type: 'POST',
        url: '/message',
        data: obj,
        dataType: 'json'
    }).then(function(){
    	document.getElementById("sendMessageText").value = "";
    });


}
