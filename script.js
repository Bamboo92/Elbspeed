const form = document.querySelector( 'form' );
const fullName = document.getElementById("name");
const senderEmail = document.getElementById("email");
const subject = document.getElementById("betreff");
const message = document.getElementById("nachricht");
const car = document.getElementById("car");
const street = document.getElementById("street");
const birthdate = document.getElementById("birthdate");
const birthplace = document.getElementById("birthplace");
const tel = document.getElementById("tel");
const startdate = document.getElementById("abholdatum");
const finishdate = document.getElementById("abgabedatum");
const newsletterSubscriber = document.getElementById("newsletter-input");

// Funktion zum Einfügen von Zeilenumbrüchen
function formatMessage(msg) {
    const words = msg.split(' ');
    let formattedMessage = '';
    for (let i = 0; i < words.length; i++) {
        if (i > 0 && i % 10 === 0) formattedMessage += '<br>'; // Fügt nach jedem 10. Wort einen Zeilenumbruch ein
        formattedMessage += words[i] + ' ';
    }
    return formattedMessage.trim();
}

// Funktion zur Erstellung der Nachricht
function rentMessageBody(name, email, message, car, street, birthdate, birthplace, tel, startdate, finishdate) {
    const introduction = `<b>Diese Nachricht wurde auf der Buchungs Seite geschrieben:</b><br><br>`;
    return introduction + `Name: ${name}<br>Adresse: ${street}<br>Geburtsdatum: ${birthdate} Geburtsort: ${birthplace}<br>Email: ${email} Tel.: ${tel}<br>Abholdatum: ${startdate} Abgabedatum: ${finishdate}<br>Auto: <b>${car}</b><br><br>Nachricht:<br>${formatMessage(message)}`;
}

// Funktion zur Erstellung der Nachricht
function contactMessageBody(name, email, message) {
    const introduction = `<b>Diese Nachricht wurde auf der Contact Us Seite geschrieben:</b><br><br>`;
    return introduction + `Name: ${name}<br>Email: ${email}<br><br>Nachricht:<br>${formatMessage(message)}`;
}

function newsletterMessageBody(email) {
    const introduction = `<b>Neuer Abonent</b><br><br>`;
    return introduction + `Ein Kunde hat den Newsletter aboniert.<br>Email: ${email}`;
}

function sendMail(subject, bodyMessage) {
    Email.send({
        SecureToken: "59c9b20c-ba01-4039-a5af-56612d9c4c28",
        To : 'info@elb-speed.de',
        From : "info@elb-speed.de",
        Subject : subject,
        Body : bodyMessage,
        /*Attachments : [
            {
                name : "elbspeed_logo.png",
                path : "https://imgur.com/a/DifEYBP"
            }
        ]*/
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Buchung abgeschlossen!",
                    text: "Eine Bestätung erhalten sie nach prüfung der Daten",
                    icon: "success",
                    confirmButtonColor: "#E63D3D",
                    background: "#FDF3F3",
                    color: "#726666",
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Etwas ist schief gelaufen!",
                    footer: '<a href="kontakt.html">Kontaktieren mit uns aufnehmen?</a>',
                    confirmButtonColor: "#E63D3D",
                    background: "#FDF3F3",
                    color: "#726666",
                });
            }
        }
    );
}

function addNewsletterSubscriber(bodyMessage) {
    Email.send({
        SecureToken: "59c9b20c-ba01-4039-a5af-56612d9c4c28",
        To : 'info@elb-speed.de',
        From : "info@elb-speed.de",
        Subject : "Newsletter Abonent",
        Body : bodyMessage,
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Buchung abgeschlossen!",
                    text: "Eine Bestätung erhalten sie nach prüfung der Daten",
                    icon: "success",
                    confirmButtonColor: "#E63D3D",
                    background: "#FDF3F3",
                    color: "#726666",
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Etwas ist schief gelaufen!",
                    footer: '<a href="kontakt.html">Kontaktieren mit uns aufnehmen?</a>',
                    confirmButtonColor: "#E63D3D",
                    background: "#FDF3F3",
                    color: "#726666",
                });
            }
        }
    );
}

// Fügt Event Listener zu jedem Formular auf der Seite hinzu
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Verhindert das normale Einreichen des Formulars

        if (form.id === "contact-form") {
            // Kontaktformular Logik
            const messageBody = contactMessageBody(fullName.value, senderEmail.value, message.value);
            sendMail(subject.value, messageBody);
        } else if (form.id === "rent-form") {
            // Buchungsformular Logik
            const messageBody = rentMessageBody(fullName.value, senderEmail.value, message.value, car.value, street.value, birthdate.value, birthplace.value, tel.value, startdate.value, finishdate.value);
            sendMail(`Buchung`, messageBody);
        } else if (form.id === "newsletter-form") {
            // Newsletter-Formular Logik
            // Hier annehmen, dass `newsletterSubscriber.value` existiert und korrekt ist
            const messageBody = newsletterMessageBody(newsletterSubscriber.value);
            addNewsletterSubscriber(messageBody);
        }
    });
});

// Warten bis das Dokument vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    const inventory = document.getElementById('inventory'); // Das Element mit der ID 'inventory'
    inventory.addEventListener('wheel', function(e) {
      // Verhindert das normale Scroll-Verhalten (vertikal)
    e.preventDefault();
      // Scrollt horizontal basierend auf der vertikalen Scroll-Richtung der Maus
      inventory.scrollLeft += e.deltaY * 2; // Die 2 ist ein Faktor für die Scroll-Geschwindigkeit, anpassbar
    }, {passive: false}); // 'passive: false' verhindert, dass die Seite scrollt, während wir unser eigenes Scroll-Verhalten definieren
});

function handleResize() {
    const noBrElements = document.querySelectorAll('br.no-br');
    if (window.innerWidth <= 899) {
        noBrElements.forEach(br => br.classList.add('hidden'));
    } else {
        noBrElements.forEach(br => br.classList.remove('hidden'));
    }
}

// Initial check
handleResize();

// Add event listener for window resize
window.addEventListener('resize', handleResize);