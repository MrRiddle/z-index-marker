/**
 * vars
 */
var IS_OPEN = false;

/**
 * events
 */
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        switch (request.type) {
            case 'CHANGE_STATE': {
                IS_OPEN = request.data.open;
                if (IS_OPEN) {
                    $('*').css('background', 'red');
                } else {
                    $('*').css('background', 'white');
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


/**
 * functions
 */
