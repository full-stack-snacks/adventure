const gameMap = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2],
];

export default function handler(req, res) {

    if (req.method == 'GET') {

        const workingMap = [...gameMap];
        workingMap[0][0] = 1;
        res.status(200).json(workingMap);

    } else if (req.method == 'POST') {

        const workingMap = req.body.map;

        // find the player (aka 1)
        let curPos = null;
        for (let i in workingMap) {
            for (let j in workingMap[i]) {
                if (workingMap[i][j] == 1) {
                    curPos = [i, j];
                }
            }
        }

        const y = parseInt(curPos[0]);
        const x = parseInt(curPos[1]);

        workingMap[y][x] = 0; //gameMap[y][x]; DANGER

        console.log("direction", req.body.direction)


        switch (req.body.direction) {
            case "down":
                workingMap[y + 1][x] = 1;
                break;
            case "up":
                workingMap[y - 1][x] = 1;
                break;
            case "left":
                workingMap[y][x - 1] = 1;
                break;
            case "right":
                workingMap[y][x + 1] = 1;
                break;

        }

        res.status(200).json(workingMap);
    }
}
