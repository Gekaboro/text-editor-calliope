matrix.init(matrix.ePages.y128)

let text : Array<string> = [""]
let cursor_x = 0
let cursor_y = 0

//codes
let ARROW_UP = 181
let ARROW_DOWN = 182
let ARROW_LEFT = 180
let ARROW_RIGHT = 183
let ARROW_KEYS : Array<number> = [ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT]
let CHAR_LENGTH = 10

pins.onKeyboardEvent(function(zeichenCode: number, zeichenText: string, isASCII: boolean) {
    if (ARROW_KEYS.indexOf(zeichenCode) > -1) {
        change_cursor_pos(zeichenCode)
    }
    else {
        text[cursor_y] = [text[cursor_y].slice(0, cursor_x), zeichenText, text[cursor_y].slice(cursor_x)].join('');
        cursor_x++
    }

    for (let i = 0; i < text.length; i++) {
        matrix.clearMatrix()
        matrix.writeTextCharset(0, 0, matrix.matrix_text(text[i]))
        matrix.displayMatrix()
    }
})

function change_cursor_pos(code : number) {
    if (code == ARROW_UP && cursor_y > 0) {
        cursor_y -= 1
    }
    else if (code == ARROW_DOWN && cursor_y < (text.length - 1)) {
        cursor_y += 1
    }
    else if (code == ARROW_LEFT && cursor_x > 0) {
        cursor_x -= 1
    }
    else if (code == ARROW_RIGHT && cursor_x < (text[cursor_y].length - 1)) {
        cursor_x += 1
    }
}

loops.everyInterval(200, function() {
    pins.raiseKeyboardEvent(true)
})

//!!!!!!!!ABSPEICHERN!!!!!!!!!!
