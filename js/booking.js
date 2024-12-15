document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");
    const typeSelect = document.getElementById("type");
    const objectSelect = document.getElementById("object");
    const timeFromSelect = document.getElementById("time-from");
    const timeToSelect = document.getElementById("time-to");
    const bookingFormContainer = document.getElementById("booking-form-container");
    
    window.onbeforeunload = function (evt) {
        var message = "Document 'foo' is not saved. You will lost the changes if you leave the page.";
        if (typeof evt == "undefined") {
            evt = window.event;
        }
        if (evt) {
            evt.returnValue = message;
        }
        return message;
    }
    // Список объектов для каждого типа
    const objects = {
        cottage: ["Домик 1", "Домик 2", "Домик 3", "Домик 4", "Домик 6", "Домик 7"],
        gazebo: ["Беседка 1", "Беседка 2", "Беседка 3", "Беседка 4", "Беседка 5", "Беседка 6", "Беседка 7"],
        tent: ["Шатер"],
        hall: ["Банкетный зал"]
    };

    // Обновление списка объектов
    function updateObjectList(type, selectedObject = null) {
        objectSelect.innerHTML = ""; // Очистка списка объектов
        objects[type].forEach((item) => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            if (item === selectedObject) {
                option.selected = true; // Устанавливаем выбранный объект
            }
            objectSelect.appendChild(option);
        });
    }

    // Обработка клика по кнопке "Забронировать"
    document.querySelectorAll(".btn-book").forEach((button) => {
        button.addEventListener("click", () => {
            const bookingType = button.getAttribute("data-type");
            const bookingObject = button.getAttribute("data-object");

            // Устанавливаем значения в форму
            typeSelect.value = bookingType;
            updateObjectList(bookingType, bookingObject);

            // Прокручиваем страницу к форме бронирования
            bookingFormContainer.scrollIntoView({ behavior: "smooth" });
        });
    });

    function populateTimeOptions() {
        const startHour = 9; // Начало рабочего времени
        const endHour = 23; // Конец рабочего времени

        for (let hour = startHour; hour <= endHour; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            const optionFrom = document.createElement("option");
            const optionTo = document.createElement("option");

            optionFrom.value = time;
            optionFrom.textContent = time;
            timeFromSelect.appendChild(optionFrom);

            optionTo.value = time;
            optionTo.textContent = time;
            timeToSelect.appendChild(optionTo);
        }
    }

    // Обновление времени "до" при изменении "от"
    timeFromSelect.addEventListener("change", () => {
        const selectedTimeFrom = timeFromSelect.value;
        const selectedHour = parseInt(selectedTimeFrom.split(":")[0], 10);

        // Очищаем список "до"
        timeToSelect.innerHTML = "";

        for (let hour = selectedHour + 1; hour <= 23; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            const optionTo = document.createElement("option");
            optionTo.value = time;
            optionTo.textContent = time;
            timeToSelect.appendChild(optionTo);
        }
    });

    // Инициализация времени
    populateTimeOptions();
    
    // При изменении типа обновляем список объектов
    typeSelect.addEventListener("change", () => {
        const selectedType = typeSelect.value;
        updateObjectList(selectedType);
    });

    // Установка значений по умолчанию при загрузке страницы
    updateObjectList("cottage");
    
    // Обновление списка объектов при смене типа
    typeSelect.addEventListener("change", () => {
        const selectedType = typeSelect.value;
        updateObjectList(selectedType);
    });

    // Обработка отправки формы
    const form = document.getElementById("booking-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const bookingData = Object.fromEntries(formData.entries());
        console.log("Данные бронирования:", bookingData);
        showNotification("Бронирование успешно отправлено!");
    });

    // Функция показа уведомления
    function showNotification(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.style.display = "block"
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000); // Уведомление исчезает через 3 секунды
    }
});