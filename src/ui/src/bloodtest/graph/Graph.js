import React, { useState, useEffect, useContext, useRef } from 'react';
import {
    Text,
    Spinner,
    Box,
    FormControl,
    FormLabel,
    Divider,
    Input,
    Button,
    HStack,
    Grid
  } from '@chakra-ui/react';
  import { UserContext } from '../../contexts/UserContext';
  import annotationPlugin from 'chartjs-plugin-annotation';

  import dayjs from 'dayjs';
  import $, { nodeName } from 'jquery';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';


  
const Graph = ({ amka }) => {

  const [ allPatients, setAllPatients ] = useState([])
  const [ values, setValues ] = useState()
  const { userInfo } = useContext(UserContext);

  const chartRef = useRef();


  const [ dataset, setDataset ] = useState()
  const annotations = {
    blood_sugar: {
      annotations: {
        green: {
          type: 'box',
          yMin: 70,
          yMax: 110,
          borderWidth: 0,
          backgroundColor: 'rgba(72, 187, 120, 0.2)'
        }
      }
    },

    iron: {
      annotations: {
        green: {
          type: 'box',
          yMin: 0,
          yMax: 200,
          borderWidth: 0,
          backgroundColor: 'rgba(72, 187, 120, 0.2)'
        }
      }
    },

    cholesterol: {
      annotations: {
        green: {
          type: 'box',
          yMin: 60,
          yMax: 150,
          borderWidth: 0,
          backgroundColor: 'rgba(72, 187, 120, 0.2)'
        }
      }
    },

    vitamin_d3: {
      annotations: {
        green: {
          type: 'box',
          yMin: 30,
          yMax: 149,
          borderWidth: 0,
          backgroundColor: 'rgba(72, 187, 120, 0.2)'
        }
      }
    },

    vitamin_b12: {
      annotations: {
        green: {
          type: 'box',
          yMin: 160,
          yMax: 925,
          borderWidth: 0,
          backgroundColor: 'rgba(72, 187, 120, 0.2)'
        }
      }
    },
  }
  


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
  );

  useEffect(() => {
    var json_vals = JSON.stringify(amka);
    console.log(amka)
    
        var urlEnd = 'http://localhost:8080/WebApplication1/AmkaToBloodtests';
        $.ajax({
            url: urlEnd,
            type: "POST",
            contentType: 'json',
            data: json_vals,
            success: function (result) {
              console.log("Success");
                const json = JSON.parse(result)
                console.log(json)

                setValues(json)
                
            },
            error: function (result) {
                console.log(result.responseText)
                var json = JSON.parse(result.responseText)
                console.log(json)

            }
        });
  }, []);


  useEffect(() => {

    if(values){
      makeData();
    }
    
  }, [values]);

  const [options, setOptions ]  = useState({
    responsive: true,
    plugins: {
      drawTime: 'beforeDraw',
      
      
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
      
    },
  })



  const makeData = () => {
    const labels = values.map( value => { return value.test_date})

    const data = {
      labels,
      datasets: [{
        label: 'Blood Sugar',
        backgroundColor: '#C6F6D5',
        borderColor: '#38A169',
        data: values.map( value => { return value.blood_sugar}),
      },
      {
        label: 'Iron',
        backgroundColor: '#FC8181',
        borderColor: '#F56565',
        data: values.map( value => { return value.iron}),
      },
      {
        label: 'Cholesterol',
        backgroundColor: '#F6AD55',
        borderColor: '#ED8936',
        data: values.map( value => { return value.cholesterol}),
      },
      {
        label: 'Vitamin D3',
        backgroundColor: '#90CDF4',
        borderColor: '#4299E1',
        data: values.map( value => { return value.vitamin_d3}),
      },
      {
        label: 'Vitamin B12',
        backgroundColor: '#FBB6CE',
        borderColor: '#ED64A6',
        data: values.map( value => { return value.vitamin_b12}),
      }]
      
    };

    setDataset(data);
    

    console.log(data)
  }

  useEffect(() => {
    console.log(dataset)
    
  }, [dataset]);
  

  const changeData = (name, color) =>{
    const labels = values.map( value => { return value.test_date})

    var tmp = options

    tmp.plugins.annotation = annotations[name];

    setOptions(tmp)

    const data = {
      labels,
      datasets: [{
        label: name,
        backgroundColor: color,
        borderColor: color,
        data: values.map( value => { return value[name]}),
        fillColor: color
      }]
      
    };

    setDataset(data);
    console.log('options')
    console.log(options)

    
  }
  


    return (

        <Box background='gray.900' py={5} h='400px' maxW='700px' minW='500px' borderRadius='5' overflow='hidden'>
            Chart here
            <HStack>
              <Button onClick={() => {changeData('blood_sugar','#38A169')
                                      chartRef.current.update();}} colorScheme='green' >Blood sugar</Button>
              <Button onClick={() => {changeData('iron','#FC8181')
                                      chartRef.current.update();}} colorScheme='red' >Iron</Button>
              <Button onClick={() => {changeData('cholesterol','#F6AD55')
                                      chartRef.current.update();}} colorScheme='orange' >Cholesterol</Button>
              <Button onClick={() => {changeData('vitamin_d3','#90CDF4')
                                      chartRef.current.update();}} colorScheme='blue' >Vitamin D3</Button>
              <Button onClick={() => {changeData('vitamin_b12','#FBB6CE')
                                      chartRef.current.update();}} colorScheme='pink' >Vitamin B12</Button>
            </HStack>
            {dataset && <Line options={options} ref={chartRef} data={dataset} />}
        </Box>
   

    );
};
  
  export default Graph;