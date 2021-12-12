import { useState, useEffect } from 'react';
import $ from 'jquery'

const UseForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    usertype: '',
    doctype: '',
    moredoc: '',
    firstname:'',
    lastname: '',
    birthdate: '',
    gender:'',
    amka:'',
    country:'GR',
    city:'',
    address:'',
    phone:'',
    height:'',
    lon:'0',
    lat:'0',
    weight:'',
    blooddonor:'',
    bloodtype:'Unknown'

  });
  const [errors, setErrors] = useState({});
  const [ dberrors, setDBErrors ] = useState({
    error: '.'
  });
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
    e.preventDefault();

    setErrors(validate(values));

    // TODO Validate with database.

    var json_vals = JSON.stringify(values);
    console.log("JSON  " + json_vals);

    if(Object.keys(errors).length === 0){

      var urlEnd = 'http://localhost:8080/WebApplication1/RegisterUser';
      $.ajax({
          url: urlEnd,
          type: "POST",
          contentType: 'json',
          data: json_vals,
          success: function (result) {
            console.log("SUCCESS")
              const json = JSON.parse(result)
              console.log(json)
              setDBErrors({});
          },
          error: function (result) {
            console.log("FAIL")
            var json = JSON.parse(result.responseText)
            console.log(json)
            setDBErrors(json);
            console.log(dberrors)

          }
      });


    }
    else setDBErrors({ error: '.' })

    setIsSubmitting(true);
  };

  useEffect(
    () => {
      let isMounted = true; 
      console.log(errors);
      console.log(dberrors);
      console.log(values);
      console.log(isSubmitting)
      if (Object.keys(errors).length === 0 && Object.keys(dberrors).length === 0 && isSubmitting) {
        if (isMounted) callback(values);
      }
      return () => { isMounted = false };
    },
    [errors, dberrors]
  );

  return { handleChange, handleSubmit, values, errors, dberrors, setValues };
};

export default UseForm;



