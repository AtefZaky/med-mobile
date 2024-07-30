export const incrementCounter = (counter) => {
	counter.seconds++;
	if (counter.seconds == 60) {
		counter.seconds = 0;
		counter.minutes++;
	}
	if (counter.minutes == 60) {
		counter.minutes = 0;
		counter.hours++;
	}
	return {
		hours: counter.hours,
		minutes: counter.minutes,
		seconds: counter.seconds,
	};
};

export const getCounter = (hour) => {
	const minute = (hour % 1) * 60;
	const second = (minute % 1) * 60;
	const seconds = Math.round(second);
	const minutes = Math.round(minute);
	const hours = Math.floor(hour);
	return { hours: hours, minutes: minutes, seconds: seconds };
};
