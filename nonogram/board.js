class Board
{
    grid = [];
    indicators = [];

    size = 10;
    
    Board(_size) {
        this.size = _size;

        this._generate();
        this._generateIndicators();

        this._build();
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

        for (var y=0; y < _size; y++)
        {
            this.grid.push([]);
            for (var x=0; x < _size; x++)
            {
                var r = Math.floor(Math.random() * 2);  // generate 0 or 1
                this.grid[y].push(r);
            }
        }
    }

    _generateIndicators() {

    }

    reveal() {

    }
}