function sleep(milliseconds) {
  	const date = Date.now();
  	let currentDate = null;
  	do {
    		currentDate = Date.now();
  	} while (currentDate - date < milliseconds);
}

// num1/num2 = num3 R remainder
function divide_with_remainder(num1, num2)
{
	quotient = Math.floor(Math.abs(num1)/num2);
	if (num1 < 0)
	{
		quotient = -quotient;
	}

	return [quotient, num1%num2];
}

// reshapes a vector into a matrix;
function reshape(arr, shape1, shape2)
{
	console.log(arr.length, shape1, shape2)
	if (arr.length != shape1 * shape2)
	{
		return NaN;
	}

	var mat = [];
	for (var i = 0; i < shape1; i+=1)
	{	mat.push([]);
		for (var j = 0; j < shape2; j+=1)
		{
			mat[i].push(arr[i*7 + j])
		}
	}

	return mat;
}

