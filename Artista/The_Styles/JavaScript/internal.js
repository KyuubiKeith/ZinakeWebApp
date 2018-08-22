jQuery("document").ready(function($){
    var imageHeight = $('.internal-page-header').height();
    var startScroll = imageHeight - 48;
    
    if (window.innerWidth >= 1024) {
        $(window).scroll(function(){
            var scroll = $(document).scrollTop();
            var addClipping = 32 - scroll + startScroll;
            var subtractClipping = 32 + scroll + startScroll;
            //console.log(clipping);
            if (scroll >= startScroll) {
                $(".nav-light").css('clip','rect(0px, 184px,'+ addClipping +'px, 0px)');
                //$(".nav-dark").addClass('visible');
                //$(".nav-dark").removeClass('hidden');
            }
            else if (scroll < startScroll) {
                $(".nav-light").css('clip','rect(0px, 184px,'+ subtractClipping +'px, 0px)');
                //$(".nav-dark").addClass('hidden');
            }
        });
    }
    
    var controller = new ScrollMagic.Controller();   
    
    new ScrollMagic.Scene({
        triggerElement: "#job-header", 
        triggerHook: 0,
        duration: '150%',
    })
    .on("progress", function (e) {
        var val = e.progress.toFixed(3)
        $("#job-header").css("background-position",  "center "+val*(300)+"px");
    })
    //.addIndicators({name: "hero-section"})
    .addTo(controller);
    
    $(".js-to-show").each(function(){
        new ScrollMagic.Scene({
            triggerElement: this,
            reverse:false,
            triggerHook:1
        })
        .setClassToggle(this, "visible")
        .addTo(controller);
    });
    
    checkForm();
    
    function checkForm(){
        $('.form-group input').blur(function() {
            if (!$(this).val()) {
              $(this).siblings('.error-text').removeClass('show'); 
            } 
        });
        
    }
    
    
    $("#formDefault input, #formDefault textarea").blur(function(){
        var el = $(this);
        if(el.val() != ""){
            el.addClass("filled");
        }else{
            el.removeClass("filled");
        }
    });
    
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }; 
    
    $('.submit').click(function(){
        var email = $("#contactEmail").val();
        if( !$('.required').val() ) {
            $('.empty-text').addClass('show');
        } else {
            if(!isValidEmailAddress(email)) {
                $('.mail').addClass('show');
            } else {
                sendForm();  
            }
        }
        return false;
    });
    
    function sendForm(){
        $(".submit").addClass("disabled");
        $(".loading-container").fadeIn();
        var nome = $(".form-group").find("#contactName").val();
        $.ajax({
            type: "post",
            url: "../form.php",
            data: $("#formDefault").serialize(),
            success: function(data){
                console.log(data);
                if(data=="1"){
                    $("#formDefault .submit").removeClass("disabled");
                    $("#formDefault .text-success").removeClass("hidden");  
                    $("#formDefault")[0].reset();
                    $("#formDefault").fadeOut();
                    $("#formDefault input, #formDefault textarea").removeClass("filled");
                    $(".success-message").fadeIn();
                    $("#formDefault .error-text").removeClass("show");
                    $(".loading-container").fadeOut();
                    $('.name-value').text(nome);
                    
                }else{
                    $("#formDefault .error-message").fadeIn();
                }
            },
            error: function(){
                 alert("error!");
            }
        });	
    }
    
    $('.mostra-form').click(function(){
        $("#formDefault").fadeIn();
        $(".success-message").fadeOut();
        return false;
    });
    
});
