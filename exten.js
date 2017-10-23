/**
 * vars
 */
var IS_OPEN = false;

/**
 * events
 */
chrome.browserAction.onClicked.addListener(
    function(tab) {
        chrome.tabs.sendRequest(tab.id, {
            type: 'CHANGE_STATE',
            data: {
                open: !IS_OPEN
            }
        }, function(response) {
            setState(!IS_OPEN);
        });
    }
);

/**
 * business
 */
setState(IS_OPEN);

/**
 * functions
 */
function setState(open) {
    IS_OPEN = open;

    var ICON_SIZE = 19;
    var canvas = document.createElement('canvas');
    canvas.width = ICON_SIZE;
    canvas.height = ICON_SIZE;
    var ctx = canvas.getContext('2d');

    if (IS_OPEN) {
        drawIcon(ctx, ICON_SIZE, 3, '#8E44AD');
    } else {
        drawIcon(ctx, ICON_SIZE, 3, 'gray');
    }

    chrome.browserAction.setIcon({
        imageData: ctx.getImageData(0, 0, ICON_SIZE, ICON_SIZE)
    });
}

function drawIcon(ctx, size, radium, fillStyle) {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.moveTo(radium, 0);
    ctx.arcTo(size, 0, size, size, radium);
    ctx.arcTo(size, size, 0, size, radium);
    ctx.arcTo(0, size, 0, 0, radium);
    ctx.arcTo(0, 0, size, 0, radium);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('z', size / 2, size / 2 - 2);
}