function notification_success(msg) {
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#4fbe87",
    }).showToast();
}

function notification_error(msg) {
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#d21f1f",
      }).showToast();
}