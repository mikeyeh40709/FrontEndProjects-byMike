var nowyear = new Date().getFullYear(); //2020
var nowMonth = new Date().getMonth() + 1; // 0~11  7
var nowDate = new Date().getDate();

const tbody = document.getElementsByTagName("tbody")[0];

ShowSwitchTime(nowyear, nowMonth);
initCalendar(nowyear, nowMonth - 1);
setClock();

function ShowSwitchTime() {
    document.getElementById('month').value = nowMonth;
    document.getElementById('year').value = nowyear;
}

function initCalendar(currentYear, currentMonth) {
    tbody.innerHTML = "";
    var day = 1; //日期的變數從1號開始
    var TotalDays = new Date(currentYear, currentMonth, 0).getDate(); //月天數   
    var whichDay = new Date(currentYear, currentMonth).getDay(); //周幾 (6)
    //對第一列作處理
    var tr = document.createElement("tr");
    for (var i = 0; i < 7; i++) {
        let td = document.createElement("td");
        td.classList.add("border");
        td.classList.add("border-white");
        if (i >= whichDay) {
            td.innerText = day;
            td.setAttribute("id", `${nowyear}-${nowMonth.toString().padStart(2,"0")}-${day.toString().padStart(2,"0")}`);
            day++;
        } else {
            td.classList.add("bg-secondary");
        }
        tr.appendChild(td);
    }
    tbody.appendChild(tr);

    var rows = Math.ceil((TotalDays - day + 1) / 7);

    for (var j = 0; j < rows; j++) {
        let tr = document.createElement("tr");
        for (var num = 0; num < 7; num++) {
            let td = document.createElement('td');
            td.classList.add("border");
            td.classList.add("border-white");
            if (day <= TotalDays) {
                td.innerText = day;
                td.setAttribute("id", `${nowyear}-${nowMonth.toString().padStart(2,"0")}-${day.toString().padStart(2,"0")}`);
                day++;
            } else {
                td.classList.add("bg-secondary");
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    showEventData(nowyear, nowMonth);
}

function MinusMonth() {
    if (nowMonth != 1) {
        nowMonth -= 1;
    } else {
        nowMonth = 12;
        nowyear -= 1;
    }
    ShowSwitchTime(nowyear, nowMonth);
    initCalendar(nowyear, nowMonth - 1);
}

function AddMonth() {
    if (nowMonth != 12) {
        nowMonth += 1;
    } else {
        nowMonth = 1;
        nowyear += 1;
    }
    ShowSwitchTime(nowyear, nowMonth);
    initCalendar(nowyear, nowMonth - 1);
}

function MinusYear() {
    nowyear -= 1;
    ShowSwitchTime(nowyear, nowMonth);
    initCalendar(nowyear, nowMonth - 1);
}

function AddYear() {
    nowyear += 1;
    ShowSwitchTime(nowyear, nowMonth);
    initCalendar(nowyear, nowMonth - 1);
}

function setClock() {
    setInterval(function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hr = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        month = month < 10 ? "0" + month : month;
        hr = hr < 10 ? "0" + hr : hr;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        document.getElementById("clock").innerHTML = `${year}.${month}.${date} ${hr}:${min}:${sec}`;
    }, 1000);
}
//製作點擊事件
var addEventBtn = document.getElementById('addevent');
var todoModal = document.getElementById('todoModal');
var saveEvent = document.getElementById('saveEvent');
var deletebtn = document.getElementById('deleteEvent');
var saveEditEvent = document.getElementById('saveEditEvent');

var titleName = document.getElementById('title');
var whenDate = document.getElementById('date');
var whenTime = document.getElementById('time');
var bgColor = document.getElementById('color');
var detailText = document.getElementById('message-text');
var updatedtime = document.getElementById('updatedtime');

todoModal.style.display = 'none';


addEventBtn.addEventListener("click", function () {
    titleName.value = '';
    whenDate.value = '';
    whenTime.value = '';
    bgColor.value = '';
    detailText.value = '';
    todoModal.style.display = 'auto';
    updatedtime.innerText = '';
    saveEvent.classList.remove('d-none');
    saveEditEvent.classList.add('d-none');
    deletebtn.classList.add('d-none');
});

saveEvent.addEventListener("click", addEvent);
deletebtn.addEventListener("click", deleteOrSaveEditEvent);
saveEditEvent.addEventListener("click", deleteOrSaveEditEvent);

function addEvent() {
    if (titleName.value == '' || whenDate.value == '' || whenTime.value == '') {
        Swal.fire("Invalid Save!", "Title, date and time must be filled!", "error").then(() => {
            return;
        });
    } else {
        saveData(titleName.value, whenDate.value, whenTime.value, bgColor.value, detailText.value);
        $('#todoModal').modal('hide');
        initCalendar(nowyear, nowMonth - 1);
    }
}

function saveData(title, date, time, color, detail) {
    var data = {
        title: title,
        date: date,
        time: time,
        color: color,
        detail: detail,
        updatedtime: new Date().toLocaleString('en-US')
    };
    localStorage.setItem(Date.now(), JSON.stringify(data));
}

function showEventData(year, month) {
    for (var i = 0; i < localStorage.length; i++) {
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let dataDate = data.date;
        if ((year + "-" + month.toString().padStart(2, "0")) == dataDate.substring(0, 7)) {
            let datakey = localStorage.key(i);
            let title = data.title.toString();
            let targetTD = document.getElementById(dataDate);
            let eventbtn = document.createElement('button');
            eventbtn.classList.add('btn', 'btn-outline-secondary', 'text-light', 'border-light', 'w-100');
            eventbtn.style.backgroundColor = data.color;
            eventbtn.innerText = title.length > 5 ? title.substring(0, 5) + "..." : title;
            eventbtn.dataset.toggle = "modal";
            eventbtn.dataset.target = "#todoModal";

            eventbtn.addEventListener('click', function () {
                deletebtn.classList.remove('d-none');
                saveEditEvent.classList.remove('d-none');
                saveEvent.classList.add('d-none');

                document.getElementById('modalTitle').innerText = "Edit Event";
                document.getElementById('updatedtime').innerHTML = `Last Edited Time:<br>${data.updatedtime}`;

                deletebtn.setAttribute('value', datakey);
                saveEditEvent.setAttribute('value', datakey);

                document.getElementById('title').value = data.title;
                document.getElementById('date').value = dataDate;
                document.getElementById('time').value = data.time;
                document.getElementById('color').value = data.color;
                document.getElementById('message-text').value = data.detail;
            });
            targetTD.append(eventbtn);
        }
    }
}

function deleteOrSaveEditEvent() {
    if (this.id == "saveEditEvent") {
        if (titleName.value == '' || whenDate.value == '' || whenTime.value == '') {
            Swal.fire("Invalid Save!", "Title, date and time must be filled!", "error").then(() => {
                return;
            });
        } else {
            localStorage.removeItem(this.value);
            addEvent();
        }
    } else {
        localStorage.removeItem(this.value);
        $('#todoModal').modal('hide');
        initCalendar(nowyear, nowMonth - 1);
    }
}