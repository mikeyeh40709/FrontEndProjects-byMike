const iPhoneData = {
    color: {
        Red: '/IPhone/IPhonePics/iphone11-red-select-2019.png',
        Yellow : '/IPhone/IPhonePics/iphone11-yellow-select-2019.png',
        Black: '/IPhone/IPhonePics/iphone11-black-select-2019.png',
        Purple: '/IPhone/IPhonePics/iphone11-purple-select-2019.png',
        Green: '/IPhone/IPhonePics/iphone11-green-select-2019.png',
        White: '/IPhone/IPhonePics/iphone11-white-select-2019.png'
    },
    Specification:{
        '64GB': 'NT$24,900',
        '128GB': 'NT$26,900',
        '256GB': 'NT$30,400'
    }
};

function priceButtonTrue(){
    document.getElementById('sixfour').disabled = false;
    document.getElementById('onetwoeight').disabled = false;
    document.getElementById('twofivesix').disabled = false;
}

function CallRedPic(){
    document.getElementById("phonepic").src=iPhoneData.color.Red;
    // document.getElementById("phonepic").setAttribute("style","transition: 1s");
    // document.getElementById("phonepic").style.transition = " all 1s";
    priceButtonTrue();
}
function CallYellowPic(){
    document.getElementById("phonepic").src=iPhoneData.color.Yellow;
    priceButtonTrue();
}
function CallBlackPic(){
    document.getElementById("phonepic").src=iPhoneData.color.Black;
    priceButtonTrue();
}
function CallPurplePic(){
    document.getElementById("phonepic").src=iPhoneData.color.Purple;
    priceButtonTrue();
}
function CallGreenPic(){
    document.getElementById("phonepic").src=iPhoneData.color.Green;
    priceButtonTrue();
}
function CallWhitePic(){
    document.getElementById("phonepic").src=iPhoneData.color.White;
    priceButtonTrue();
}
function sixfourGBprice(){
    document.getElementById("price").innerText = iPhoneData.Specification["64GB"];
}
function onetwoeightGBprice(){
    document.getElementById("price").innerText = iPhoneData.Specification["128GB"];
}
function twofivesixGBprice(){
    document.getElementById("price").innerText = iPhoneData.Specification["256GB"];
}

