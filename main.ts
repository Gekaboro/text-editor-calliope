matrix.init(matrix.ePages.y128)

let text : Array<string> = [""]
let cursor_x = 0
let cursor_y = 0
let camera_y = 0

//codes
let ARROW_UP = 181
let ARROW_DOWN = 182
let ARROW_LEFT = 180
let ARROW_RIGHT = 183
let ARROW_KEYS : Array<number> = [ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT]
let ENTER_KEY = 13
let RETURN_KEY = 8
let CHAR_LENGTH = 8
let CHAR_HEIGHT = 8
let LINES_ON_SCREEN = 16

pins.raiseKeyboardEvent(true)

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
            if (cursor_y > 0) {
                text.removeAt(cursor_y)
                cursor_y -= 1
            }
        }
        else {
            text[cursor_y] = [text[cursor_y].slice(0, cursor_x - 1), text[cursor_y].slice(cursor_x)].join('')
            cursor_x -= 1
        }
    }
    else {
        text[cursor_y] = [text[cursor_y].slice(0, cursor_x), zeichenText, text[cursor_y].slice(cursor_x)].join('')
        cursor_x++
    }

    change_camera_pos()

    matrix.clearMatrix()
    for (let i = camera_y; i < Math.clamp(0, text.length, camera_y + LINES_ON_SCREEN); i++) {
        let j = i - camera_y
        if (i < 9) {
            matrix.writeTextCharset(j, 0, [["0", (i + 1).toString()].join(""), matrix.matrix_text(text[i])].join(""))
        }
        else {
            matrix.writeTextCharset(j, 0, [(i + 1).toString(), matrix.matrix_text(text[i])].join(""))
        }
    }
    let local_cursor_y = cursor_y - camera_y
    matrix.line((cursor_x + 2) * CHAR_LENGTH - 1, local_cursor_y * CHAR_HEIGHT, (cursor_x + 2) * CHAR_LENGTH - 1, local_cursor_y * CHAR_HEIGHT + 6)
    matrix.line(2 * CHAR_LENGTH - 2, 0, 2 * CHAR_LENGTH - 2, 128)
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

function change_camera_pos() {
    if (cursor_y < camera_y) {
        camera_y = cursor_y
    }
    if (cursor_y > (camera_y + LINES_ON_SCREEN - 1)) {
        camera_y = cursor_y - LINES_ON_SCREEN + 1
    }
}

function run(program_lines : Array<string>) {
    let program : Array<string> = []
    let token_counter : number = 0
    let label_tracker_names : Array<string> = []
    let label_tracker_data: Array<string> = []

    for (let line = 0; line < program_lines.length; line++) {
        let parts = program_lines[line].split(" ")
        let opcode = parts[0]

        //check if opcode is emtpy
        if (opcode == "") {
            continue
        }
    }
}

loops.everyInterval(200, function() {
    pins.raiseKeyboardEvent(true)
})

//!!!!!!!!ABSPEICHERN!!!!!!!!!!
