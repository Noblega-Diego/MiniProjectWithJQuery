



$(document).ready(function(){

    const controls = {
        name: {in: $('#in_name'), isValid:false},
        lastname: {in: $('#in_lastname'), isValid:false},
        email: {in: $('#in_email'), isValid:false},
        password: {in: $('#in_password'), isValid:false}
    };
    
    let isSend = false;

    function controledIsValid(control, regex, msjErr){
        if(control.in.val().search(regex) === -1){
            control.in.next('span').text(msjErr);
            control.in.addClass('error');
            control.isValid = false;
        } else{
            control.in.next('span').text("");
            control.in.removeClass('error');
            control.isValid = true;
        }
    }

    const regexs = {
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        simpleName: /^[A-Za-z]{1}[a-z]{1,}$/g,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
    };

    const animInputText = {
        labelTraslateUp : function() {
            $(this).prev('.label').animate({'top': '-28px','left':'-4px', 'font-size':'0.8em'}, 100, 'linear');
        },

        labelToNormal : function(){
            if($(this).val() === '')
                $(this).prev('.label').animate({'top': '0px','left':'0px', 'font-size':'1em'}, 100, 'linear');
        },

        inputHoverEffect : function(){
            if($(this).val() === '')
                $(this).prev('.label');
        }
    };

    $('.input')
        .on('focus', animInputText.labelTraslateUp)
        .on('focusout', animInputText.labelToNormal)

    controls.name.in.on('change', function(){
        controledIsValid(controls.name, regexs.simpleName, 'name is invalid');
    });

    controls.lastname.in.on('change', function(){
        controledIsValid(controls.lastname, regexs.simpleName, 'lastname is invalid');
    });

    controls.email.in.on('change', function(){
        controledIsValid(controls.email, regexs.email, 'email is invalid');
    });
    
    controls.password.in.on('change', function(){
        controledIsValid(controls.password, regexs.password, 'password is insegured');
    });

    $('form').on('submit', function(e){
        e.preventDefault();
        if(isSend)
            return;

        let isValidForm = true;
        if(controls.name.in.val() === '' || !controls.name.isValid)
            isValidForm = false;

        if(controls.lastname.in.val() === '' || !controls.lastname.isValid)
            isValidForm = false;

        if(controls.email.in.val() === '' || !controls.email.isValid)
            isValidForm = false;

        if(controls.password.in.val() === '' || !controls.password.isValid)
            isValidForm = false;
        

        if(!isValidForm){
            $('#formMessaje').text('reviced form');
            return;
        }

        let newUser = {
            name: controls.name.in.val(),
            lastname: controls.lastname.in.val(),
            email: controls.email.in.val(),
            password: controls.password.in.val()
        };

        var settings = {
            url: "/api/register",
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            data: JSON.stringify(newUser)
        };
        
        isSend = true;
        $.ajax(settings).done(function (response) {
            console.log(response);
            isSend = false;
            window.location.href = '../users/index.html';
        }).fail(function (response){
            let data = JSON.parse(response.responseText);
            $('#formMessaje').text(data.error);
            isSend = false;
        });
    })
})
