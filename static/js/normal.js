function handleError(error) {
    if (error.response) {
        if (error.response.status >= 500) {
            UIkit.notification("Internal Server Error", {status: 'warning'})
        } else {
            var messages = []

            for (var message in error.response.data.messages) {
                message = error.response.data.messages[message]
                messages.push(message.message)
            }

            UIkit.notification(messages.join('<br />'), {status: 'danger'})
        }
    }
}

function login() {
    NProgress.start()
    document.getElementById("loginButton").setAttribute("disabled", true)
    axios.post('/auth/login', data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        })
        .then(function(data) {
            NProgress.done()
            document.getElementById("loginButton").removeAttribute("disabled")
            UIkit.notification("Login success! Redirecting")
            setTimeout(function() {
                window.location.href = "/"
            }, 1000)
        })
        .catch(function(error) {
            NProgress.done()
            handleError(error)
            document.getElementById("loginButton").removeAttribute("disabled")
        })
}

function register() {
    NProgress.start()
    document.getElementById("registerButton").setAttribute("disabled", true)

    axios.post('/auth/register', data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value
        })
        .then(function(data) {
            NProgress.done()
            document.getElementById("registerButton").removeAttribute("disabled")
            UIkit.notification("Register success! Redirecting")
            setTimeout(function() {
                window.location.href = "/auth/login"
            }, 1000)
        })
        .catch(function(error) {
            NProgress.done()
            handleError(error)
            document.getElementById("registerButton").removeAttribute("disabled")
        })
}
