document.addEventListener("DOMContentLoaded", () => {
    const typeSelect = document.getElementById("type");
    const objectSelect = document.getElementById("object");

    const objects = {
        cottage: ["Домик 1", "Домик 2", "Домик 3", "Домик 4", "Домик 5", "Домик 6", "Домик 7"],
        gazebo: ["Беседка 1", "Беседка 2", "Беседка 3", "Беседка 4", "Беседка 5", "Беседка 6", "Беседка 7"],
        tent: ["Шатер"],
        hall: ["Банкетный зал"]
    };

    // Функция для обновления объектов в списке
    function updateObjectList(type) {
        objectSelect.innerHTML = ""; // Очистка списка
        objects[type].forEach((item, index) => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            if (index === 0) {
                option.selected = true; // Установить первый объект как выбранный
            }
            objectSelect.appendChild(option);
        });
    }

    // Установить значения по умолчанию при загрузке страницы
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