
class Day
{
	constructor()
	{
		this.day;
		this.date;
		this.month;

		this.event_container = [];
	}
}

class Calendar
{
	constructor()
	{
		this.year = 2000;
		this.first_day = 6; // range from 1 -- 7.
		this.leapyear = 0; // range from 0 -- 3, 0 being a leap year
		this.months = [31, 28, 31, 30, 31, 30, 30, 31, 30, 31, 30, 31];
		this.date_container = [];

		let date = new Date();
		this.current_year = date.getFullYear()

		// this.seek_current_year();
	}

	//Increments the number of years specified by the incrementer parameter.
	//Automatically handles leap years
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
		var diff = this.current_year - this.year;
		this.increment_year_pointer(diff);
	}
	populate()
	{
		let day_accumulator = 0;
		for (let i = 0; i < this.months.length; i+=1)
		{
			
			for (let j = 0; j < this.months[i]; j+=1)
			{
				// set day of the week
				let date_obj = new Day();
				date_obj.day = divide_with_remainder(this.first_day + day_accumulator - 1, 7)[1]+1;					
				day_accumulator += 1;
				
				//set day of the month
				date_obj.date = j + 1;
				date_obj.month = i + 1;
				this.date_container.push(date_obj);
				console.log(date_obj.day, date_obj.date, date_obj.month)

			}
			if (i == 1)
			{
				var leap_day_obj = new Day();
				leap_day_obj.day = divide_with_remainder(this.first_day + day_accumulator, 7)[1] + 1;
				day_accumulator += 1;
				leap_day_obj.date = 29;
				leap_day_obj.month = 2;
				this.date_container.push(leap_day_obj);
			}
		}
	}

}



function main()
{
	let cal = new Calendar();
	cal.increment_year_pointer(-1);
	console.log(cal.year, cal.first_day, cal.leapyear);
	cal.populate();
}
main();
