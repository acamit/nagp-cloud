(
    function getUsers(){
        var $ = jQuery;
        jQuery.get('users', function(data){
            $.each(JSON.parse(data), function(index, value){
                var cardTemplate = `<div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${value.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${value.age}</h6>
                    <p class="card-text">${value.email}</p>
                </div>
            </div>`
                $("#userlist").append(cardTemplate);
            })
            
        })
    }
)();