module.exports = (data) => {
  const level = data.value;

  switch (true) {
    case level < 10:
      return "pitchBlack"
    case level < 50:
      return "dark"
    case level < 400:
      return "dim"
    case level < 1000:
      return "normal"
    case level < 5000:
      return "bright";
    case level < 10000:
      return "cloudy"
    default:
      return "Sunny"


  }
}




// Lighting condition	From(lux)	To(lux)	Mean value(lux)	Lighting step
// Pitch Black	0	                10	          5	           1
// Very Dark	            11	    50	          30	          2
// Dark Indoors          	51	    200 	        125	        3
// Dim Indoors          	201	    400         	300	        4
// Normal Indoors       	401	    1000	        700     	    5
// Bright Indoors	        1001  	5000	        3000      	6
// Dim Outdoors	          5001  	10, 000	      7500          	7
// Cloudy Outdoors	      10,001	30, 000	      20, 000	    8
// Direct Sunlight	      30, 001 	100, 000	  65, 000	      9