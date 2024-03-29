const dataController = (function () {

    var tasks = [];

    return {
        getTime: function () {
            const today = new Date();

            return {
                seconds: today.getSeconds(),
                minutes: today.getMinutes(),
                hours: today.getHours(),
                day: today.getDate(),
                dayWeek: today.getDay(),
                dayName: function () {
                    var dayName;

                    switch (this.dayWeek) {
                        case 0: dayName = 'Sunday'; break;
                        case 1: dayName = 'Monday'; break;
                        case 2: dayName = 'Tuesday'; break;
                        case 3: dayName = 'Wednesday'; break;
                        case 4: dayName = 'Thursday'; break;
                        case 5: dayName = 'Friday'; break;
                        case 6: dayName = 'Satursday'; break;
                    }

                    return dayName;
                },
                month: today.getMonth(),
                monthName: function () {
                    var currMonth;

                    switch (this.month) {
                        case 0: currMonth = 'January'; break;
                        case 1: currMonth = 'February'; break;
                        case 2: currMonth = 'March'; break;
                        case 3: currMonth = 'April'; break;
                        case 4: currMonth = 'May'; break;
                        case 5: currMonth = 'June'; break;
                        case 6: currMonth = 'July'; break;
                        case 7: currMonth = 'August'; break;
                        case 8: currMonth = 'September'; break;
                        case 9: currMonth = 'October'; break;
                        case 10: currMonth = 'November'; break;
                        case 11: currMonth = 'December'; break;
                        default: currMonth = null; break;
                    }

                    return currMonth;
                },
                year: today.getFullYear(),
            }
        },

        storeTask: function (obj) {
            // task.push(obj);
            var item;
            item = obj;

            if (tasks.length > 0) {
                item.id = tasks[tasks.length - 1].id + 1;
                tasks.push(obj);
            } else {
                item.id = 0
                tasks[0] = obj;
            }
        },

        delTask: function (id) {
            for (let i = 0; i < tasks.length; i++) {
                if (id == tasks[i].id) {
                    tasks.splice(i, 1);
                };
            }
        },

        getTasks: function () {
            return tasks;
        }
    }
})();

const uiController = (function () {

    var domStrings = {
        addTaskContainer: '.add-task-content',
        inputFields: '.input',
        inputPriority: '#priority',
        inputTask: '#task-title',
        inputDate: '#date',
        inputTime: '#time',
        inputSubmit: '#submit',
        uiTime: '.current-time',
        uiSecond: '.current-seconds',
        uiDate: '.current-date',
        tasksContainer: '.tasks',
        deleteButton: '#btn-done'
    }

    function timeUI(obj) {

        var displayHours, session, displayMinutes, displaySeconds;

        displayHours = obj.hours;
        session = 'AM';
        if (displayHours > 12) {
            displayHours = displayHours - 12;
            session = 'PM';
        }

        displayMinutes = obj.minutes;
        displaySeconds = obj.seconds;
        if (obj.minutes < 10) {
            displayMinutes = '0' + obj.minutes
        }
        if (obj.seconds < 10) {
            displaySeconds = '0' + obj.seconds
        }

        displaySeconds = displaySeconds + ' ' + session;
        displayTime = displayHours + ':' + displayMinutes;
        displayDate = `obj.dayName(), obj.monthName(), obj.day, obj.year`;

        document.querySelector(domStrings.uiDate).innerText = displayDate;
        document.querySelector(domStrings.uiTime).innerText = displayTime;
        document.querySelector(domStrings.uiSecond).innerText = displaySeconds;
    };

    function TaskTimeConstruct(obj) {
        this.hh = obj.time.slice(0, 2);
        this.mm = obj.time.slice(3,);
        this.DD = obj.date.slice(8,);
        this.MM = obj.date.slice(5, 7);
        this.YY = obj.date.slice(0, 4);
    };

    TaskTimeConstruct.prototype.MMName = function () {
        switch (this.MM) {
            case '01': currMonth = 'January'; break;
            case '02': currMonth = 'February'; break;
            case '03': currMonth = 'March'; break;
            case '04': currMonth = 'April'; break;
            case '05': currMonth = 'May'; break;
            case '06': currMonth = 'June'; break;
            case '07': currMonth = 'July'; break;
            case '08': currMonth = 'August'; break;
            case '09': currMonth = 'September'; break;
            case '10': currMonth = 'October'; break;
            case '11': currMonth = 'November'; break;
            case '12': currMonth = 'December'; break;
            default: currMonth = null; break;
        }

        return currMonth;
    };

    function displayTask(obj) {
        tasksContainer = document.querySelector(domStrings.tasksContainer);

        endTime = new TaskTimeConstruct(obj);
        console.log(endTime);

        task = document.createElement('div');
        task.classList.add('task');

        taskPriority = document.createElement('div');
        taskPriority.classList.add('task-priority');
        taskPriority.classList.add(obj.priority);
        task.appendChild(taskPriority);

        taskLeft = document.createElement('div');
        taskLeft.classList.add('task-left');
        task.appendChild(taskLeft);

        taskDesc = document.createElement('div');
        taskDesc.classList.add('task-desc');
        taskLeft.appendChild(taskDesc);

        taskTitle = document.createElement('h3');
        taskTitle.classList.add('task-title');
        taskTitle.innerText = obj.task;
        taskDesc.appendChild(taskTitle);

        taskRight = document.createElement('div');
        taskRight.classList.add('task-right');
        task.appendChild(taskRight);

        taskDeadline = document.createElement('h4');
        taskDeadline.classList.add('task-deadline');
        taskDeadline.classList.add('tool-tip-parent');
        if (endTime.MMName()) {
            taskDeadline.innerText = endTime.MMName() + ' ' + endTime.DD + ', ' + endTime.YY;
        } else {
            taskDeadline.innerText = 'No Deadline Set';
        }
        taskRight.appendChild(taskDeadline);

        taskDone = document.createElement('a');
        taskDone.classList.add('task-done');
        taskDone.setAttribute('id', 'btn-done');
        taskDone.setAttribute('data-id', obj.id);
        taskRight.appendChild(taskDone);

        taskCM = document.createElement('img');
        taskCM.classList.add('checkmark');
        taskCM.setAttribute('src', 'assets/img/check-mark-svgrepo-com.svg');
        taskDone.appendChild(taskCM);

        tasksContainer.appendChild(task);
    }

    function clearValues() {
        const inputFields = document.querySelectorAll(domStrings.inputFields)

        for (let i = 1; i < inputFields.length; i++) {
            inputFields[i].value = '';
        }

        inputFields[0].value = 'default';
    }

    function updateDeadline(arr) {
        deadlines = document.querySelectorAll('.task-deadline');

        // for (let i = 0; i < arr.length; i++) {
        //     endTime = new TaskTimeConstruct(arr[i]);
        //     for (let j = 0; j < deadlines.length; j++) {
        //         if (arr[i].id == deadlines[j].nextElementSibling.getAttribute('data-id')) {
        //             if (endTime.MMName()) {
        //                 deadlines[i].innerText = endTime.MMName() + ' ' + endTime.DD + ', ' + endTime.YY;
        //             } else {
        //                 deadlines[i].innerText = 'No Deadline Set';
        //             };

        //             var remainingWeeks, remainingDays, remainingHours, remainingMinutes;
        //             tooltip = document.createElement('span');
        //             tooltip.classList.add('tool-tip');

        //             remainingDays = parseInt(endTime.DD) - new Date().getDate()

        //             if (endTime.hh) {
        //                 var futureDay, presentDay, timeDiff;
        //                 futureDay = new Date(endTime.YY + '-' + endTime.MM + '-' + endTime.DD + ' ' + endTime.hh + ':' + endTime.mm);
        //                 presentDay = new Date();

        //                 console.log(futureDay)
        //                 console.log(presentDay)
        //                 delta = futureDay - presentDay;
        //                 var d = Math.abs(date_future - date_now) / 1000;                           // delta
        //                 var r = {};                                                                // result
        //                 var s = {                                                                  // structure
        //                     year: 31536000,
        //                     month: 2592000,
        //                     week: 604800, // uncomment row to ignore
        //                     day: 86400,   // feel free to add your own row
        //                     hour: 3600,
        //                     minute: 60,
        //                     second: 1
        //                 };

        //                 Object.keys(s).forEach(function(key){
        //                     r[key] = Math.floor(d / s[key]);
        //                     d -= r[key] * s[key];
        //                 });

        //                 // for example: {year:0,month:0,week:1,day:2,hour:34,minute:56,second:7}
        //                 console.log(r);
        //             } else {
        //                 tooltip.innerText = 'No Deadline Set';
        //             };

        //             deadlines[i].appendChild(tooltip);
        //         }

        //     }
        // }

        work in pr
    }

    return {
        test: function (arr) {
            updateDeadline(arr)
        },

        strings: domStrings,

        displayTasks: function (obj) {
            displayTask(obj);
        },

        getInput: function () {
            const taskInput = document.querySelector(domStrings.inputTask);

            if (taskInput.value) {
                newTask = {
                    priority: document.querySelector(domStrings.inputPriority).value,
                    task: taskInput.value,
                    date: document.querySelector(domStrings.inputDate).value,
                    time: document.querySelector(domStrings.inputTime).value
                }
            } else {
                return 'Input a value';
            };

            clearValues();
            return newTask;
        },

        deleteTask: function (e) {

            if (e.target.matches('a')) {
                e.target.parentElement.parentElement.remove();

                return e.target.getAttribute('data-id');
            }
            if (e.target.matches('img')) {
                e.target.parentElement.parentElement.parentElement.remove();

                return e.target.parentElement.getAttribute('data-id');
            }
        },

        updateTime: function (obj) {
            timeUI(obj);
        }
    };
})();

const controller = (function (uiCtrl, dataCtrl) {

    function addNewTask() {
        //get input
        newTask = uiCtrl.getInput();
        //store input
        dataCtrl.storeTask(newTask);

        //update UI
        uiCtrl.displayTasks(newTask);

        // updateDL();
    }

    // function updateDL() {
    //     tasks = dataCtrl.getTasks();

    //     uiCtrl.test(tasks);
    // }

    function startTime() {

        time = dataCtrl.getTime();
        uiCtrl.updateTime(time);

        setTimeout(startTime, 1000)
    }

    document.onload = startTime()
    document.querySelector(uiCtrl.strings.inputSubmit).addEventListener('click', addNewTask);
    document.querySelector(uiCtrl.strings.addTaskContainer).addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            addNewTask();
        }
    });
    document.querySelector(uiCtrl.strings.tasksContainer).addEventListener('click', function (e) {
        e.target.style.backgroundColor = 'darkgreen';

        if (e.target.matches('img')) {
            e.target.parentElement.style.backgroundColor = 'darkgreen';
        }
        id = setTimeout(uiCtrl.deleteTask, 1500, e);

        dataCtrl.delTask(id);
    })
})(uiController, dataController);