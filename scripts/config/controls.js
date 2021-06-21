const keyBoardAllowedControls = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z', 'h', ' ', 'arrowup', 'arrowdown',
    'arrowleft', 'arrowright'
];

function getKeyView(key) {
    let keyView;

    switch (key) {
        case 'arrowup': keyView = '\u2191'; break;
        case 'arrowdown': keyView = '\u2193'; break;
        case 'arrowleft': keyView = '\u2190'; break;
        case 'arrowright': keyView = '\u2192'; break;
        case ' ': keyView = 'space'; break;
        default: keyView = key;
    }

    return keyView;
}

export {
    keyBoardAllowedControls,
    getKeyView,
}

