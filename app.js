var childProcess = require('child_process');

const notificationMessage = "Temperature is too high!";
const notificationSound = "~/Music/notification_sound.mp3";

var sensorsProgram = childProcess.exec('sensors -j', function (error, stdout, stderr) {
    const sensorData = JSON.parse(stdout);
    // console.log(sensorData);

    // * These sensor names are specific to my computer. Change to yours.
    const t1 = parseFloat(sensorData['k10temp-pci-00c3']['temp1']['temp1_input'], 10);
    const t2 = parseFloat(sensorData['amdgpu-pci-0008']['edge']['temp1_input'], 10);
    const t3 = parseFloat(sensorData['acpitz-acpi-0']['temp1']['temp1_input'], 10);
    const t4 = parseFloat(sensorData['acpitz-acpi-0']['temp2']['temp2_input'], 10);

    if(t1 >= 70 || t2 >= 70 || t3 >= 70 || t4 >= 70) {
        childProcess.exec(`notify-send ${notificationMessage} && play ${notificationSound}`, function() {});
    }
    // console.log(t1, t2, t3, t4);
 });