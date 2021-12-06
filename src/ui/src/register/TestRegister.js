import { useState, useEffect } from 'react';
import { gettUser } from "../js/ajax";
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
    bloodtype:'Unknown'

  });
  const [errors, setErrors] = useState({});
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
    console.log("Errors: " + errors);
    console.log("Values " + values);
    e.preventDefault();

    setErrors(validate(values));

    // TODO Validate with database.

    var json_vals = JSON.stringify(values);
    console.log("JSON  " + json_vals);

    var urlEnd = 'http://localhost:8080/WebApplication1/UserServlet';
    $.ajax({
        url: urlEnd,
        type: "POST",
        contentType: 'json',
        data: json_vals,
        success: function (result) {
            var json = JSON.parse(result)
            console.log("SUCCESS:  "+ json)
        },
        error: function (result) {
          var json = JSON.parse(result)
            console.log("FAIL:  "+ json)
        }
    });

    setIsSubmitting(true);
  };

  useEffect(
    () => {
      console.log(errors);
      console.log(values);
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors, setValues };
};

export default UseForm;



