/*function scrollUrl(id) {
    const url = window.location.href;
    const index = url.indexOf("#");

    if (index < 0) {
        return url + "#" + id;
    } else {
        return url.substring(0, index) + "#" + id;
    }
}

const scrollHeight = document.getElementById('main').scrollHeight;
window.location.hash = 'bfoot';

function check() {
    if (document.getElementById('main').scrollHeight == scrollHeight &&
        document.getElementById('sfooter').attributes['style'].value !== "display:none") {
        return;
    }

    window.location.hash = 'bfoot';
    setTimeout(check, 500);
}

setTimeout(check, 500);*/

let scrollEnabled = true
function scrollToBottom() {
    const currentScrollHeight = document.getElementById('main').scrollHeight;
    console.log(document.getElementById('sfooter').attributes['style']);
    if (scrollEnabled) {
        window.scrollTo({ top: currentScrollHeight, behavior: 'smooth' });
        scrollEnabled = document.getElementById('sfooter').attributes['style'].value === "display:none";
        setTimeout(scrollToBottom, 500);
    }
}

scrollToBottom();