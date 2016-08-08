$(document).ready(function() {
    //ABSTRACTION ON POINT :)
    //no animations cuz im a minimilist. ? :)



    initDOM();
    //builds dom
    function initDOM() {
        startInterval();
        buildNavBar();
        loadData();
    }



    //listeners
    $('.progressBar').on("click", ".progressBox", function() {
        console.log($(this).data("id"));
        var student = $(this).data("id");
        chooseStudent(student);
    });

    $('.navBar').on("click", "button", function() {
        switch (this.id) {
            case "next":
                nextStudent();
                break;
            case "prev":
                prevStudent();
                break;
            default:
                console.log("This button isnt assigned");
        }

    });


    //ajax
    function loadData() {
        var closureArray;
        $.ajax({

            type: "GET",
            url: "/data",

            success: function(data) {
                showStudentInfo(data.omicron);
                //updateNavBar
            }
        });
    }


    //nav bar functionality
    function buildNavBar() {
        for (var i = 0; i < 17; i++) {
            $('.progressBar').append("<div id = 'student" + i + "' data-id='" + i + "' class='progressBox'></div>");
        }

        //initiations selection style to first student
        updateNavBar(0);
    }

    function updateNavBar(index) {
        // console.log("works?!?!");
        // console.log("YEA?", index);
        // console.log("THIS? #student" + index);
        $('#student' + index).toggleClass("selected");
    }

    var navInterval;

    function startInterval() {
        navInterval = setInterval(nextStudent, 8000);
    }

    function endInterval() {
        clearInterval(navInterval);
    }



    //functionality to append dom using an array of students
    function showStudentInfo(studentList) {
        console.log("works");
        var theStudents = studentList;
        loadName(theStudents);
        loadUserInfo(theStudents);
        loadThankyou(theStudents);
    }

    function loadName(studentList) {
        var theStudents = studentList;
        $('#name').text(theStudents[currentStudent].name);
    }

    function loadUserInfo(studentList) {
        var theStudents = studentList;
        $('#gitName').text(theStudents[currentStudent].git_username);
    }

    function loadThankyou(studentList) {
        var theStudents = studentList;
        var shoutout = theStudents[currentStudent].shoutout;
        if (shoutout === "") {
            shoutout = "I couldnt think of anything, BUT IM PROBABLY STILL THANKFUL <3";
        }
        $('#tyText').text(shoutout);
    }


    //control student flow
    var currentStudent = 0;

    function nextStudent() {
        endInterval();
        startInterval();
        updateNavBar(currentStudent);
        currentStudent++;
        if (currentStudent == 17) {
            currentStudent = 0;
        }
        loadData();
        updateNavBar(currentStudent);

    }

    function prevStudent() {
        endInterval();
        startInterval();
        updateNavBar(currentStudent);
        currentStudent--;
        if (currentStudent == -1) {
            currentStudent = 16;
        }
        loadData();
        updateNavBar(currentStudent);
    }

    function chooseStudent(newStudent) {
        endInterval();
        startInterval();
        updateNavBar(currentStudent);
        currentStudent = newStudent;
        loadData();
        updateNavBar(currentStudent);

    }


});
