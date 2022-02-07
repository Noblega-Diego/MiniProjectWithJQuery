
$(document).ready(function(){
    const getCart = (user)=>{
        return `
        <div  class="cartflat">
            <div class="left"><div class="circle" style="background-color: #${Math.floor(Math.random()*16777215).toString(16)};">
                <p>${user.name.charAt(0).toUpperCase()}</p>
            </div></div>
            <div class="right">
                <p class="name">${user.name} ${user.lastname}</p>
                <p class="item">Email: <span class="value">${user.email}</span></p>
            </div>
        </div>`;
    }

    var settings = {
        url: "/api/users",
        method: "GET"
      };
    
    isSend = true;
    $.ajax(settings).done(function (response) {
        let users = JSON.parse(response);
        users.forEach(user => {
            $('#listusers').append(getCart(user));
        });
    });
})