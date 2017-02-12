function sendMessage() {
    var deferred;
    var elements = document.forms.sendMessage.elements;
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

    $('.earthFirst').hide()
    $('.earth').show()

    setTimeout(function(){
        $.ajax({
            type: 'POST',
            url: '/message',
            data: obj,
            dataType: 'json'
        })
    }, 1600);

    setTimeout(function(){
        document.getElementById("sendMessageText").value = "";
        $('.earth').hide();
        $('.earthFirst').show()
    }, 2100);
}
