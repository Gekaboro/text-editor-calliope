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
let ENTER_KEY = 13
let RETURN_KEY = 8
let CHAR_LENGTH = 8

pins.onKeyboardEvent(function(zeichenCode: number, zeichenText: string, isASCII: boolean) {
    if (ARROW_KEYS.indexOf(zeichenCode) > -1) {
        change_cursor_pos(zeichenCode)
    }
    else if (zeichenCode == ENTER_KEY) {
        text.insertAt(cursor_y + 1, "")
        cursor_y++
        cursor_x = 0
    }
    else if (zeichenCode == RETURN_KEY) {
        if (cursor_x == 0) {
            text.removeAt(cursor_y)
            cursor_y -= 1
        }
        else {
            [text[cursor_y].slice(0, cursor_x - 1), text[cursor_y].slice(cursor_x)].join('')
            cursor_x -= 1
        }
    }
    else {
        text[cursor_y] = [text[cursor_y].slice(0, cursor_x), zeichenText, text[cursor_y].slice(cursor_x)].join('')
        cursor_x++
    }

    matrix.clearMatrix()
    for (let i = 0; i < text.length; i++) {
        matrix.writeTextCharset(i, 0, matrix.matrix_text(text[i]))
    }
    matrix.line(cursor_x * CHAR_LENGTH - 2, cursor_y * 10, cursor_x * CHAR_LENGTH - 2, cursor_y * 10 + 6)
    matrix.displayMatrix()
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
    else if (code == ARROW_RIGHT && cursor_x < (text[cursor_y].length)) {
        cursor_x += 1
    }
}

loops.everyInterval(200, function() {
    pins.raiseKeyboardEvent(true)
})

//!!!!!!!!ABSPEICHERN!!!!!!!!!!
