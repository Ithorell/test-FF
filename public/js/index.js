$(".search").click(function (event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches("button")) {
        var userInput = $(this).children("input").val();
        console.log(userInput);
        location.replace(`/search/${userInput}`);    
    }
});


$("#register-form").click(event => location.replace("/register"));

$("#login-form").click(event => location.replace("/profile"));

$(".post").click(event => location.replace("/post"));

$(".logout").click(async event => {
    const response = await fetch('/api/users', {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        location.replace('/');
    } else {
        alert('Failed to log out.');
    }
});