document.addEventListener('DOMContentLoaded', function() {
    // Current date for calendar
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    const today = new Date(); // Keep reference to today for highlighting

    // DOM elements
    const calendarBody = document.getElementById('calendarBody');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const printBtn = document.getElementById('printBtn');

    // Day names for header
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

    // Event listeners for buttons
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    printBtn.addEventListener('click', () => {
        window.print();
    });

    // Function to render the calendar
    function renderCalendar() {
        // Update the month/year display
        currentMonthYear.textContent = `${currentYear}年 ${currentMonth + 1}月`;

        // Clear the calendar body
        calendarBody.innerHTML = '';

        // Get the first day of the month and the number of days in the month
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

        // Get the last day of the previous month for filling in previous month's days
        const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();

        // Create calendar rows
        let date = 1;
        for (let week = 0; week < 6; week++) { // 6 weeks max
            const row = document.createElement('tr');

            for (let day = 0; day < 7; day++) {
                const cell = document.createElement('td');

                // Fill in previous month's days at the beginning
                if (week === 0 && day < startDayOfWeek) {
                    const prevDate = prevLastDay - startDayOfWeek + day + 1;
                    cell.textContent = prevDate;
                    cell.classList.add('other-month');
                } 
                // Fill in days of current month
                else if (date <= daysInMonth) {
                    cell.textContent = date;

                    // Check if this date is today
                    if (date === today.getDate() && 
                        currentMonth === today.getMonth() && 
                        currentYear === today.getFullYear()) {
                        cell.classList.add('today');
                    }

                    date++;
                }
                // Fill in next month's days at the end
                else {
                    const nextDate = date - daysInMonth;
                    cell.textContent = nextDate;
                    cell.classList.add('other-month');
                    date++;
                }

                // Add day-specific classes
                if (day === 0) {
                    cell.classList.add('sunday');
                } else if (day === 6) {
                    cell.classList.add('saturday');
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);

            // Stop if we've reached the end of the month and all days are filled
            if (date > daysInMonth) {
                break;
            }
        }
    }

    // Initial render
    renderCalendar();
});