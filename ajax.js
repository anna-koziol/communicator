let color = 'rgb(' + (Math.floor(Math.random() * 255 + 1)) + ',' + (Math.floor(Math.random() * 255 + 1)) + ',' + (Math.floor(Math.random() * 255 + 1)) + ')';
let nick = 'user';
let nowTime, nowTimeFull;
let hours, minutes, seconds;
let hours2, minutes2, seconds2;


let poll = function () {
    let countMessege = $(".messages").length;

    $.ajax({
        url: "alp.php",
        data: { nowTime: nowTimeFull, count: countMessege },
        type: "POST",
        complete: poll,
        success: function (msg) {
            if (msg == "noUpdate") { console.log("nic") }
            else if (msg == "delete") { $("#ta1").html(' '); }
            else {
                $("#ta1").html(' ');
                msgs = JSON.parse(msg);

                $.each(msgs, function (index, object) {
                    let data = $('<div>')
                    $(data).html("[" + object.date + "]" + ' <@' + object.nick + '>  ')
                    data.css("color", object.color)

                    let content = $('<div class="messagesContent">')
                    $(content).html("  " + object.messege)
                    $(content).emoticonize({ animate: false })

                    let div = $('<div class="messages">')
                    $(div).append(data, content)

                    $("#ta1").append(div)
                    $("#ta2").val("  ");
                });
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        },
    });
}


let baseMessege = function (nickF, messageF, dateF, colorF) {
    $.ajax({
        url: "base.php",
        data: { nick: nickF, messege: messageF, date: dateF, color: colorF },
        type: "POST",
        success: function (data) {
            console.log("wysłało się -->", data)
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        },
    });
}

let loginPanel = function () {
    $("#dolacz").on("click", function () {
        let nowTime = new Date;
        if ($("#nick").val() != "") { nick = $("#nick").val() }

        $("#login").css("opacity", "0")
        $("#login").css("transition", "2s")
        setTimeout(function () { $("#login").css("display", "none"); }, 2000);

        if (nowTime.getHours() < 10) { hours2 = '0' + nowTime.getHours(); }
        else { hours2 = nowTime.getHours(); }

        if (nowTime.getMinutes() < 10) { minutes2 = '0' + nowTime.getMinutes(); }
        else { minutes2 = nowTime.getMinutes(); }

        if (nowTime.getSeconds() < 10) { seconds2 = '0' + nowTime.getSeconds(); }
        else { seconds2 = nowTime.getSeconds(); }

        nowTimeFull = hours2 + ":" + minutes2 + ":" + seconds2;

        poll();
    })
}

let sendClick = function () {
    $("#send").on("click", function () {
        new Date($.now());
        let newTime = new Date();

        if (newTime.getHours() < 10) { hours = '0' + newTime.getHours(); }
        else { hours = newTime.getHours(); }

        if (newTime.getMinutes() < 10) { minutes = '0' + newTime.getMinutes(); }
        else { minutes = newTime.getMinutes(); }

        if (newTime.getSeconds() < 10) { seconds = '0' + newTime.getSeconds(); }
        else { seconds = newTime.getSeconds(); }

        let time = hours + ":" + minutes + ":" + seconds;
        let message = $("#ta2").val();
        $("#ta2").val("  ");

        baseMessege(nick, message, time, color);
    })
}

document.addEventListener("DOMContentLoaded", function (event) {
    loginPanel();
    sendClick();
});

