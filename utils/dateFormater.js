export function formatDate(date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // Months are zero-based, so add 1
	const day = date.getDate();

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const formattedDate = `${year}-${month}-${day}`;
	const formattedTime = `${hours}:${minutes}:${seconds}`;

	return `${formattedDate} ${formattedTime}`;
}

export function getTimeDifference(startDate, endDate) {
	let date1;
	if (endDate == null) {
		date1 = new Date();
		date1.setHours(date1.getHours() + 3);
	} else {
		date1 = new Date(endDate);
	}

	const date2 = new Date(startDate);

	// Calculate the difference in milliseconds
	const diffInMs = date1 - date2;

	// Convert the difference to total hours, minutes, and seconds
	const totalHours = Math.floor(diffInMs / (1000 * 60 * 60));
	const totalMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
	const totalSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

	// Format the difference in hh:mm:ss
	const formattedHours = String(totalHours).padStart(2, "0");
	const formattedMinutes = String(totalMinutes).padStart(2, "0");
	const formattedSeconds = String(totalSeconds).padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
