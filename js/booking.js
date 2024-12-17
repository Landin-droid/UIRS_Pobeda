document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");
    const typeSelect = document.getElementById("type");
    const objectSelect = document.getElementById("object");
    const timeFromSelect = document.getElementById("time-from");
    const timeToSelect = document.getElementById("time-to");
    const bookingFormContainer = document.getElementById("booking-form");
    
    // window.onbeforeunload = function (evt) {
    //     var message = "Document 'foo' is not saved. You will lost the changes if you leave the page.";
    //     if (typeof evt == "undefined") {
    //         evt = window.event;
    //     }
    //     if (evt) {
    //         evt.returnValue = message;
    //     }
    //     return message;
    // }
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

            const type = button.dataset.type;
            const object = button.dataset.object;
            const price = button.dataset.price;

            // Устанавливаем данные в форму бронирования
            document.getElementById("type").value = type;
            document.getElementById("object").innerHTML = `<option value="${object}">${object}</option>`;

            // Сохраняем цену для дальнейшего использования
            document.getElementById("booking-form").dataset.price = price;

            // Устанавливаем значения в форму
            typeSelect.value = bookingType;
            updateObjectList(bookingType, bookingObject);

            // Прокручиваем страницу к форме бронирования
            bookingFormContainer.scrollIntoView({ behavior: "smooth" });
        });
    });

    const populateTimeSelect = (select, defaultTime = null) => {
        for (let hour = 9; hour <= 23; hour++) {
            const option = document.createElement("option");
            option.value = `${hour}:00`;
            option.textContent = `${hour}:00`;
            if (defaultTime === `${hour}:00`) {
                option.selected = true; // Устанавливаем значение по умолчанию
            }
            select.appendChild(option);
        }
    };

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
    // Установка времени и даты
    document.getElementById("type").dispatchEvent(new Event("change"));
        populateTimeSelect(document.getElementById("time-from"), "09:00");
        populateTimeSelect(document.getElementById("time-to"), "10:00");
    
        const dateInput = document.getElementById("date");
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0]; // Формат YYYY-MM-DD
        dateInput.setAttribute("min", formattedDate);
    
        // Дополнительно: установить дату по умолчанию на текущую
        dateInput.value = formattedDate;

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
        showNotification("Бронирование успешно оформлено!");
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

// document.getElementById("type").addEventListener("change", (event) => {
//     const selectedType = event.target.value;
//     const objectSelect = document.getElementById("object");

//     // Очищаем текущий список объектов
//     objectSelect.innerHTML = "";

//     // Списки объектов по типам
//     const options = {
//         cottage: ["Домик 1", "Домик 2", "Домик 3", "Домик 4", "Домик 6", "Домик 7"],
//         gazebo: ["Беседка 1", "Беседка 2", "Беседка 3", "Беседка 4", "Беседка 5", "Беседка 6", "Беседка 7"],
//         tent: ["Шатер"],
//         hall: ["Банкетный зал"],
//     };

//     // Заполняем список объектами выбранного типа
//     options[selectedType].forEach((item) => {
//         const option = document.createElement("option");
//         option.value = item;
//         option.textContent = item;
//         objectSelect.appendChild(option);
//     });
// });

// // Инициализация объектов при загрузке страницы
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("type").dispatchEvent(new Event("change"));
// });


const prices = {
    "Домик 1": 3500,
    "Домик 2": 3500,
    "Домик 3": 4500,
    "Домик 4": 5000,
    "Домик 6": 2500,
    "Домик 7": 2500,
    "Беседка 1": 2000,
    "Беседка 2": 1500,
    "Беседка 3": 1500,
    "Беседка 4": 1000,
    "Беседка 5": 1000,
    "Беседка 6": 1500,
    "Беседка 7": 2000,
    "Шатер": 20000,
    "Банкетный зал": 6500,
};

// Объекты для каждого типа
const objects = {
    cottage: ["Домик 1", "Домик 2", "Домик 3", "Домик 4", "Домик 5", "Домик 6", "Домик 7"],
    gazebo: ["Беседка 1", "Беседка 2", "Беседка 3", "Беседка 4", "Беседка 5", "Беседка 6", "Беседка 7"],
    tent: ["Шатер"],
    hall: ["Банкетный зал"],
};

// Элементы
const typeSelect = document.getElementById("type");
const objectSelect = document.getElementById("object");
const priceDisplay = document.getElementById("price-display");

// Функция для обновления списка объектов
function updateObjectOptions(type) {
    // Очистка текущих опций
    objectSelect.innerHTML = "";

    // Добавление новых опций
    objects[type].forEach(objectName => {
        const option = new Option(objectName, objectName);
        objectSelect.add(option);
    });

    // Установить первый объект и обновить цену
    objectSelect.value = objects[type][0];
    updatePrice(objectSelect.value);
}

// Функция для обновления цены
function updatePrice(selectedObject) {
    const price = prices[selectedObject] || 0;
    priceDisplay.textContent = `Цена: ${price} руб.`;
    document.getElementById("booking-form").dataset.price = price;
}

// Обработчик изменения типа
typeSelect.addEventListener("change", event => {
    const selectedType = event.target.value;
    updateObjectOptions(selectedType);
});

// Обработчик изменения объекта
objectSelect.addEventListener("change", event => {
    updatePrice(event.target.value);
});

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const initialType = typeSelect.value;
    updateObjectOptions(initialType);
});

// document.getElementById("booking-form").addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Получаем данные из формы
//     const type = document.getElementById("type").value;
//     const object = document.getElementById("object").value;
//     const date = document.getElementById("date").value;
//     const timeFrom = document.getElementById("time-from").value;
//     const timeTo = document.getElementById("time-to").value;
//     const people = document.getElementById("people").value;
//     const price = document.getElementById("booking-form").dataset.price;

//     // Создаём новое бронирование
//     const newBooking = {
//         type,
//         object,
//         date,
//         timeFrom,
//         timeTo,
//         people,
//         price,
//         status: "Не оплачено"
//     };

//     // Добавляем бронирование в localStorage
//     const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
//     bookings.push(newBooking);
//     localStorage.setItem("bookings", JSON.stringify(bookings));
// });