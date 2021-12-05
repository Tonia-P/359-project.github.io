export default function validateInfo(values) {
    let errors = {};
  
    // Username
    if (!values.username.trim()) {
      errors.username = 'Username required';
    }
    else if (values.username.length < 8) {
      errors.password = 'Username needs to be 6 characters or more';
    }

    // E-mail
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    // Password
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password needs to be 8 characters or more';
    }
    else if (values.password.length > 15) {
      errors.password = 'Password needs to be less than 15 characters.';
    }
  
    // Confirm password
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Password is required';
    }
    else if (values.confirmPassword.length < 8) {
      errors.confirmPassword = 'Password needs to be 8 characters or more';
    }
    else if (values.confirmPassword.length > 15) {
      errors.confirmPassword = 'Password needs to be less than 15 characters.';
    }
     else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // First name
    if (values.firstname.length < 3) {
      errors.firstname = 'First name needs to be 8 characters or more';
    }
    else if (values.firstname.length > 30) {
      errors.firstname = 'First name needs to be less than 15 characters.';
    }

    // Last name
    if (values.lastname.length < 3) {
      errors.lastname = 'First name needs to be 8 characters or more';
    }
    else if (values.lastname.length > 30) {
      errors.lastname = 'First name needs to be less than 15 characters.';
    }

    // AMKA
    if (values.amka.length !== 11) {
      errors.amka = 'AMKA needs to be 11 characters long.';
    }

    // City
    if (values.city.length < 2) {
      errors.city = 'City name needs to be more than 2 characters';
    }
    else if (values.city.length > 50) {
      errors.city = 'City name needs to be less than 50 characters.';
    }

    // Address
    if (values.address.length < 2) {
      errors.address = 'address name needs to be more than 2 characters';
    }
    else if (values.address.length > 50) {
      errors.address = 'address name needs to be less than 50 characters.';
    }

    // Blood Type
    if (!values.bloodtype.trim()) {
      errors.bloodtype = 'Please select your blood type';
      console.log(values.bloodtype);
    }

    if(values.weight < 20 || values.weight > 300) errors.weight = 'Weight value must be between 20 and 300';
    if(values.height < 100 || values.height > 250) errors.height = 'Height value must be between 100 and 250';


    return errors;
  }