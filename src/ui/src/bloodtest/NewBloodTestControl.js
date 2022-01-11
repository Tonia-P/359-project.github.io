import { useState, useEffect } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';



const NewBloodTestControl = (callback) =>{

    const [ values, setValues ] = useState({
        AMKA: '',
        test_date: '',
        medical_center: '',
        blood_sugar: '',
        cholesterol: '',
        iron: '',
        vitamin_d3: '',
        vitamin_b12: ''
    })
  
    const [info, setInfo] = useState();

    const [ errors, setErrors ] = useState({
        AMKA: '',
        test_date: '',
        medical_center: '',

    })

    const [isSubmitting, setIsSubmitting] = useState(false);
      
      
        // Sets form data.
        const handleChange = e => {
          const { name, value } = e.target;
          setValues({
            ...values,
            [name]: value
          });
          console.log(values);
        };
      
        const handleSubmit = e => {
          console.log("Errors: ");
          console.log(errors)
          console.log("Values " );
          console.log(values)
          e.preventDefault();
  
  
      
          //setErrors(validate(values));
      
          // TODO Validate with database.
      
          var json_vals = JSON.stringify(values);
          //console.log("JSON  " + json_vals);
      
          var urlEnd = 'http://localhost:8080/WebApplication1/rest/newBloodTest';
          $.ajax({
              url: urlEnd,
              type: "POST",
              contentType: 'json',
              data: json_vals,
              success: function (result) {
                  const json = JSON.parse(result)
                  console.log(json);
                  setInfo(json)
                  console.log(info);
                  setErrors({})
              },
              error: function (result) {
                  console.log(result.responseText)
                  var json = JSON.parse(result.responseText)
                  console.log(json)
  
                  setErrors(json)
              }
          });
      
          setIsSubmitting(true);
        };
      
        useEffect(
          () => {
            console.log(errors);
            console.log(values);
            if (Object.keys(errors).length === 0 && isSubmitting) {
              callback(info);
              //navigate("/dashboard") 
            }
          },
          [errors]
        );
      
  
  
        return { handleChange, handleSubmit, values, errors, setValues };
  }
  
  export default NewBloodTestControl;