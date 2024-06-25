<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstName = $_POST['fname'];
    $lastName = $_POST['lname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $topic = $_POST['topic'];
    $text = $_POST['text'];
    // $msg = $_POST['comment'];

    if (
        $firstName != "" &&
        $lastName != "" &&
        $email != "" &&
        $phone != "" &&
        $topic != "" &&
        $text != ""
        // $msg != ""
    ) {
        $subject = "Сообщение от $firstName $lastName";

        $message = "";
        $message .= "Имя: $firstName\n";
        $message .= "Фамилия: $lastName\n";
        $message .= "Почта: $email\n";
        $message .= "Телефон: $phone\n";
        $message .= "Тема: $topic\n";
        $message .= "Текст: $text\n";
        // $message .= "Сообщение: $msg";

        $to = "example@example.com";
        // $to = "dom-prestarelykh09@mail.ru";
        $headers = "From: $firstName $lastName";

        if (mail($to, $subject, $message, $headers)) {
            header("Location: /index.html");
        } else {
            echo "При отправке сообщения произошла ошибка.";
        }
    } else {
        echo 'false';
    }
}
