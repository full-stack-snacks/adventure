const descriptions = [
    "An empty emptiness",
    "Solid and unpassable",
    "The fullfillment of my quest",
    "Danger lurks there",
    "Similar to a wall, but more inviting",
    "The intrepid protagonist",
]

export default function handler(req, res) {
    const command = req.body.command;
    const map = req.body.map;
    let player = req.body.player;
    let description = "";
    let result = "";

    switch (command) {

        case "new map":
            result = newMap();
            break;
        case "look up":
            result = look("up", map, player);
            break;

        case "move up":
            result = move("up", map, player);
            break;
        
        case "look down":
            result = look("down", map, player);
            break;

        case "move down":
            result = move("down", map, player);
            break;

        case "look right":
            result = look("right", map, player);
            break;

        case "move right":
            result = move("right", map, player);
            break;

        case "look left":
            result = look("left", map, player);
            break;

        case "move left":
            result = move("left", map, player);
            break;

    }

    res.status(200).json({
        command,
        map: result.map,
        player: result.player,
        description: result.description,
    })
}

function look(direction, map, player) {

    let x = player.x;
    let y = player.y;

    switch (direction) {
        case "up":
            y -= 1;
            break;
        case "down":
            y += 1;
            break;
        case "left":
            x -= 1;
            break;
        case "right":
            x += 1;
            break;
    }

    const value = map[y][x];

    const description = descriptions[value];

    return { map, player, description };
}

function move(direction, map, player) {

    let y = player.y;
    let x = player.x;

    const prev_y = y;
    const prev_x = x;

    switch (direction) {
        case "down":
            y += 1;
            break;
        case "up":
            y -= 1;
            break;
        case "left":
            x -= 1;
            break;
        case "right":
            x += 1;
            break;
    }

    let description = "";

    if (map[y][x] === 0) {
        player.x = x;
        player.y = y;
        description = "Moving " + direction;
    } else {
        description = "Cannot move " + direction
    }

    return { map, player, description };
}

function newMap() {
    const map = [
        [1, 4, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 3, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 3, 1],
        [1, 0, 0, 0, 0, 0, 2],
        [1, 1, 1, 1, 1, 1, 1],
    ];

    return {
        map,
        player: {
            x: 1,
            y: 1,
        },
        description: "The adventure begins..."
    }
}