function sortMessagesByTime(messageData) {
    messageData.sort(function(a, b) {
        return a['time_sent'] - b['time_sent'];
    })
}

/**
    * Takes in MySQL UTC timestamp string
    * * Converts to local time
    * Returns Javascript Date Object
    */
function convertSqlTimestampToLocalObject(timestamp) {
    // string modifications
    timestamp = timestamp.replace("T", " ");
    timestamp = timestamp.substring(0, timestamp.length - 5);
    // split into year, month, day, etc
    var t = timestamp.split(/[- :]/);
    // create the date objects
    var date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    return date;
}

function getPrettyStringForDateObj(dateObj) {
    var daysArr = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var hour = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var suffix = dateObj.getHours() < 12 ? "am" : "pm";
    if (isToday(dateObj))
      return "Today at " + hour + ":" + minutes + suffix;
    var day = daysArr[dateObj.getDay()];
    var dayOfMonth = dateObj.getDate();
    var month = monthArr[dateObj.getMonth()];
    var year = dateObj.getYear() + 1900;
    return day + " " + month + " " + dayOfMonth + " " + year + " at " + hour + ":" + minutes + suffix;
}

function isToday(someDate) {
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear();
  }


function PatientMessageStream(patientData) {

    this.messageData = undefined;
    this.patientData = patientData;

    var displayName = this.patientData['first_name'] + " " + this.patientData['last_name'];
    
    this.getMessageData = function() {
        var thisBinding = this;
        return $.get({
            url: '/patient_messages',
            data: { "pid": patientData['pid'] },
            success: function(response) {
                if (response.success == true) {
                    thisBinding.messageData = response.results;
                    thisBinding.setMessageTimes();
                    sortMessagesByTime(thisBinding.messageData);
                }
                else
                    console.log(response.errorMessage);
            }
          })
    }

    this.setMessageTimes = function() {
        for (var i = 0; i < this.messageData.length; i++) {
          var timeString = this.messageData[i]['time_sent'];
          var timeObj = convertSqlTimestampToLocalObject(timeString);
          this.messageData[i]['time_sent'] = timeObj;
        }
      }

    this.getPatientData = function() {
        return patientData;
    }

    this.getLastMessageTimestamp = function() {
        if (this.messageData.length == 0)
            return new Date(0);
        return this.messageData[this.messageData.length - 1]['time_sent'];
    }

    this.toHtml = function() {
        var answer = "";
        var className = "patient patient-" + this.patientData['pid'];
        answer += "<li class='" + className + "'>";
        answer += "<a href='#" + this.patientData['pid'] + "' class='clearfix'>";
        answer += "<img src='https://bootdey.com/img/Content/user_1.jpg' alt='' class='img-circle'>";
        answer += "<div class='friend-name'>";
        answer += "<strong>" + displayName + "</strong>";
        answer += "</div></a></li>";
        return answer;
    }

    this.getChatHtml = function() {
        if (this.messageData.length == 0)
            return "<small><i>No messages yet</i><small>"
        var answer = "";
        for (var i = 0; i < this.messageData.length; i++) {
            var currentMessage = this.messageData[i];
            answer += this.getMessageAsHtml(currentMessage);
        }
        return answer;
    }

    this.getMessageAsHtml = function(message) {
        var answer = "";

        var listClass = message['from_patient'] ? "message left clearfix" : "message right clearfix";
        var fromName = message['from_patient'] ? displayName : "Me";
        var prettyDate = getPrettyStringForDateObj(message['time_sent']);
        var messageContent = message['message'];

        answer += "<li class='" + listClass + "'>";
        answer += "<div class='chat-body clearfix'>";
        answer += "<div class='header'>";
        answer += "<strong class='primary-font'>" + fromName + "</strong>";
        answer += "<small class='pull-right text-muted'>" + prettyDate + "</small>";
        answer += "</div>";
        answer += "<p>" + messageContent + "</p>";
        answer += "</div></li>";
        return answer;
    }

}