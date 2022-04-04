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
                
                if (r == 1) { this.points++; }
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
            var row = this.grid[i].join()
            .replace(/,/g, "").split("0")                         // ['','','','1','1','','','1''1''1']
            .filter((value, index, arr) => {    // removing empty strings from array
                return value != "";
            });
            
            // retreive all values on column with x = i
            var col = [];
            for (var _y = 0; _y < this.size; _y++) {
                col.push(this.grid[_y][i]);
            }
            // filter out bomb tiles from column array
            col = col.join()
            .replace(/,/g, "").split("0")
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

    build() {
        document.getElementById('livesCounter').innerHTML = this.lives;
    
        var div = document.getElementById("board"); // get div
        
        var t = document.createElement("table");
        // t.setAttribute("cellspacing", "0");

        for (var y = -1; y < this.size; y++)
        {
            var tr = document.createElement("tr");
            // tr.setAttribute("class", "row");
            
            for (var x = -1; x < this.size; x++)
            {
                var td = document.createElement("td");

                // upper left corner
                if (y == -1 && x == -1)
                {
                    tr.appendChild(td)
                    continue;
                }

                if (y == -1 && x != -1)
                {
                    // write col hints
                    
                    var hintlist = "";
                    var p = document.createElement("p");
                    p.setAttribute("class", "verticalHints");

                    for (var i = 0; i < this.indicators[0][x].length; i++)
                    {
                        hintlist += this.indicators[0][x][i] + "<br/>";
                    }

                    p.innerHTML = hintlist;
                    td.appendChild(p);
                }
                else if (x == -1)
                {
                    // write row hints
                    var hintlist = "";
                    var p = document.createElement("p");

                    for (var i = 0; i < this.indicators[1][y].length; i++)
                    {
                        hintlist += this.indicators[1][y][i] + " ";
                    }

                    p.innerHTML = hintlist;
                    td.appendChild(p);
                }
                else
                {
                    // set button for tile
                    var btn = document.createElement("button");
                    btn.setAttribute("id", x + "_" + y);
                    btn.setAttribute("onclick", "board.reveal(" + x + "," + y + ")");
                    
                    // btn.innerHTML = map[y - 1][x - 1].toString();//" ";
                    btn.innerHTML = " ";
                    td.appendChild(btn);
                }

                tr.appendChild(td);
            }
            t.appendChild(tr);
        }
        div.appendChild(t);
    
    }
    
    reveal(x, y) {
        console.log(x, y);

        if (this.lives == 0)
        {
            return; // GAME OVER
        }
    
        var tile = document.getElementById(x + "_" + y);
        var color = "#000";
        var bg = "";
    
        if (this.isSetting)
        {
            var content = this.grid[y][x].toString();
            if (tile.innerHTML == " ")
            {
                if (content == 0)
                {
                    document.getElementById('livesCounter').innerHTML = --this.lives;
                    bg = "#ff726f";
                    color = bg;
                    content = '💣';
                }
                else
                {
                    this.points += 1;
                    bg = "; background-color: #90EE90;";
                    color = "#fff";
                    content = "✔"
                    // content = '🟢';
                    
                    // fillRemainingRow(x, y);
                }
            }
            else
            {
                return; // skips repeated clicking on revealed panel (point farming)
            }
        }
        else
        {
            var comment_symbol = '?';
    
            if (tile.innerHTML == comment_symbol)
            {
                var content = " ";
                bg = "#fff";
            }
            else if (tile.innerHTML == " ")
            {
                var content = comment_symbol;
                color = "#666";
                bg = "#ccc";
            }
            else 
            {
                return;
            }
        }
        
        tile.setAttribute("class", "shadow tile");
        tile.setAttribute("style", "color: " + color + "; background-color: "+ bg);
        tile.innerHTML = content;
    
        if (this.points == this.totalPoints)
        {
            var pgm = document.getElementById("postgameMessage");
            pgm.innerHTML = "YOU WON!!";
            pgm.setAttribute("style", "display: block; color: #0f0");
        }
        else if (this.lives == 0)
        {
            var pgm = document.getElementById("postgameMessage");
            pgm.innerHTML = "GAME OVER";
            pgm.setAttribute("style", "display: block; color: rgb(255, 204, 36)");
        }
        else {}

    }
}