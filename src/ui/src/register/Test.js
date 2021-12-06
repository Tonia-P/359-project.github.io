import { useState, useEffect } from 'react';
import $ from 'jquery'



const Test = () => {

    const [getto, setGetto ] = useState();


    useEffect(
        () => {
            var urlEnd = 'http://localhost:8080/WebApplication1/UserServlet';
            $.ajax({
                url: urlEnd,
                type: "GET",
                contentType: 'json',
                success: function (result) {
                    var json = JSON.parse(result)
                    setGetto(json);
                },
                error: function (result) {
                    setGetto(result);
                }
            });
        
        },
        []
      );


      const handleClick = () => {
          console.log(getto);

      }


    return (
        <>
        <div> End me. </div>

        <button onClick={handleClick} value= {getto}>Clck me </button>
      </>
    );
  }

  export default Test;