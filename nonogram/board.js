class Board
{
    grid = [];
    indicators = [[], []];

    size = 10;
    lives = 3;
    totalPoints = 0;
    points = 0;

    isSetting = true;
    
    constructor(_size) {
        this.size = _size;

        this._generate();
        this._generateIndicators();

        this._build();
    }

    _build() {
        document.getElementById('livesCounter').innerHTML = this.lives;
    }

    _fill() {
        // check if the last checked element in row / col
        // 

        var pointsX = map[y-1].reduce((a, b) => a + b, 0);
        var col = [];
        map.forEach(element => {
            col.push(element[x - 1]);
        })

        var pointsY = col.reduce((a, b) => a + b, 0);

        // compilation of revealed tiles per row / col

        for (var x = 1; x < map.length + 1; x++)
        {
            var element = document.getElementById(x + '_' + y);
            
            if (element.inner_html == ' ' && map[y-1][x-1] == 0)
            {
                // not revealed yet

            }
        }
    }

    _generate(_size=this.size) {
        // Returns an two-dimensional array directly proportional to _size
        console.log("Randomizing grid");
        for (var y=0; y < _size; y++)
        {
            this.grid.push([]);
            for (var x=0; x < _size; x++)
            {
                var r = Math.floor(Math.random() * 2);  // generate 0 or 1
                this.grid[y].push(r);
            }
        }
        console.log(this.grid);
    }

    _generateIndicators() {
        // Generates a two-dimensional array containing the lenghts of non-bomb tiles
        console.log("Generating indicators");
        for (var i = 0; i < this.size; i++)
        {
            // filter out lengths from non-bomb tiles from row array
            var row = this.grid[i].join();
            row = row.replace(/,/g, "")
            .split("0")                         // ['','','','1','1','','','1''1''1']
            .filter((value, index, arr) => {    // removing empty strings from array
                return value != "";
            });
            
            // retreive all values on column with x = i
            var col = [];
            for (var _y = 0; _y < this.size; _y++) {
                col.push(this.grid[_y][i]);
            }
            // filter out bomb tiles from column array
            col = col.join().replace(/,/g, "")
            .split("0")
            .filter((value, index, arr) => {    
                return value != "";
            });

            // adding up the ones per element to actual length of free space
            for (var l = 0; l < row.length; l++) {
                row[l] = Array.from(row[l]).map(Number).reduce((a, b) => a + b, 0);
            }
            for (var l = 0; l < col.length; l++) {
                col[l] = Array.from(col[l]).map(Number).reduce((a, b) => a + b, 0)
            }

            this.indicators[0].push(col);
            this.indicators[1].push(row);
        }

        console.log(this.indicators);
    }

    _replace

    reveal() {

    }
}

$(document).ready(() => {
    var board = new Board(10);
    // console.log(board.grid, board.indicators);
});