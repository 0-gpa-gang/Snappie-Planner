
class Day
{
	constructor()
	{
		this.day;
		this.date;
		this.month;
	}
}

class Calendar
{
	constructor()
	{
		this.year = 2000;
		this.first_day = 6; // range from 1 -- 7.
		this.leapyear = 0; // range from 0 -- 3, 0 being a leap year
		this.date_container = [];
	}

	increment_year_pointer(incrementer)
	{
		this.year += incrementer;
		this.first_day += incrementer;
		var offset1 = -1;
		if (incrementer < 0)
		{
			offset1 = 0;
		}
		let leapcounter = divide_with_remainder(incrementer+offset1, 4);
		this.first_day += leapcounter[0];

		var offset2 = 1;
		if (incrementer < 0)
		{
			offset2 = 0
		}

		this.leapyear += leapcounter[1]+offset2;



		var first_day_handler = divide_with_remainder(this.first_day, 7); 
		if (this.leapyear < 0)
		{
			this.leapyear = 4 + this.leapyear;
		} else if (this.leapyear > 3)
		{	
			this.leapyear = 0 + this.leapyear - 4;
		}
		if (this.first_day > 7)
		{
			this.first_day = first_day_handler[1] + 1;
		} else if (this.first_day < 1)
		{
			
			this.first_day = 7 + first_day_handler[1];
		}

	}
	
	seek_current_year()
	{
			
	}

}



function main()
{
	let cal = new Calendar();
	cal.increment_year_pointer(-47);
	console.log(cal.year, cal.first_day, cal.leapyear);

}
main();
