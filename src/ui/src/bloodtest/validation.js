import { FaYoutubeSquare } from "react-icons/fa";

function validateDate(date){

    // Today date
    var today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    document.write(today);


    //Slice dates
    //var amka = document.getElementById("AMKA");
    //var amka_sliced = amka.value.slice(0,8);

    //var bday = document.getElementById("birthday");
    var date_formatted = date.replace(/-/g, "");
    //var date_formatted = date_formatted.replace(/(\d{4})(\d{2})(\d{2})/,"$3$2$1");

    var today_formatted = today.replace(/-/g, "");
    //var today_formatted = today_formatted.replace(/(\d{4})(\d{2})(\d{2})/,"$3$2$1");

    //console.log(amka.value);
    //console.log(amka_sliced);
    //console.log(bday.value);
    //console.log(bday_formatted);


    return (today_formatted < date_formatted);


}


export default function validateBloodTest(values) {
    let errors = {};

    //Metriseis

    if(!values.iron.trim() && !values.vitamin_d3.trim() && !values.vitamin_b12.trim() && !values.cholesterol.trim() && !values.blood_sugar.trim()){
        errors.vitamins = 'There needs to be at least one result filled.'
    }

    // Test date 

    if(!values.test_date){
        errors.test_date = 'Date is required.';
    }
    else if(!validateDate(values.test_date)){
        errors.test_date = 'You can\'t add results for the future...';
    }

    // Meidcal center

    if(!values.medical_center){
        errors.medical_center = 'This field is required.';
    }

    return errors;
  }