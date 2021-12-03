import { useState, useEffect } from 'react';

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
    weight:'',
    bloodtype:'Unknown',
    tos:''

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
  };




  const handleSubmit = e => {
    console.log(errors);
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      console.log(errors);
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default UseForm;