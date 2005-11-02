/* JavaScript for Dominic's Light Box project*/

/* Return the image at row, col */
function img(row, col)
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
	return img(row, col).src.search("light-box-on.png") >= 0;
}

/* Set row, col to on if state is true, otherwise off */
function set(row, col, state)
{
	if (state)
		img(row, col).src = "light-box-on.png";
	else
		img(row, col).src = "light-box-off.png";
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
	check();
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

function reset()
{
	for (var row = 1; row <= 5; ++row)
	{
		for (var col = 1; col <= 5; ++col)
		{
			set(row, col, true);
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
