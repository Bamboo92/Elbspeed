<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $tel = trim($_POST["tel"]);
    $street = trim($_POST["street"]);
    $car = trim($_POST["car"]);
    $plan = trim($_POST["plan"]);
    $birthdate = trim($_POST["birthdate"]);
    $abholdatum = trim($_POST["abholdatum"]);
    $abgabedatum = trim($_POST["abgabedatum"]);
    $nachricht = trim($_POST["nachricht"]);

    if (empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($birthdate) OR empty($tel)) {
        echo "Bitte füllen Sie alle erforderlichen Felder aus.";
        exit;
    }

    // Empfänger E-Mail-Adresse
    $recipient = "info@elb-speed.de";

    // Betreff der E-Mail
    $subject = "Neue Mietanfrage von $name";

    // E-Mail-Inhalt zusammenbauen
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Telefon: $tel\n";
    $email_content .= "Straße: $street\n";
    $email_content .= "Geburtsdatum: $birthdate\n";
    $email_content .= "Auto: $car\n";
    $email_content .= "Plan: $plan\n";
    $email_content .= "Abholdatum: $abholdatum\n";
    $email_content .= "Abgabedatum: $abgabedatum\n";
    $email_content .= "Nachricht:\n$nachricht\n";

    // Sicherstellen, dass die From-Adresse eine gültige Domain-Mail ist
    $headers = "From: info@elb-speed.de";  // Hier deine Strato-Email verwenden

    // Versende die E-Mail
    if (mail($recipient, $subject, $email_content, $headers)) {
        echo "<script>alert('Vielen Dank für Ihre Anfrage, wir werden uns bald bei Ihnen melden.'); window.location.href='/danke.html';</script>";
    } else {
        echo "Leider gab es ein Problem mit Ihrer Anfrage.";
    }
} else {
    echo "Etwas ist schief gelaufen; bitte versuchen Sie es erneut.";
}