//adding the symbols to the calendar
//still in development

//IGNORE THIS script
var return_output = "";
function check_(input_date_){
    firebase.database().ref('assignments').on('value',function(snapshot){
        var data = snapshot.val();
        for (key in data){
            console.log(data+" "+data[key].date+" "+input_date_+(data[key].date == input_date_));
            if (data[key].date == input_date_){
                this.return_output = "<span class='glyphicon glyphicon-list-alt'></span>";
                console.log(this.return_output);
            }
        }
    });
    console.log("kevin"+this.return_output);
    firebase.database().ref('events').on('value',function(snapshot){
        var data = snapshot.val();
        for (key in data){
            if (data[key].date == input_date_){
                this.return_output = "<span class='glyphicon glyphicon-star'></span>";
            }
        }
    });
    console.log(this.return_output);
    return return_output;
}

//else
