// --- Бронирование ---
document.querySelectorAll(".btn-book")?.forEach(button => {
    button.addEventListener("click", event => {
        const type = button.dataset.type;
        const object = button.dataset.object;
        const price = button.dataset.price;
        const maxPeople = button.dataset.maxPeople;

        // Устанавливаем данные в форму бронирования
        document.getElementById("type").value = type;
        document.getElementById("object").innerHTML = `<option value="${object}">${object}</option>`;
        document.getElementById("people").setAttribute("max", maxPeople);

        // Сохраняем цену для дальнейшего использования
        const priceDisplay = document.getElementById("price-display");
        priceDisplay.textContent = `Цена: ${price} руб.`;
        document.getElementById("booking-form").dataset.price = price;
    });
});
document.getElementById("booking-form")?.addEventListener("submit", (event) => {
    event.preventDefault(); // Предотвращаем отправку формы

    const booking = {
        type: document.getElementById("type").value,
        object: document.getElementById("object").value,
        date: document.getElementById("date").value,
        timeFrom: document.getElementById("time-from").value,
        timeTo: document.getElementById("time-to").value,
        people: document.getElementById("people").value,
        price: document.getElementById("booking-form").dataset.price,
    };

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
});

// Проверка на регистрацию пользователя
document.getElementById("submit-button")?.addEventListener("click", (event) => {
    const currentUser = localStorage.getItem("user");
    console.log(currentUser);
    if (!currentUser) {
        // Если пользователя нет, выводим сообщение и перенаправляем
        alert("Пожалуйста, войдите в аккаунт, чтобы продолжить бронирование.");
        window.location.href = "profile.html"; // Перенаправление на страницу входа
    }
});
// --- Личный кабинет ---
// // Обновление списка бронирований
// function updateBookings() {
//     const bookingsList = document.getElementById("bookings-list");
//     bookingsList.innerHTML = ""; // Очищаем старый список

//     const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

//     if (bookings.length === 0) {
//         bookingsList.innerHTML = "<li>У вас пока нет бронирований.</li>";
//     } else {
//         bookings.forEach((booking, index) => {
//             const listItem = document.createElement("li");
//             listItem.textContent = `${booking.type} - ${booking.object}, ${booking.date} (с ${booking.timeFrom} до ${booking.timeTo}), Людей: ${booking.people}`;

//             const deleteBtn = document.createElement("button");
//             deleteBtn.textContent = "Отменить";
//             deleteBtn.classList.add("btn", "btn-delete");
//             deleteBtn.addEventListener("click", () => deleteBooking(index));

//             listItem.appendChild(deleteBtn);
//             bookingsList.appendChild(listItem);
//         });
//     }
// }

// // Функция удаления бронирования
// function deleteBooking(index) {
//     const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
//     bookings.splice(index, 1); // Удаляем по индексу
//     localStorage.setItem("bookings", JSON.stringify(bookings)); // Сохраняем изменения
//     updateBookings(); // Обновляем список на странице
// }

// // Обновление при загрузке
// document.addEventListener("DOMContentLoaded", () => {
//     if (document.getElementById("bookings-list")) {
//         updateBookings();
//     }
// });