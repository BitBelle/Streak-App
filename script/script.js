document.addEventListener('DOMContentLoaded', function () {
    const habitList = document.getElementById('old-habits-list');
    const habitInput = document.getElementById('habit-text');
    const dateInput = document.getElementById('date');
    const addBtn = document.getElementById('addBtn');
    const delBtn = document.getElementById('delBtn');
    const editBtn = document.getElementById('editBtn');
    const daysCountElement = document.getElementById('days-count');

    // Load habits from local storage
    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    // Render-updating habits
    function renderHabits() {
        habitList.innerHTML = '';
        habits.forEach((habit, index) => {
            const li = document.createElement('li');
            li.textContent = `${habit.name} - ${habit.date}`;
            li.setAttribute('data-index', index);
            habitList.appendChild(li);
        });

        // Updating habit status
        updateHabitStats();
    }

    renderHabits(); //calling my func 

    // Function to update habit status...no of days since he stopped..
    function updateHabitStats() {
        if (habits.length > 0) {
            const lastHabitDate = new Date(habits[habits.length - 1].date);
            const today = new Date();
            const timeDiff = Math.abs(today.getTime() - lastHabitDate.getTime());
            const daysDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
            daysCountElement.textContent = daysDifference;
        } else {
            daysCountElement.textContent = '0';
        }
    }

    // Add habit
    addBtn.addEventListener('click', function () {
        const habitName = habitInput.value.trim();
        const habitDate = dateInput.value;
        if (habitName !== '' && habitDate !== '') {
            habits.push({ name: habitName, date: habitDate });
            localStorage.setItem('habits', JSON.stringify(habits));
            renderHabits();
            habitInput.value = '';
            dateInput.value = '';
        }
    });

    // Delete habit
    delBtn.addEventListener('click', function () {
        const selectedIndex = habitList.querySelector('li.selected');
        if (selectedIndex) {
            const index = selectedIndex.getAttribute('data-index');
            habits.splice(index, 1);
            localStorage.setItem('habits', JSON.stringify(habits));
            renderHabits();
        }
    });

    // Edit habit
    editBtn.addEventListener('click', function () {
        const selectedIndex = habitList.querySelector('li.selected');
        const newIndex = habitInput.value.trim();
        const newDate = dateInput.value;
        if (selectedIndex && newIndex !== '' && newDate !== '') {
            const index = selectedIndex.getAttribute('data-index');
            habits[index] = { name: newIndex, date: newDate };
            localStorage.setItem('habits', JSON.stringify(habits));
            renderHabits();
            habitInput.value = '';
            dateInput.value = '';
        }
    });

    // Select habit
    habitList.addEventListener('click', function (event) {
        const selected = habitList.querySelector('.selected');
        if (selected) {
            selected.classList.remove('selected');
        }
        const li = event.target.closest('li');
        if (li) {
            li.classList.add('selected');
            habitInput.value = habits[li.getAttribute('data-index')].name;
            dateInput.value = habits[li.getAttribute('data-index')].date;
        }
    });
});
