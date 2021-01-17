
class Event
{
	constructor()
	{
		this.subject;
		this.start_time;
		this.end_time;
		this.duration;
		this.description;
		this.loc;
		this.priority;
		this.deadline;

		this.importance;
	}
}




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
		this.months = [31, 28, 31, 30, 31, 30, 30, 31, 30, 31, 30, 31];
		this.date_container = [];
		
		this.leap_years = [];
		for (let i = -80; i < 80; i++)
		{
			this.leap_years.push(2000 + i*4)
		}


		let date = new Date();
		this.current_year = date.getFullYear()

		this.seek_current_year();
	}

	//Increments the number of years specified by the incrementer parameter.
	//Automatically handles leap years
	increment_year_pointer(incrementer)
	{		

		//Handling positive and negative incrementation
		var count_leap = 0;
		if (incrementer > 0)
		{
			for (var i = 0; i < this.leap_years.length; i+=1)
			{
				if (this.leap_years[i] >= this.year && 
					this.leap_years[i] < this.year + incrementer)
				{
					count_leap += 1;
				}	
			}
		} else
		{
  			for (var i = 0; i < this.leap_years.length; i+= 1)
			{
				if (this.leap_years[i] < this.year 
					&& this.leap_years[i] >= this.year + incrementer) 	
				{
					count_leap -= 1;
				}
			}
		}

		this.first_day += incrementer + count_leap;

		// day wrapping
		if (this.first_day > 7)
		{
			this.first_day = divide_with_remainder(this.first_day, 7)[1];
		} else if (this.first_day < 1)
		{
			this.first_day = 7 + divide_with_remainder(this.first_day, 7)[1];
		}
		this.year += incrementer;
			
			
	}
	// Moves calendar to the current year
	seek_current_year()
	{
		var diff = this.current_year - this.year;
		this.increment_year_pointer(diff);
	}
	// Fills calendar with day objects.
	populate()
	{
		let day_accumulator = 0;
		for (let i = 0; i < this.months.length; i+=1)
		{
			
			for (let j = 0; j < this.months[i]; j+=1)
			{
				// set day of the week
				let date_obj = new Day();
				date_obj.day = divide_with_remainder(this.first_day + 
						day_accumulator - 1, 7)[1]+1;
				day_accumulator += 1;
				
				//set day of the month
				date_obj.date = j + 1;
				date_obj.month = i + 1;
				this.date_container.push(date_obj);
				console.log(date_obj.day, date_obj.date, date_obj.month)

			}
			if (i == 1 && this.leap_years.includes(this.year))
			{
				console.log("INSERT LEAP YEAR")
				var leap_day_obj = new Day();
				leap_day_obj.day = divide_with_remainder(this.first_day + 
						day_accumulator-1, 7)[1] + 1;
				day_accumulator += 1;
				leap_day_obj.date = 29;
				leap_day_obj.month = 2;
				this.date_container.push(leap_day_obj);
				console.log(leap_day_obj.day, leap_day_obj.date, leap_day_obj.month)
			}
		}
	}

	get_month(month)
	{
		let month_arr = [];
		for (let i = 0; i < this.date_container.length; i+=1)
		{
			if (this.date_container[i].month == month)
			{
				month_arr.push(this.date_container[i]);
			}
		}

		let first_day_of_month = month_arr[0].day;
		
		//fills front of the array with spacers
		var spacer = new Day();
		spacer.day = null;
		spacer.date = null;
		spacer.month = month;
		for (let i = 0; i < first_day_of_month%7; i++)
		{
			month_arr.unshift(spacer);
		}
		while (month_arr.length%7 != 0)
		{
			month_arr.push(spacer);
		}
		
		let rows = month_arr.length/7;
		let cols = 7
		let month_mat = reshape(month_arr, rows, cols);
		return month_mat;

	}
	
	get_week(month, week)
	{
		let month = this.get_month(month);
		try
		{
			let week = month[week]
			return week;
		}
		catch
		{
			return month[week-1];	
		}
	}

	sort_event_by_importance(arr)
	{       
        	var low = 0;
        	var high = arr.length - 1;
        	this.partition(arr, low, high);
	}
	// Used in tandem with sort_event_by_importance
	partition(arr, low, high)
	{
        	if (low < high)
        	{
                	var j = low;
                	for (var i = low; i < high; i++)
                	{
                        	if (arr[i].importance < arr[high].importance)
                        	{
                                	var temp = arr[j];
                                	arr[j] = arr[i];
                                	arr[i] = temp;
                                	j += 1;
                        	}
                	}
                	temp = arr[j];
                	arr[j] = arr[high];
                	arr[high] = temp;

               	 	this.partition(arr, low, j-1);
                	this.partition(arr, j+1, high);

        	}
	}


}



function main()
{
	let cal = new Calendar();
	//cal.increment_year_pointer(1);
	console.log(cal.year, cal.first_day);
	cal.populate();
	cal.get_month(6);
}
main();
