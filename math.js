
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
