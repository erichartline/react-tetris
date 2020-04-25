const STAGE_WIDTH = 12
const STAGE_HEIGHT = 20

const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"]),
  )

const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. check that we're on an actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. check that our move is inside the game area's height (y)
          // we shouldn't go through the bottom of the play area
          !stage[y + player.pos.y + moveY] ||
          // 3. check that our move is inside the game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. check that cell we're moving to isn't set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true
        }
      }
    }
  }
}

export { STAGE_WIDTH, STAGE_HEIGHT, createStage, checkCollision }
