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
	if (hour > 12) // convert 24 hour clock to 12 hour clock
		hour = hour % 12;
    var minutes = dateObj.getMinutes();
	if (minutes < 10) // pad with a zero
		minutes = "0" + minutes;
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
        answer += "<div class='chat_list " + className + "'>";
        answer += "<div class='chat_people'>";
        answer += "<a href='#" + this.patientData['pid'] + "' class='clearfix'>";
        answer += "<div class='chat_img'>";
        answer += "<svg class='bi bi-people-circle' width='2em' height='2em' viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'>";
        answer += "<path d='M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z'/>";
        answer += "<path fill-rule='evenodd' d='M8 9a3 3 0 100-6 3 3 0 000 6z' clip-rule='evenodd'/>";
        answer += "<path fill-rule='evenodd' d='M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z' clip-rule='evenodd'/>";
        answer += "</svg> </div>";
        answer += "<div class='chat_ib'>";
        answer += "<h5>" + displayName + "</h5>";
        answer += "</div></a></div></div>";

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

        var listClass = message['from_patient'] ? "incoming_msg" : "outgoing_msg";
        var fromName = message['from_patient'] ? displayName : "Me";
        var prettyDate = getPrettyStringForDateObj(message['time_sent']);
        var messageContent = message['message'];

        answer += "<div class='"+ listClass + "'>";
        if(fromName == "Me"){
            answer += "<div class='sent_msg'>";
            answer += "<p>" + messageContent + "</p>";
            answer += "<span class='time_date'>" + prettyDate + "</span> </div>";
        }else{
            answer += "<div class='received_withd_msg'>"
            answer += "<p>" + messageContent + "</p>";
            answer += "<span class='time_date'>" + prettyDate + "</span> </div></div>";
        }
        answer += "</div>";

        return answer;
    }

}
