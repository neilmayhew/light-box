/* JavaScript for Dominic's Light Box project*/

/* Images used */
imgOn  = "light-box-on.png";
imgOff = "light-box-off.png";

imgLoader = new Image(); imgLoader.src = imgOn;
imgLoader = new Image(); imgLoader.src = imgOff;

/* Solution array */
clicks = new Array();
for (var row = 1; row <= 5; ++row)
{
	clicks[row] = new Array();
	for (var col = 1; col <= 5; ++col)
	{
		clicks[row][col] = 0;
	}
}

/* Return the image at row, col */
function imgFor(row, col)
{
	var table = document.getElementById('box');
	var cell = table.rows[row-1].cells[col-1];
	var img = cell.getElementsByTagName('img')[0];

	return img;
}

/* Return true if row, col is on */
function get(row, col)
{
	/* Have to use search rather than ==, since src contains extra chars */
	return imgFor(row, col).src.search(imgOn) >= 0;
}

/* Set row, col to on if state is true, otherwise off */
function set(row, col, state)
{
	if (state)
		imgFor(row, col).src = imgOn;
	else
		imgFor(row, col).src = imgOff;
}

function flip(row, col)
{
	if (get(row, col))
		set(row, col, false);
	else
		set(row, col, true);
}

function touch(row, col)
{
	flip(row, col);
	if (row + 1 <= 5)
		flip(row + 1, col);
	if (col + 1 <= 5)
		flip(row, col + 1);
	if (row - 1 >= 1)
		flip(row - 1, col);
	if (col - 1 >= 1)
		flip(row, col - 1);
	clicks[row][col]++;
	check();
}


function reset()
{
	for (var row = 1; row <= 5; ++row)
	{
		for (var col = 1; col <= 5; ++col)
		{
			set(row, col, true);
			clicks[row][col] = 0;
		}
	}
}
function flipAll()
{
	for (var row = 1; row <= 5; ++row)
	{
		for (var col = 1; col <= 5; ++col)
		{
			touch(row, col);
		}
	}
}

function showHistory()
{
	for (var row = 1; row <= 5; ++row)
	{
		for (var col = 1; col <= 5; ++col)
		{
			set(row, col, (clicks[row][col] % 2) == 1);
		}
	}
}

function check()
{
	var allOff = true;
	var allOn = true;
	for (var row = 1; row <= 5; ++row)
	{
		for (var col = 1; col <= 5; ++col)
		{
			if (get(row, col))
				allOff = false;
			else
				allOn = false;
		}
	}
	if (allOff)
		finish();
	if (allOn)
		start();
}

function finish()
{
	alert("You WIN!");
}

function start()
{
	alert("Back to the Start!");
}
