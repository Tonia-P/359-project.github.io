/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import "./Register.css"
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { 
    Stack, 
    Button, 
    FormControl, 
    FormLabel, 
    FormHelperText,
    Input, 
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    Radio,
    HStack,
    RadioGroup,
    Select,
    Grid,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    Checkbox,
    Textarea
} from '@chakra-ui/react'
import UseForm from "./TestRegister";
import validateInfo from "./validation";
import { 
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet'

const RegisterForm = ({ submitForm }) => {


    // TODO:    
    //          Validations.
    //          Get address.
    //          login page


    // handles lit. everything that isn't here.
    const { handleChange, handleSubmit, values, errors, setValues } = UseForm(
        submitForm,
        validateInfo
    );
    const [mapReady, setMapReady] = useState(false);
    const [tosReady, setTosReady] = useState(false);
    
/*
    useEffect(() => {
        if(values.usertype === "Doctor"){
            setShowDoc(true);
        }
        else setShowDoc(false);
    }, [values.usertype])
*/

    const handleMapRequest = e =>{
        // GET request using fetch inside useEffect React hook
        handleChange(e);
        if(values.address) console.log(values.address);
        if(values.city) console.log(values.city)
        if(values.country) console.log(values.country)
        var tmp = null;

        if(values.address && values.city && values.country === "GR"){
            var sum = values.address + '+' + values.city + '+Greece' ;
            
            fetch("https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q="+
            sum +
            "&accept-language=en&polygon_threshold=0.0", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
                    "x-rapidapi-key": "36fc04be0cmsh6b954fe89f7caa4p174e39jsn1c14d11d8a9f"
                }

            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
                tmp = data;
                console.log(tmp);

                if(!tmp.length){
                    setMapReady(false);
                    // Error, address does not exist.
                }
                else{
                    var names = tmp[0].display_name.split(',');
                    var flag = 0;
                    console.log(names.length);
                    for(let i = 0; i < names.length; i++){
                        console.log(names[i]);
                        if(names[i] === "Crete" || names[i] === " Region of Crete"){  
                            flag = 1;
                        }
                    }
                    console.log("Flag: "+ flag);
                    if(flag === 0){
                        // Error, not in Crete.
                        alert("Not in Crete.");
                        setMapReady(false);
                        return;
                    }
                    setLat(tmp[0].lat);
                    setLon(tmp[0].lon);
                    setMapReady(true);

                }
                    
            })
            .catch((error) => {
              console.error('Error:', error);
              setMapReady(false);
            });
        }



    
     

    }


    const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
            
          
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
    
      const showPosition = (position) => {
          console.log(position);
        setLon(position.coords.longitude);
            setLat(position.coords.latitude);
            console.log(lon + "    " + lat);
            setValues([{ address: "kappa" }]);
            console.log(values.address)
      }
      
    
    const [showPass, setShowPass] = useState(false)
    const handlePassword = () => setShowPass(!showPass);

    // Showing extra fields for when user is doctor.
    const [showDoc, setShowDoc] = useState(false)
    const handleDoc = () => setShowDoc(!showDoc);
    const handleTos = () => setTosReady(!tosReady);

    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [showMap, setShowMap] = useState('')
    const handleMap = () => {
        setShowMap(!showMap);
    }


    return (
        <form method= "POST" onSubmit={handleSubmit} noValidate>

            <Stack maxWidth= {1000} margin= "auto" spacing={7} marginTop= {5}>
            <FormControl isRequired id= "username" isInvalid={errors.username}>
                <FormLabel>Username</FormLabel>
                <Input 
                    type= "text" 
                    name= "username"
                    autoComplete= "on"
                    value= {values.username}
                    onChange= {handleChange} 
                    placeholder= "Username"
                    minLength="8"
                    />
                <FormHelperText>Please enter an username of at least 8 characters.</FormHelperText>
                <FormErrorMessage >{errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired id= "email" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input 
                    type= "email" 
                    name= "email"
                    autoComplete= "on"
                    value= {values.email}
                    onChange= {handleChange} 
                    placeholder= "E-mail"
                    />
                <FormHelperText>We'll never share your email. Kappa</FormHelperText>
                <FormErrorMessage >{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired id= "password" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input 
                    type={showPass ? 'text' : 'password'}
                    name= "password"
                    autoComplete= "off"
                    value= {values.password}
                    onChange= {handleChange} 
                    placeholder= "Password"
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handlePassword}>
                          {showPass ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage >{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired id= "confirmPassword" isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input 
                    type= "password" 
                    name= "confirmPassword"
                    
                    autoComplete= "off"
                    value= {values.confirmPassword}
                    onChange= {handleChange} 
                    placeholder= "Password"
                    />
                <FormErrorMessage >{errors.confirmpassword}</FormErrorMessage>
            </FormControl>




            <FormControl>
                <FormLabel>User Type</FormLabel>
                <RadioGroup 
                    defaultValue='Default User' 
                    name= "usertype"
                    onChange= {handleDoc}
                    id= "usertype">
                    <HStack spacing='24px'>
                        <Radio colorScheme= 'teal' value='Default User' onChange={handleChange}>Default User</Radio>
                        <Radio colorScheme= 'teal' value='Doctor' onChange={handleChange}>Doctor</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText></FormHelperText>
            </FormControl>

            {showDoc && 
            <Stack maxWidth= {1000} margin= "auto" spacing={7} marginTop= {0}>
            <FormControl >
                <FormLabel>Doctor Type</FormLabel>
                <RadioGroup 
                    defaultValue='General Doctor'
                    name="speciality">
                    <HStack spacing='24px'>
                        <Radio colorScheme= 'teal' onChange={handleChange} value='General Doctor'>General Doctor</Radio>
                        <Radio colorScheme= 'teal' onChange={handleChange} value='Pathologist'>Pathologist</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText></FormHelperText>
            </FormControl>


            <FormControl id="moredoc">
                <FormLabel>More info about doctor</FormLabel>
                <Textarea 
                    placeholder='Write info here'
                    name= "doctor_info"
                    value= "doctor_info"
                    onChange= {handleChange}
                    autoComplete= "off"

                />
            </FormControl>
            </Stack>
            }

            <FormControl isRequired id= "firstname" isInvalid={errors.firstname}>
                <FormLabel>First Name</FormLabel>
                <Input 
                    type= "text" 
                    name= "firstname"
                    autoComplete= "on"
                    value= {values.firstname}
                    onChange= {handleChange} 
                    placeholder= "First name"
                    minLength="3"
                    maxLength= "30"
                    />
                <FormHelperText></FormHelperText>
                <FormErrorMessage >{errors.firstname}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired id= "lastname" isInvalid={errors.lastname}>
                <FormLabel>Last Name</FormLabel>
                <Input 
                    type= "text" 
                    name= "lastname"
                    autoComplete= "on"
                    value= {values.lastname}
                    onChange= {handleChange} 
                    placeholder= "Last name"
                    minLength="3"
                    maxLength= "30"
                    />-
                <FormHelperText></FormHelperText>
                <FormErrorMessage >{errors.lastname}</FormErrorMessage>
            </FormControl>


            <FormControl isRequired id= "birthday" isInvalid={errors.birthday}>
                <FormLabel>Birthday</FormLabel>
                <Input 
                    type= "date" 
                    name= "birthday"
                    autoComplete= "on"
                    value= {values.birthday}
                    onChange= {handleChange} 
                    placeholder= "birthday"
                    minLength="3"
                    maxLength= "30"
                    />
                <FormHelperText></FormHelperText>
            </FormControl>


            <FormControl isRequired id= "gender" isInvalid={errors.gender}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup 
                    defaultValue='male'
                    name= "gender"
                    >
                    <HStack spacing='24px'>
                        <Radio colorScheme= 'teal' onChange= {handleChange} value='male'>Male</Radio>
                        <Radio colorScheme= 'teal' onChange= {handleChange} value='female'>Female</Radio>
                        <Radio colorScheme= 'teal' onChange= {handleChange} value='other'>Other</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText></FormHelperText>
            </FormControl>


            <FormControl isRequired id= "amka" isInvalid={errors.amka}>
                <FormLabel>AMKA</FormLabel>
                <Input 
                    type= "text" 
                    name= "amka"
                    autoComplete= "on"
                    value= {values.amka}
                    onChange= {handleChange} 
                    placeholder= "AMKA"
                    minLength="8"
                    />
                <FormHelperText>First 8 numbers must be same with birthday(DD/MM/YYY).</FormHelperText>
                <FormErrorMessage >{errors.amka}</FormErrorMessage>
            </FormControl>

            <FormControl id= 'country'>
                <FormLabel>Country</FormLabel>
                <Select 
                    onChange={handleChange}
                    onBlur={handleMapRequest}
                    placeholder='Country' 
                    name= "country" 
                    value={values.country}
                >
                <option value="AF">Afghanistan</option>
				<option value="AX">Åland Islands</option>
				<option value="AL">Albania</option>
				<option value="DZ">Algeria</option>
				<option value="AS">American Samoa</option>
				<option value="AD">Andorra</option>
				<option value="AO">Angola</option>
				<option value="AI">Anguilla</option>
				<option value="AQ">Antarctica</option>
				<option value="AG">Antigua and Barbuda</option>
				<option value="AR">Argentina</option>
				<option value="AM">Armenia</option>
				<option value="AW">Aruba</option>
				<option value="AU">Australia</option>
				<option value="AT">Austria</option>
				<option value="AZ">Azerbaijan</option>
				<option value="BS">Bahamas</option>
				<option value="BH">Bahrain</option>
				<option value="BD">Bangladesh</option>
				<option value="BB">Barbados</option>
				<option value="BY">Belarus</option>
				<option value="BE">Belgium</option>
				<option value="BZ">Belize</option>
				<option value="BJ">Benin</option>
				<option value="BM">Bermuda</option>
				<option value="BT">Bhutan</option>
				<option value="BO">Bolivia, Plurinational State of</option>
				<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
				<option value="BA">Bosnia and Herzegovina</option>
				<option value="BW">Botswana</option>
				<option value="BV">Bouvet Island</option>
				<option value="BR">Brazil</option>
				<option value="IO">British Indian Ocean Territory</option>
				<option value="BN">Brunei Darussalam</option>
				<option value="BG">Bulgaria</option>
				<option value="BF">Burkina Faso</option>
				<option value="BI">Burundi</option>
				<option value="KH">Cambodia</option>
				<option value="CM">Cameroon</option>
				<option value="CA">Canada</option>
				<option value="CV">Cape Verde</option>
				<option value="KY">Cayman Islands</option>
				<option value="CF">Central African Republic</option>
				<option value="TD">Chad</option>
				<option value="CL">Chile</option>
				<option value="CN">China</option>
				<option value="CX">Christmas Island</option>
				<option value="CC">Cocos (Keeling) Islands</option>
				<option value="CO">Colombia</option>
				<option value="KM">Comoros</option>
				<option value="CG">Congo</option>
				<option value="CD">Congo, the Democratic Republic of the</option>
				<option value="CK">Cook Islands</option>
				<option value="CR">Costa Rica</option>
				<option value="CI">Côte d'Ivoire</option>
				<option value="HR">Croatia</option>
				<option value="CU">Cuba</option>
				<option value="CW">Curaçao</option>
				<option value="CY">Cyprus</option>
				<option value="CZ">Czech Republic</option>
				<option value="DK">Denmark</option>
				<option value="DJ">Djibouti</option>
				<option value="DM">Dominica</option>
				<option value="DO">Dominican Republic</option>
				<option value="EC">Ecuador</option>
				<option value="EG">Egypt</option>
				<option value="SV">El Salvador</option>
				<option value="GQ">Equatorial Guinea</option>
				<option value="ER">Eritrea</option>
				<option value="EE">Estonia</option>
				<option value="ET">Ethiopia</option>
				<option value="FK">Falkland Islands (Malvinas)</option>
				<option value="FO">Faroe Islands</option>
				<option value="FJ">Fiji</option>
				<option value="FI">Finland</option>
				<option value="FR">France</option>
				<option value="GF">French Guiana</option>
				<option value="PF">French Polynesia</option>
				<option value="TF">French Southern Territories</option>
				<option value="GA">Gabon</option>
				<option value="GM">Gambia</option>
				<option value="GE">Georgia</option>
				<option value="DE">Germany</option>
				<option value="GH">Ghana</option>
				<option value="GI">Gibraltar</option>
				<option value="GR">Greece</option>
				<option value="GL">Greenland</option>
				<option value="GD">Grenada</option>
				<option value="GP">Guadeloupe</option>
				<option value="GU">Guam</option>
				<option value="GT">Guatemala</option>
				<option value="GG">Guernsey</option>
				<option value="GN">Guinea</option>
				<option value="GW">Guinea-Bissau</option>
				<option value="GY">Guyana</option>
				<option value="HT">Haiti</option>
				<option value="HM">Heard Island and McDonald Islands</option>
				<option value="VA">Holy See (Vatican City State)</option>
				<option value="HN">Honduras</option>
				<option value="HK">Hong Kong</option>
				<option value="HU">Hungary</option>
				<option value="IS">Iceland</option>
				<option value="IN">India</option>
				<option value="ID">Indonesia</option>
				<option value="IR">Iran, Islamic Republic of</option>
				<option value="IQ">Iraq</option>
				<option value="IE">Ireland</option>
				<option value="IM">Isle of Man</option>
				<option value="IL">Israel</option>
				<option value="IT">Italy</option>
				<option value="JM">Jamaica</option>
				<option value="JP">Japan</option>
				<option value="JE">Jersey</option>
				<option value="JO">Jordan</option>
				<option value="KZ">Kazakhstan</option>
				<option value="KE">Kenya</option>
				<option value="KI">Kiribati</option>
				<option value="KP">Korea, Democratic People's Republic of</option>
				<option value="KR">Korea, Republic of</option>
				<option value="KW">Kuwait</option>
				<option value="KG">Kyrgyzstan</option>
				<option value="LA">Lao People's Democratic Republic</option>
				<option value="LV">Latvia</option>
				<option value="LB">Lebanon</option>
				<option value="LS">Lesotho</option>
				<option value="LR">Liberia</option>
				<option value="LY">Libya</option>
				<option value="LI">Liechtenstein</option>
				<option value="LT">Lithuania</option>
				<option value="LU">Luxembourg</option>
				<option value="MO">Macao</option>
				<option value="MK">Macedonia, the former Yugoslav Republic of</option>
				<option value="MG">Madagascar</option>
				<option value="MW">Malawi</option>
				<option value="MY">Malaysia</option>
				<option value="MV">Maldives</option>
				<option value="ML">Mali</option>
				<option value="MT">Malta</option>
				<option value="MH">Marshall Islands</option>
				<option value="MQ">Martinique</option>
				<option value="MR">Mauritania</option>
				<option value="MU">Mauritius</option>
				<option value="YT">Mayotte</option>
				<option value="MX">Mexico</option>
				<option value="FM">Micronesia, Federated States of</option>
				<option value="MD">Moldova, Republic of</option>
				<option value="MC">Monaco</option>
				<option value="MN">Mongolia</option>
				<option value="ME">Montenegro</option>
				<option value="MS">Montserrat</option>
				<option value="MA">Morocco</option>
				<option value="MZ">Mozambique</option>
				<option value="MM">Myanmar</option>
				<option value="NA">Namibia</option>
				<option value="NR">Nauru</option>
				<option value="NP">Nepal</option>
				<option value="NL">Netherlands</option>
				<option value="NC">New Caledonia</option>
				<option value="NZ">New Zealand</option>
				<option value="NI">Nicaragua</option>
				<option value="NE">Niger</option>
				<option value="NG">Nigeria</option>
				<option value="NU">Niue</option>
				<option value="NF">Norfolk Island</option>
				<option value="MP">Northern Mariana Islands</option>
				<option value="NO">Norway</option>
				<option value="OM">Oman</option>
				<option value="PK">Pakistan</option>
				<option value="PW">Palau</option>
				<option value="PS">Palestinian Territory, Occupied</option>
				<option value="PA">Panama</option>
				<option value="PG">Papua New Guinea</option>
				<option value="PY">Paraguay</option>
				<option value="PE">Peru</option>
				<option value="PH">Philippines</option>
				<option value="PN">Pitcairn</option>
				<option value="PL">Poland</option>
				<option value="PT">Portugal</option>
				<option value="PR">Puerto Rico</option>
				<option value="QA">Qatar</option>
				<option value="RE">Réunion</option>
				<option value="RO">Romania</option>
				<option value="RU">Russian Federation</option>
				<option value="RW">Rwanda</option>
				<option value="BL">Saint Barthélemy</option>
				<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
				<option value="KN">Saint Kitts and Nevis</option>
				<option value="LC">Saint Lucia</option>
				<option value="MF">Saint Martin (French part)</option>
				<option value="PM">Saint Pierre and Miquelon</option>
				<option value="VC">Saint Vincent and the Grenadines</option>
				<option value="WS">Samoa</option>
				<option value="SM">San Marino</option>
				<option value="ST">Sao Tome and Principe</option>
				<option value="SA">Saudi Arabia</option>
				<option value="SN">Senegal</option>
				<option value="RS">Serbia</option>
				<option value="SC">Seychelles</option>
				<option value="SL">Sierra Leone</option>
				<option value="SG">Singapore</option>
				<option value="SX">Sint Maarten (Dutch part)</option>
				<option value="SK">Slovakia</option>
				<option value="SI">Slovenia</option>
				<option value="SB">Solomon Islands</option>
				<option value="SO">Somalia</option>
				<option value="ZA">South Africa</option>
				<option value="GS">South Georgia and the South Sandwich Islands</option>
				<option value="SS">South Sudan</option>
				<option value="ES">Spain</option>
				<option value="LK">Sri Lanka</option>
				<option value="SD">Sudan</option>
				<option value="SR">Suriname</option>
				<option value="SJ">Svalbard and Jan Mayen</option>
				<option value="SZ">Swaziland</option>
				<option value="SE">Sweden</option>
				<option value="CH">Switzerland</option>
				<option value="SY">Syrian Arab Republic</option>
				<option value="TW">Taiwan, Province of China</option>
				<option value="TJ">Tajikistan</option>
				<option value="TZ">Tanzania, United Republic of</option>
				<option value="TH">Thailand</option>
				<option value="TL">Timor-Leste</option>
				<option value="TG">Togo</option>
				<option value="TK">Tokelau</option>
				<option value="TO">Tonga</option>
				<option value="TT">Trinidad and Tobago</option>
				<option value="TN">Tunisia</option>
				<option value="TR">Turkey</option>
				<option value="TM">Turkmenistan</option>
				<option value="TC">Turks and Caicos Islands</option>
				<option value="TV">Tuvalu</option>
				<option value="UG">Uganda</option>
				<option value="UA">Ukraine</option>
				<option value="AE">United Arab Emirates</option>
				<option value="GB">United Kingdom</option>
				<option value="US">United States</option>
				<option value="UM">United States Minor Outlying Islands</option>
				<option value="UY">Uruguay</option>
				<option value="UZ">Uzbekistan</option>
				<option value="VU">Vanuatu</option>
				<option value="VE">Venezuela, Bolivarian Republic of</option>
				<option value="VN">Viet Nam</option>
				<option value="VG">Virgin Islands, British</option>
				<option value="VI">Virgin Islands, U.S.</option>
				<option value="WF">Wallis and Futuna</option>
				<option value="EH">Western Sahara</option>
				<option value="YE">Yemen</option>
				<option value="ZM">Zambia</option>
				<option value="ZW">Zimbabwe</option>
                </Select>
            </FormControl>



            <FormControl isRequired id= "city" isInvalid={errors.city}>
                <FormLabel>City</FormLabel>
                <Input 
                    type= "text" 
                    name= "city"
                    autoComplete= "on"
                    value= {values.city}
                    onChange= {handleChange} 
                    onBlur={handleMapRequest}
                    placeholder= "City"
                    minLength="8"
                    />
                <FormHelperText>We won't share with anyone. Promise!</FormHelperText>
                <FormErrorMessage >{errors.city}</FormErrorMessage>
            </FormControl>


            <FormControl isRequired id= "address" isInvalid={errors.address}>
                {showDoc ? <FormLabel>Hospital Address</FormLabel> : <FormLabel>Address</FormLabel>}
                <Input 
                    type= "text" 
                    name= "address"
                    autoComplete= "on"
                    value= {values.address}
                    onChange= {handleChange} 
                    onBlur={handleMapRequest}
                    placeholder= "Address"
                    minLength="8"
                    />
                <FormHelperText>We won't share with anyone. Promise!</FormHelperText>
                <FormErrorMessage >{errors.address}</FormErrorMessage>
            </FormControl>

            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                {mapReady ?
            <Button
                mt = {4}
                colorScheme="teal"
                onClick={handleMap}
                
            >
                Show on map
            </Button>
            :
            <Button
                mt = {4}
                colorScheme="teal"
                onClick={handleMap}
                isDisabled
                
            >
                Show on map
            </Button>
            }
            <Button
                mt = {4}
                colorScheme="teal"
                onClick={getLocation}
            >
                Get address
            </Button>
            </Grid>
            

            {showMap &&
                <MapContainer 
                    center={[lat,lon]} 
                    zoom={13} 
                    scrollWheelZoom={true}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat,lon]}>
                      <Popup>
                        If you live here, you gei.
                      </Popup>
                    </Marker>
                </MapContainer>
            }



            <FormControl isRequired id= "phone" isInvalid={errors.phone}>
                <FormLabel>Phone number</FormLabel>
                <Input 
                    type= "text" 
                    name= "phone"
                    autoComplete= "on"
                    value= {values.phone}
                    onChange= {handleChange} 
                    placeholder= "Phone"
                    minLength="14"
                    maxLength="14"
                    />
                <FormHelperText>Please enter your phone number.</FormHelperText>
                <FormErrorMessage >{errors.phone}</FormErrorMessage>
            </FormControl>

            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                <FormControl id='height'>
                  <FormLabel>Height</FormLabel>
                  <NumberInput min={100} max={250} >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormHelperText>In cm</FormHelperText>
                </FormControl>


                <FormControl id='weight'>
                  <FormLabel>Weight</FormLabel>
                  <NumberInput min={20} max={300}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormHelperText>In kilos</FormHelperText>
                </FormControl>
            </Grid>

            <FormControl>
                <FormLabel>Blood donor</FormLabel>
                <RadioGroup 
                    defaultValue='0' 
                    onChange={handleChange}
                >
                    <HStack spacing='24px'>
                        <Radio colorScheme= 'teal' value='1'>Yes</Radio>
                        <Radio colorScheme= 'teal' value='0'>No</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText></FormHelperText>
            </FormControl>


            <FormControl 
                isRequired
                name= 'bloodtype'
                onChange= {handleChange}
                value= {values.bloodtype}
            >
                <FormLabel>Blood type</FormLabel>
                <Select placeholder='Select option'>
                  <option value='A+'>A+</option>
                  <option value='A-'>A-</option>
                  <option value='B+'>B+</option>
                  <option value='B-'>B-</option>
                  <option value='AB+'>AB</option>
                  <option value='AB-'>AB</option>
                  <option value='0+'>0+</option>
                  <option value='0-'>0-</option>
                  <option value='unknown'>Unknown</option>
                </Select>
            </FormControl>


            <Checkbox id="tos" onChange= {handleTos} colorScheme='teal'>I agree to Terms of Service.</Checkbox>
  


            {tosReady ? 
            <Button
                mt={2}
                colorScheme="teal"
                type="submit"
            >
                Submit
            </Button>

            :
            <Button
                mt={2}
                colorScheme="teal"
                type="submit"
                isDisabled
            >
                Submit
            </Button>
}

        </Stack>
        </form>
    );

};


export default RegisterForm;