function generate_values(size=10)
{
    var map = [];
    var hints = [];

    for (var y=0; y < size; y++)
    {
        map.push([]);
        for (var x=0; x < size; x++)
        {
            var r = Math.floor(Math.random() * 2);      // generate random number
            map[y].push(r); // set value in map array 
        }

    }
    return map;
}

function get_hints(map)
{
    // map is never empty
    var hints = [];
    for (var y = 0; y < map[0].length; y++)
    {
        /*
        get hints for row
        get hints for col

        */
        hints.push([[], []]);   // [row, col]

        var rowstr = map[y].join().replace(/,/g, "");  // conversion to string
        rowstr = rowstr.split("0");                   // splitting into array

        var colstr = "";
        for (var row = 0; row < map.length; row++)
        {
            colstr += map[row][y];
        }
        colstr = colstr.split('0');

        // calculation for rows and cols
        for (var i = 0; i < map.length; i++)
        {
            if (i < rowstr.length)
            {
                if (rowstr[i] != "")                   // if more than one 0 == ""
                {
                    hints[y][0].push(rowstr[i].length);
                }
            }
            
            if (i < colstr.length)
            {
                if (colstr[i] != "")
                {
                    hints[y][1].push(colstr[i].length);
                }
            }
        }
    }
    return hints;
}

function generateBoard(map, hints)
{
    var div = document.getElementById("board"); // get div
    var t = document.createElement("table");
    t.setAttribute("style", "margin: auto");

    for (var y = 0; y < map.length + 1; y++)
    {
        var tr = document.createElement("tr");
        
        for (var x = 0; x < map.length + 1; x++)
        {
            var td = document.createElement("td");

            // upper left corner
            if (y == 0 && x == 0)
            {
                tr.appendChild(td)
                continue;
            }

            if (y == 0)
            {
                // write col hints
                
                var hintlist = "";
                var p = document.createElement("p");
                p.setAttribute("class", "verticalHints");

                for (var i = 0; i < hints[x - 1][1].length; i++)
                {
                    hintlist += hints[x - 1][1][i] + "<br/>";
                }

                p.innerHTML = hintlist;
                td.appendChild(p);
            }
            else if (x == 0)
            {
                // write row hints
                var hintlist = "";
                var p = document.createElement("p");

                for (var i = 0; i < hints[y - 1][0].length; i++)
                {
                    hintlist += hints[y - 1][0][i] + " ";
                }

                p.innerHTML = hintlist;
                td.appendChild(p);
            }
            else
            {
                // set button for tile
                var btn = document.createElement("button");
                btn.setAttribute("id", x + "_" + y);
                btn.setAttribute("onclick", "revealValue(" + x + "," + y + ")");
                
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

function countPoints()
{
    var totalPoints = 0;
    for (var i = 0; i < hints.length; i++)
    {
        for (var el = 0; el < hints[i][0].length; el++)
        {
            totalPoints += hints[i][0][el];
        }
    }

    return totalPoints;
}

function revealValue(x, y)
{
    if (lives == 0)
    {
        return; // GAME OVER
    }

    var tile = document.getElementById(x + "_" + y);
    var color = "#000";
    var bg = "";

    if (logmode)
    {
        var content = map[y - 1][x - 1].toString();
        if (tile.innerHTML == " ")
        {
            if (content == 0)
            {
                lives -= 1;
                livesCounter.innerHTML = lives;
                color = "#f00";
            }
            else if (content == 1)
            {
                points += 1;
                bg = "; background-color: #444;";
                color = "#fff";
            }
        }
        else
        {
            return; // skips repeated clicking on revealed panel (point farming)
        }
    }
    else
    {
        if (tile.innerHTML == "X")
        {
            var content = " ";
        }
        if (tile.innerHTML == " ")
        {
            var content = "X";
            color = "#666";
        }
        else 
        {
            return;
        }
    }
    tile.setAttribute("style", "color: " + color + bg);
    tile.innerHTML = content;

    if (points == totalPoints)
    {
        var pgm = document.getElementById("postgameMessage");
        pgm.innerHTML = "YOU WON!!";
        pgm.setAttribute("style", "display: block; color: #0f0");
    }
    else if (lives == 0)
    {
        var pgm = document.getElementById("postgameMessage");
        pgm.innerHTML = "GAME OVER";
        pgm.setAttribute("style", "display: block; color: rgb(255, 204, 36)");
    }
    else {}
}

function changeMode()
{
    logmode = !logmode;
    
    var btn = document.getElementById("switch");
    if (logmode)
    {
        btn.innerHTML = "set";
    }
    else
    {
        btn.innerHTML = "comment"
    }
}

// start of the program
var map = generate_values();                                // generate array with values
var hints = get_hints(map);                                 // generate side hints

// set standard amount of lives at the beginning of the game
var lives = 3;
var livesCounter = document.getElementById("livesCounter");
livesCounter.innerHTML = lives;

// points system used for winning the game
var totalPoints = countPoints();
var points = 0;

logmode = true; // false if in commenting mode

// drawing buttons and tables
generateBoard(map, hints);