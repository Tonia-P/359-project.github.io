import { useState, useEffect } from 'react';
import { gettUser } from "../js/ajax";

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
    birthday: '',
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
    var json_db = gettUser(json_vals);
    console.log("JSON DB " + json_db);
    console.log("JSON  " + json_vals);

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



