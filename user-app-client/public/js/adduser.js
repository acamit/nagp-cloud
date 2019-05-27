(
    function () {
        function addUser() {
            var data = {
                name: $("#userName").val(),
                age: $("#userAge").val(),
                email: $("#userEmail").val()
            }
            $.post('/users', data)
                .done(function (data) {
                    console.log(data)
                });
        }
        $("#submitButton").click(addUser);
    }
)();