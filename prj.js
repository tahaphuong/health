function resulting() {
    document.getElementById('phy-error-message').innerText = ''
    const form = document.getElementById("info-form");
    let wei = form.wei.value;
    let hei = form.hei.value;
    let wai = form.wai.value;
    let age = form.age.value;
    let check = []
    let we = validateWeight(wei, check)
    let he = validateHeight(hei, check)
    let wa = validateWaist(wai, check)
    let ag = validateAge(age, check)

    var radio_check_sex = "";
        for (i = 0; i < document.getElementsByName('male-female').length; i++) {
            if (document.getElementsByName('male-female')[i].checked) {
                sex = document.getElementsByName('male-female')[i].value;
                radio_check_sex = document.getElementsByName('male-female')[i].value;        
            }        
        }
        if (!radio_check_sex) {check.push(false)}
    console.log(check)
    if (!check.includes(false)) {
        document.getElementById('phy-error-message').innerText = ''
        var bmiConclu = bmiCacu(we, he);       
        var rConclu = whRatio(wa, he);
        var fatConclu = fatPer(we, he, ag, sex);
        resultbar(bmiConclu, rConclu, fatConclu);

        document.getElementById("bmiConclu").innerHTML = bmiConclu;
        document.getElementById("rConclu").innerHTML = rConclu;
        document.getElementById("fatConclu").innerHTML = fatConclu + "%";
        analysis(bmiConclu, rConclu, fatConclu, sex);
        scrollToResult();
        check = []
    } else {
        document.getElementById('phy-error-message').innerText = 'Please fill correct inputs!'
        check = []
    }
}
function bmiCacu(wei, hei) {
    var bmi = parseFloat(wei)/(parseFloat(hei)*parseFloat(hei));
    bmi2 = bmi.toFixed(2);
    if (bmi > 0) {return bmi2;} 
}

function whRatio(wai, hei) {
    let r = (parseFloat(wai)/100)/parseFloat(hei);
    r2 = r.toFixed(2);
    if (r2 > 0) {return r2;}
}

function fatPer(wei, hei, age, sex) {
    var bmi = parseFloat(wei)/(parseFloat(hei)*parseFloat(hei));
    if (Number(age) < 15) {
        var f = (1.51 * Number(bmi)) - (0.7 * Number(age)) - (3.6 * Number(sex)) + 1.4;
    }
    if (Number(age) >= 15) {
        var f = (1.20 * Number(bmi)) + (0.23 * Number(age)) - (10.8 * Number(sex)) - 5.4;
    } 
    f2 = f.toFixed(2);
    if (f2 > 0) {return f2;} 
}

function validate(str, check) {
    if (str.includes(",")) {
        str = str.replace(',', '.')
    }
    if (str.length && !isNaN(Number(str))) {
        str = Number(str)
        check.push(true)
        return str
    } else {
        check.push(false)
    }
} 

function validateHeight(height, check) {
    let x = validate(height, check)
    if (x>=0.5 && x<=3) {
        check.push(true)
        return x
    } else {check.push(false)}
}

function validateWeight(weight, check) {
    let x = validate(weight, check)
    if (x>=3 && x<=600) {
        check.push(true)
        return x
    } else {check.push(false)}
}

function validateWaist(waist, check) {
    let x = validate(waist, check)
    if (x>=35 && x<=300) {
        check.push(true)
        return x
    } else {check.push(false)}
}

function validateAge(age, check) {
    let x = validate(age, check)
    if (x>=0.5 && x<=200) {
        check.push(true)
        return x
    } else {check.push(false)}
}

function resultbar(bmi2, r2, f2) {
  if (bmi2 && r2 && f2) {
    var bmibar = document.getElementById("bmibar");
    var whbar = document.getElementById("whbar");
    var fatbar = document.getElementById("fatbar");
    bmibar.style.width = 0 + 'px'
    whbar.style.width = 0 + 'px'
    fatbar.style.width = 0 + 'px'

    var bmipos = 0;
    var whpos = 0;
    var fatpos = 0;

    var id1 = setInterval(frame1, 40);
    var id2 = setInterval(frame2, 30);
    var id3 = setInterval(frame3, 40);

    function frame1() {
        if (bmipos == Math.round(bmi2)) {
          clearInterval(id1);
        } else if (bmi2 > 50) {
          bmi2 = 50
        }
        else {
          bmipos++; 
          bmibar.style.width = bmipos*12 + 'px';
        }
    }
    function frame2() {
        if (whpos == Math.round(r2*600)) {
          clearInterval(id2);
        } else if (r2 >= 1) {
          r2 = 1;
        } else {
          whpos+= 6; 
          whbar.style.width = whpos + 'px';
        }
    }
    function frame3() {
        if (fatpos == Math.round(f2)) {
            clearInterval(id3);
        } else if (f2 > 100) {
            f2 = 100;
        } else {
            fatpos++; 
            fatbar.style.width = fatpos*6 + 'px';
        }
    }
  }   
}

    window.onscroll = function() {myFunction()};
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        } else {
        navbar.classList.remove("sticky");
        }
    }

    function scrollToResult() {
        $('html,body').animate({
            scrollTop: $('#conclu-phy').offset().top
        }, 0);
    }
    function scrollToResult2() {
        $('html,body').animate({
            scrollTop: $('#conclu-men-2').offset().top
        }, 0);
    }
    $(document).ready(function(){
        if ( $("#advice-phy").is(":hidden")) {
            $("#button-advice-phy").click(function(){
            $("#advice-phy").slideToggle("slow");
        });
        } else {
            $("#advice-phy").hide();
        }
    });
    
    function analysis(bmi2, r2, f2, sex) {
        bmiColor = document.getElementById("bmi-an");
        rColor = document.getElementById("r-an");
        fatColor = document.getElementById("fat-an");
        
        if (bmi2 < 18.5) {
            document.getElementById("bmi-an").innerHTML = "UNDERWEIGHT";
            bmiColor.style.color = '#FC8A02';
            document.getElementById("bmi-ad").innerHTML = "You should gain more weight by eating a proper bigger portion and low-intensity excercises.";
            document.getElementById("gain-w").innerHTML = "<a href='prj-tips-weight.html#gain'>How to gain weight?</a>";
        } else if (bmi2 >= 18.5 && bmi2 < 25) {
            document.getElementById("bmi-an").innerHTML = "NORMAL";
            bmiColor.style.color = '#547A1D';
            document.getElementById("bmi-ad").innerHTML = "You are at healthy weight! Keep going to maintain this!";
            document.getElementById("main-w").innerHTML = "<a href='prj-tips-life.html'>How to maintain healthy weight?</a>";
        } else if (bmi2 >= 25 && bmi2 < 30) {
            document.getElementById("bmi-an").innerHTML = "OVERWEIGHT";
            bmiColor.style.color = '#E96245';
            document.getElementById("bmi-ad").innerHTML = "Your weight is higher than your healthy weight. It's better to get rid of those unnecessary kilos.";
            document.getElementById("lose-w").innerHTML = "<a href='prj-tips-weight.html#lose'>How to lose weight?</a>";
        } else if (bmi2 >= 30 && bmi2 < 40) {
            document.getElementById("bmi-an").innerHTML = "OBESITY";
            bmiColor.style.color = '#C9441B';
            document.getElementById("bmi-ad").innerHTML = "You may at thee edge of dangerous deasease. You should lose some weights.";
            document.getElementById("lose-w").innerHTML = "<a href='prj-tips-weight.html#lose'>How to lose weight?</a>";
        } else if (bmi2 >= 40) {
            document.getElementById("bmi-an").innerHTML = "OBESITY 2";
            bmiColor.style.color = '#C9441B';
            document.getElementById("bmi-ad").innerHTML = "Your weight is at the dangerous level and you might face with some risks. You should make an appointment with your doctor.";
            document.getElementById("lose-w").innerHTML = "<a href='prj-tips-weight.html#lose'>How to lose weight?</a>";
        }


        if (Number(sex) == 0) {
            document.getElementById("r-ad").innerHTML = "An adult woman usually has waist-height ratio at 0.42-0.49 <br> Full chart <a href='prj-tips-charts.html#wh-pic'>here<a/>.";
            if (r2 <= 0.4) {
                document.getElementById("r-an").innerHTML = "EXTREMELY SLIM";
                rColor.style.color = '#FC8A02';
            } else if (r2 > 0.4 && r2 <= 0.46) {
                document.getElementById("r-an").innerHTML = "SLENDER & HEALTHY";
                rColor.style.color = '#547A1D';
            } else if (r2 > 0.46 && r2 <= 0.49) {
                document.getElementById("r-an").innerHTML = "HEALTHY";
                rColor.style.color = '#547A1D';
            } else if (r2 > 0.49 && r2 <= 0.54) {
                document.getElementById("r-an").innerHTML = "OVERWEIGHT";
                rColor.style.color = '#E96245';
            } else if (r2 > 0.54) {
                document.getElementById("r-an").innerHTML = "OBESITY";
                rColor.style.color = '#C9441B';
            }

            document.getElementById("fat-ad").innerHTML = "An adult woman should have fat percentage at 15-24% <br> Full chart <a href='prj-tips-charts.html#fat-pic'>here<a/>";
            if (f2 <= 19) {
                document.getElementById("fat-an").innerHTML = "ATHELTES";
                fatColor.style.color = '#FC8A02';
            } else if (f2 > 19 && f2 <= 24) {
                document.getElementById("fat-an").innerHTML = "FITNESS/IDEAL";
                fatColor.style.color = '#547A1D';
            } else if (f2 > 24 && f2 <= 31) {
                document.getElementById("fat-an").innerHTML = "AVERAGE";
                fatColor.style.color = '#547A1D';
            } else if (f2 > 31) {
                document.getElementById("fat-an").innerHTML = "OVERWEIGHT";
                fatColor.style.color = '#C9441B';
            }
        }


        if (Number(sex) == 1) {
            document.getElementById("r-ad").innerHTML = "An adult man usually has waist-height ratio at 0.43-0.53 <br> Full chart <a href='#'>here<a/>";
            if (r2 <= 0.43) {
                document.getElementById("r-an").innerHTML = "EXTREMELY SLIM";
                rColor.style.color = '#FC8A02';
            } else if (r2 > 0.43 && r2 <= 0.46) {
                document.getElementById("r-an").innerHTML = "SLENDER & HEALTHY";
                rColor.style.color = '#547A1D';
            } else if (r2 > 0.46 && r2 <= 0.53) {
                document.getElementById("r-an").innerHTML = "HEALTHY";
                rColor.style.color = '#547A1D';
            } else if (r2 > 0.53 && r2 <= 0.58) {
                document.getElementById("r-an").innerHTML = "OVERWEIGHT";
                rColor.style.color = '#E96245';
            } else if (r2 > 0.58) {
                document.getElementById("r-an").innerHTML = "OBESITY";
                rColor.style.color = '#C9441B';
            }
            
            document.getElementById("fat-ad").innerHTML = "An adult man should have fat percentage at 7-17% <br> Full chart <a href='#'>here<a/>";
            if (f2 <= 13) {
                document.getElementById("fat-an").innerHTML = "ATHELTES";
                fatColor.style.color = '#FC8A02';
            } else if (f2 > 13 && f2 <= 17) {
                document.getElementById("fat-an").innerHTML = "FITNESS/IDEAL";
                fatColor.style.color = '#547A1D';
            } else if (f2 > 17 && f2 <= 24) {
                document.getElementById("fat-an").innerHTML = "AVERAGE";
                fatColor.style.color = '#547A1D';
            } else if (f2 > 25) {
                document.getElementById("fat-an").innerHTML = "OVERWEIGHT";
                fatColor.style.color = '#C9441B';
            }
        }
    }

var radio1 = document.getElementsByName('q1');
var radio2 = document.getElementsByName('q2');
var radio3 = document.getElementsByName('q3');
var radio4 = document.getElementsByName('q4');
var radio5 = document.getElementsByName('q5');
var radio6 = document.getElementsByName('q6');
var radio7 = document.getElementsByName('q7');
var radio8 = document.getElementsByName('q8');
var radio9 = document.getElementsByName('q9');
var radio10 = document.getElementsByName('q10');


    var x = [];
    function check() {
    document.getElementById("men-error-message").innerText = ''
    for (var i=0; i < radio1.length; i++) {
        if (radio1[i].checked) {
            x.splice(0, 0, radio1[i].value);
            }
        }
    for (var i=0; i < radio2.length; i++) {
        if (radio2[i].checked) {
            x.splice(1, 0, radio2[i].value);
            }
        }
    for (var i=0; i < radio3.length; i++) {
        if (radio3[i].checked) {
            x.splice(0, 0, radio3[i].value);
            }
        }
    for (var i=0; i < radio4.length; i++) {
        if (radio4[i].checked) {
            x.splice(1, 0, radio4[i].value);
            }
        }
    for (var i=0; i < radio5.length; i++) {
        if (radio5[i].checked) {
            x.splice(0, 0, radio5[i].value);
            }
        }
    for (var i=0; i < radio6.length; i++) {
        if (radio6[i].checked) {
            x.splice(1, 0, radio6[i].value);
            }
        }
    for (var i=0; i < radio7.length; i++) {
        if (radio7[i].checked) {
            x.splice(0, 0, radio7[i].value);
            }
        }
    for (var i=0; i < radio8.length; i++) {
        if (radio8[i].checked) {
            x.splice(1, 0, radio8[i].value);
            }
        }
    for (var i=0; i < radio9.length; i++) {
        if (radio9[i].checked) {
            x.splice(0, 0, radio9[i].value);
            }
        }
    for (var i=0; i < radio10.length; i++) {
        if (radio10[i].checked) {
            x.splice(1, 0, radio10[i].value);
            }
        }
    var resultp = 0;
    for (var k=0; k < 10; k++) {
        resultp += Number(x[k]);
        }
        console.log(x);
    x = [];
    if (isNaN(resultp)) {
        document.getElementById("men-error-message").innerText = "Please fill all your answers before clicking SUBMIT"
    } else {
        scrollToResult2();
        document.getElementById("men-error-message").innerText = ''
        document.getElementById("click-text").style.display = 'block';
        document.getElementById("result").innerHTML = Math.round(resultp*100/30) + "%";
        
        if (resultp <= 7) {
        document.getElementById("men-conclu").innerHTML = "Your current lifestyle may affect your health bad and cause some illness. It's better to change your lifestyle."
        } if (resultp > 7 && resultp <= 15) {
        document.getElementById("men-conclu").innerHTML = "Your current lifesyle is not good, but hasn't posed any threat yet. You should improve your lifestyle in order to have a better health."
        } if (resultp > 15 && resultp <= 24) {
        document.getElementById("men-conclu").innerHTML = "Your current lifestyle might help you to remain your health, but not completely. We think you might want some advice to improve it."
        } if (resultp > 24 && resultp <= 30) {
        document.getElementById("men-conclu").innerHTML = "Your current lifesyle is good and could help you to maintain a good health. We have some tips for you to improve it even more, check it out!"
        }
    }
}
    
    function passguestname() {
        var guestname = document.getElementById("guestname").value;
        localStorage.setItem("guestname-value", guestname);
        return true
    }

    const guestname = localStorage.getItem("guestname-value");
    if (guestname.length) {
        document.getElementById("he").innerHTML = "Hello" + " " + guestname + "!";
        document.getElementById("big-he").innerHTML = "let's get started, " + guestname;
        document.getElementById("big-by").innerHTML = "Thank you, " + guestname;
    } else {
        document.getElementById("he").innerHTML = "Hello new guest!";
        document.getElementById("big-he").innerHTML = "let's get started, new guest";
        document.getElementById("big-by").innerHTML = "Thank you, new guest";
    }

   
