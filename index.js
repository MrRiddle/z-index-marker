/**
 * vars
 */
var IS_OPEN = false;
var datas = [];

/**
 * events
 */
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        switch (request.type) {
            case 'CHANGE_STATE': {
                IS_OPEN = request.data.open;
                if (IS_OPEN) {
                    document.querySelector('.z-index-marker').classList.remove('hide');
                    print();
                } else {
                    document.querySelector('.z-index-marker').classList.add('hide');
                }
                break;
            }
            default:
                break;
        }
        sendResponse();
});


/**
 * business
 */
insertDOM();
initData();

/**
 * functions
 */
function insertDOM() {
    var panel = document.createElement('div');
    panel.classList.add('z-index-marker');
    document.body.appendChild(panel);
}

function initData() {
    datas = Array.from(document.querySelectorAll('*'))
                .map(n => ({ node: n, value: getComputedStyle(n)['z-index'] }))
                .filter(n => (Number(n.value)))
                .sort((a, b) => (a.value - b.value));
}

function print() {
    console.table(datas);
}
