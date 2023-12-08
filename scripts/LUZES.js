"use strict";

function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');
    const powerOnButton = document.getElementById('powerOnButton');
    const powerOffButton = document.getElementById('powerOffButton');
    const decreasePower = document.getElementById('decreasePower');
    const increasePower = document.getElementById('increasePower');
    const saveChangesButton = document.getElementById('guardarButton');
    const BackButton = document.getElementById('back-button');
    const schedulingButton = document.getElementById('agendamentosButton');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');
    const okButton = document.getElementById('okButton');

    userIcon.addEventListener("click", Menu_Perfil);
    powerOnButton.addEventListener('click', () => toggleCleaner('on'));
    powerOffButton.addEventListener('click', () => toggleCleaner('off'));
    decreasePower.addEventListener('click', decreasePowerValue);
    increasePower.addEventListener('click', increasePowerValue);
    saveChangesButton.addEventListener('click', saveChanges);
    BackButton.addEventListener("click",GoBack);
    schedulingButton.addEventListener("click", Scheduling);
    confirmButton.addEventListener('click', schedule);
    cancelButton.addEventListener('click', Cancel);
    okButton.addEventListener('click', SchedulePage);

}

function Menu_Perfil(){
    const userMenu = document.getElementById('user-menu');
    if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    } else {
        userMenu.style.display = 'block';
    }
}


function Scheduling(){
    const Horario = document.getElementById('horario');
    if (Horario.style.display === 'block') {
        Horario.style.display = 'none';
    } else {
        Horario.style.display = 'block';
    }
}

function SchedulePage(){
    window.location.href = "AGENDAMENTOS.html";
}

function Cancel(){
    window.location.href = "LUZES.html";
}

function ScheduleLigths(name,connection, power, dayOfWeek, starthour, startminute, endhour, endminute) {
    this.name= name;
    this.connection = connection;
    this.power = power;
    this.dayOfWeek = dayOfWeek;
    this.starthour = starthour;
    this.startminute = startminute;
    this.endhour = endhour;
    this.endminute = endminute;
}

function schedule() {
    const selectedDays = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(checkbox => checkbox.value);
    const selectedHourElement = document.getElementById('selectedHour');
    const selectedMinuteElement = document.getElementById('selectedMinute');
    const selectedHourElement2 = document.getElementById('selectedHour2');
    const selectedMinuteElement2 = document.getElementById('selectedMinute2');
    
    const Dialog = document.getElementById("scheduleconfirmed");
    const Horario = document.getElementById('horario');
    const selectedHour = selectedHourElement.value;
    const selectedMinute = selectedMinuteElement.value;
    const selectedHour2 = selectedHourElement2.value;
    const selectedMinute2 = selectedMinuteElement2.value;

    if (selectedDays.length > 0 && selectedHour != undefined && selectedMinute != undefined && selectedHour2 != undefined && selectedMinute2 != undefined) {

        
        let ScheduleData = new ScheduleLigths("LUZES", isLightsOn, currentPower, selectedDays, selectedHour, selectedMinute, selectedHour2, selectedMinute2);
        
        let Schedule = JSON.parse(localStorage.getItem('Schedule')) || [];
        
        Schedule.push(ScheduleData);

        localStorage.setItem("Schedule", JSON.stringify(Schedule));

        Dialog.style.display = 'block';
        Horario.style.display = "none"; 
        
    }
}   

function updateSelectedTime(selectedItem, value, selectedTimeId, containerId) {
    const selectedTimeElement = document.getElementById(selectedTimeId);
    const scrollContainer = document.getElementById(containerId);

    if (selectedTimeElement && scrollContainer) {
        const otherTimeElements = scrollContainer.querySelectorAll('.scroll-item');
        otherTimeElements.forEach(element => {
            element.style.backgroundColor = '';
        });

        selectedItem.style.backgroundColor = '#4caf50';

        selectedTimeElement.value = (value < 10 ? '0' : '') + value;
    } 
}

function populateTimeScrolls1() {
    const hourScroll = document.getElementById('hourScroll');
    const hourScroll2 = document.getElementById('hourScroll2');
    
    for (let hour = 0; hour < 24; hour++) {
        const hourOption = document.createElement('div');
        hourOption.textContent = (hour < 10 ? '0' : '') + hour;
        hourOption.classList.add('scroll-item');
        hourOption.dataset.value = hour;
        hourOption.addEventListener('click', function() {
            updateSelectedTime(hourOption, hourOption.dataset.value, 'selectedHour', 'hourScroll');
        });
        hourScroll.appendChild(hourOption);
    }

    for (let hour = 0; hour < 24; hour++) {
        const hourOption = document.createElement('div');
        hourOption.textContent = (hour < 10 ? '0' : '') + hour;
        hourOption.classList.add('scroll-item');
        hourOption.dataset.value = hour;
        hourOption.addEventListener('click', function() {
            updateSelectedTime(hourOption, hourOption.dataset.value, 'selectedHour2', 'hourScroll2');
        });
        hourScroll2.appendChild(hourOption);
    }

}

function populateTimeScrolls2() {
    const minuteScroll = document.getElementById('minuteScroll');
    const minuteScroll2 = document.getElementById('minuteScroll2');
    
    for (let minute = 0; minute < 60; minute++) {
        const minuteOption = document.createElement('div');
        minuteOption.textContent = (minute < 10 ? '0' : '') + minute;
        minuteOption.classList.add('scroll-item');
        minuteOption.dataset.value = minute;
        minuteOption.addEventListener('click', function() {
            updateSelectedTime(minuteOption, minuteOption.dataset.value, 'selectedMinute', 'minuteScroll');
        });
        minuteScroll.appendChild(minuteOption);
    }

    for (let minute = 0; minute < 60; minute++) {
        const minuteOption = document.createElement('div');
        minuteOption.textContent = (minute < 10 ? '0' : '') + minute;
        minuteOption.classList.add('scroll-item');
        minuteOption.dataset.value = minute;
        minuteOption.addEventListener('click', function() {
            updateSelectedTime(minuteOption, minuteOption.dataset.value, 'selectedMinute2', 'minuteScroll2');
        });
        minuteScroll2.appendChild(minuteOption);
    }
}





let isLightsOn = true;

let currentPower = 100;
let change = false;

let previousPower = currentPower;
let Lightsinfo = []


function toggleCleaner(state) {

    const statusText = document.getElementById('status');
    const currentPowerDisplay = document.getElementById('currentPower');
    const PowerControl= document.getElementById("power-ligths");
    const saveChangesButton = document.getElementById('guardarButton');
    

    if (state === 'on') {
        isLightsOn = true;
        statusText.textContent = 'As luzes estão ligadas.';
        powerOnButton.classList.add('selected');
        powerOffButton.classList.remove('selected');
        statusText.style.color="#4CAF50";
        
        PowerControl.style.color = '#000';
        PowerControl.style.pointerEvents = "all";
        PowerControl.style.borderColor ="#000";
        currentPowerDisplay.style.borderColor ="#000"
        change=true;
        

    } else if (state === 'off') {
        isLightsOn = false;
        statusText.textContent = 'As luzes estão desligadas';
        powerOnButton.classList.remove('selected');
        powerOffButton.classList.add('selected');
        statusText.style.color="red";
        PowerControl.style.color = '#777'; 
        PowerControl.style.pointerEvents = "none"
        PowerControl.style.borderColor = '#777'; 
        currentPowerDisplay.style.borderColor ="#777";
        change=true;
        
    }
}

function decreasePowerValue() {
    const currentPowerDisplay = document.getElementById('currentPower');
    
    if (currentPower > 10) {
        currentPower=currentPower-10;
        currentPowerDisplay.textContent = currentPower + "%";
        change = true;
        
    }
}

function increasePowerValue() {
    const currentPowerDisplay = document.getElementById('currentPower');
   
    if (currentPower < 100) {
        currentPower=currentPower+10;
        currentPowerDisplay.textContent = currentPower + "%";
        change = true;
        
    }
}

function saveChanges() {
    if (change) {
        const newPower = currentPower;
        const customDialog = document.getElementById('custom-dialog');
        const confirmYes = document.getElementById('confirm-yes');
        const confirmNo = document.getElementById('confirm-no');


        customDialog.style.display = 'block';

        confirmYes.addEventListener('click', function() {
            previousPower = newPower;
            currentPower = newPower;
            customDialog.style.display = 'none';
            window.location.href = "../HOME.html";
            
            let LightsData = new Lights(isLightsOn, currentPower);
            Lightsinfo.push(LightsData);
            localStorage.setItem("LUZES",JSON.stringify(Lightsinfo));
            change = false;

        });

        confirmNo.addEventListener('click', function() {
            customDialog.style.display = 'none';
            
            let storedLightsInfo = localStorage.getItem("LUZES");
            if (storedLightsInfo) {
                Lightsinfo = JSON.parse(storedLightsInfo);
                const lastLightsData = Lightsinfo[Lightsinfo.length - 1];
                if (lastLightsData) {
                    isLightsOn = lastLightsData.connection;
                    currentPower = lastLightsData.power;
                    if (isLightsOn){
                        toggleCleaner("on")
                    }else{
                        toggleCleaner("off")
                    }
                    const currentPowerDisplay = document.getElementById('currentPower');
                    currentPowerDisplay.textContent = currentPower;
                }
            }else{
                currentPower = previousPower;
                const currentPowerDisplay = document.getElementById('currentPower');
                currentPowerDisplay.textContent = currentPower + "%";
            }
            change = false;
        });
    }
    
}

function Lights(connection,power){
    this.connection = connection;
    this.power = power;
}

document.addEventListener('DOMContentLoaded', function() {
    populateTimeScrolls1();
    populateTimeScrolls2();
   
    
});

function GoBack() {
    
    if (change) {
        const outDialog = document.getElementById('out-dialog');
        const confirmYes = document.getElementById('yes');
        const confirmNo = document.getElementById('no');
        
        outDialog.style.display = 'block';
        
        confirmYes.addEventListener('click', function() {
            window.history.back();
        });

        confirmNo.addEventListener('click', function() {
            outDialog.style.display = 'none';
        });
    } else {
        window.history.back();
    }
}

function principal(){
    let storedLightsInfo = localStorage.getItem("LUZES");
    
    if (storedLightsInfo) {
        Lightsinfo = JSON.parse(storedLightsInfo);
        const lastLightsData = Lightsinfo[Lightsinfo.length - 1];
        if (lastLightsData) {
            isLightsOn = lastLightsData.connection;
            currentPower = lastLightsData.power;
          
            
        }
        if (isLightsOn){
            toggleCleaner("on")
        }
    } 
    else{
        isLightsOn = true;
        currentPower = 100;
        if (isLightsOn){
            toggleCleaner("on")
        }
    }
    
    
    const currentPowerDisplay = document.getElementById('currentPower');
    currentPowerDisplay.textContent = currentPower + "%";

    defineEventHandlersParaElementosHTML();
    
}

window.addEventListener("load", principal);