let tileArray = [
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '#', '.', '.', '.', '#', '.', '#', '.'],
    ['#', '.', '.', '#', '.', '.', '.', '.', '.'],
    ['.', '.', '#', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '#', '.', '.'],
    ['.', '#', '.', '#', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '#', '.', '#', '.'],
    ['.', '#', '#', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '#', '.', '.', '.', '.'],
];

let x = 4, y = 4;
let exposed = [
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
];

let clear_exposed = () => {
    exposed = [];
    for (let i = 0; i < 9; i++) {
        let blank_start = [false, false, false, false, false, false, false, false, false];
        exposed.push(blank_start);
    }
}

let raycast = (x, y, range, angle) => {
    for (let i = 0; i < range; i++) {
        let x_offset = Math.round(Math.cos(angle) * i);
        let y_offset = Math.round(Math.sin(angle) * i);
        if (x + x_offset < 9 && y + y_offset < 9
            && x + x_offset >= 0 && y + y_offset >= 0) {
                exposed[x + x_offset][y + y_offset] = true;
                if (tileArray[x + x_offset][y + y_offset] === '#') {
                    return;
                }
            }
    }
}

let update = (range) => {
    let angle = 0, increment = (Math.PI / 36);
    clear_exposed();
    exposed[x][y] = true;
    for (let i = 0; i < 72; i++) {
        raycast (x, y, range, angle);
        angle += increment;
    }
}

let print = () => {
    console.log("    0  1  2  3  4  5  6  7  8");
    for (let i = 0; i < tileArray.length; i++) {
        let string = "";
        for (let j = 0; j < tileArray[i].length; j++) {
            if (x == i && y == j) {
                string += " @ ";
            } else {
                if (exposed[i][j] == true) {
                    string += " " + tileArray[i][j] + " ";
                } else {
                    string += " ? ";
                }
            }
        }
        console.log(i + "| " + string);
    }
}