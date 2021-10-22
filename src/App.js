
import './App.css';
import React, {useState, useEffect} from 'react'
import * as yup from 'yup';
import axios from "axios";
import Results from './components/Results'



function App(props) {
  const [formState, setFormState] = useState({
  name: "",
  category: "",
  deadline: "",
  goal: "",
  date: "",
  pledged: "",
  country: "",
  currency:""
  });

  const [errors, setErrors] = useState({
  name: "",
  category: "",
  deadline: "",
  goal: "",
  date: "",
  pledged: "",
  country: "" ,
  currency:""   
  });
  const [data, setData] = useState("")

  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);


  const getData = () => {
    axios.get('https://kickstarter-success-ft.herokuapp.com/predict').then((response)=> {
      console.log(response)
      setData(response.data.country)
      // setData(response.data.prediction)
    })
  }

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    category: yup.string().required("Must include Kickstarter category."),
    deadline: yup.string().required("Must include deadline."),
    goal: yup.string().required("Must include goal amount."),
    date: yup.string().required("Must include date."),
    pledged: yup.string().required("Must include pledged amount."),
    country: yup.string().required("Must include country."),
    currency: yup.string()
    });
  
    const [buttonDisabled, setButtonDisabled] = useState(true);
  
    const [post, setPost] = useState([]);
  
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
          });
        }, [formState]);
    
    const inputChange = e => {
        e.persist();
        const newFormData = {
        ...formState,
        [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
  
        validateChange(e);
        setFormState(newFormData);
        };
  
    const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrors({
            ...errors,
            [e.target.name]: ""
            });
        })
        .catch(err => {
            setErrors({
            ...errors,
            [e.target.name]: err.errors[0]
            });
        });
    };
  

    const formSubmit = e => {
      e.preventDefault();
      axios
      // .post(formState)
      .post("https://kickstarter-success-ft.herokuapp.com/predict", formState)
        .then(res => {
          console.log("success", post);
          console.log(res)
          // reset form if successful
          setFormState({
              name: "",
              category: "",
              deadline: "",
              goal: "",
              date: "",
              pledged: "",
              country: "",
              currency:""
              });
              
        })
    };
  
    return(
        <div>
            <h1>Your Kickstarter</h1>
            <form onSubmit={formSubmit}>
                <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Name" 
                value={formState.name}
                onChange={inputChange}/>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                <br></br>
                <select id="category" name="category" onChange={inputChange}>
                  <option value="0">Art</option>
                  <option value="1">Comics</option>
                  <option value="2">Crafts</option>
                  <option value="3">Dance</option>
                  <option value="4">Design</option>
                  <option value="5">Fashion</option>
                  <option value="6">Film and Video</option>
                  <option value="7">Food</option>
                  <option value="8">Games</option>
                  <option value="8">Journalism</option>
                  <option value="10">Music</option>
                  <option value="11">Photography</option>
                  <option value="12">Publishing</option>
                  <option value="13">Technology</option>
                  <option value="14">Theater</option>
                </select>
                {errors.category.length > 0 ? <p className="error">{errors.category}</p> : null}
                <br></br>
                <input 
                id="deadline" 
                name="deadline" 
                type="text" 
                placeholder="Deadline"
                value={formState.deadline}
                onChange={inputChange}/>
                {errors.deadline.length > 0 ? <p className="error">{errors.deadline}</p> : null}
                <br></br>
                <input 
                id="goal" 
                name="goal" 
                type="text" 
                placeholder="Goal Amount"
                value={formState.goal}
                onChange={inputChange}/>
                {errors.goal.length > 0 ? <p className="error">{errors.goal}</p> : null}
                <br></br>
                <input 
                id="date" 
                name="date" 
                type="text" 
                placeholder="Date Started"
                value={formState.date}
                onChange={inputChange}/>
                {errors.date.length > 0 ? <p className="error">{errors.date}</p> : null}
                <br></br>
                <input 
                id="pledged" 
                name="pledged" 
                type="text" 
                placeholder="Pledged amount ($)"
                value={formState.pledged}
                onChange={inputChange}/>
                {errors.pledged.length > 0 ? <p className="error">{errors.pledged}</p> : null}
                <br></br>
                <select id="country" name="country" onChange={inputChange}>
                  <option value="0">AT</option>
                  <option value="1">AU</option>
                  <option value="2">BE</option>
                  <option value="3">CA</option>
                  <option value="4">CH</option>
                  <option value="5">DE</option>
                  <option value="6">DK</option>
                  <option value="7">ES</option>
                  <option value="8">FR</option>
                  <option value="8">GB</option>
                  <option value="10">HK</option>
                  <option value="11">IE</option>
                  <option value="12">IT</option>
                  <option value="13">JP</option>
                  <option value="14">LU</option>
                  <option value="15">MX</option>
                  <option value="16">NL</option>
                  <option value="17">NO</option>
                  <option value="18">NZ</option>
                  <option value="19">SE</option>
                  <option value="20">SG</option>
                </select>
                {errors.country.length > 0 ? <p className="error">{errors.country}</p> : null}
                <br></br>
                <select id="currency" name="currency" onChange={inputChange}>
                  <option value="0">AUD</option>
                  <option value="1">CAD</option>
                  <option value="2">CHF</option>
                  <option value="3">DKK</option>
                  <option value="4">EUR</option>
                  <option value="5">GBP</option>
                  <option value="6">HKD</option>
                  <option value="7">JPY</option>
                  <option value="8">MXN</option>
                  <option value="8">NOK</option>
                  <option value="10">NZD</option>
                  <option value="11">SEK</option>
                  <option value="12">SGD</option>
                  <option value="13">USD</option>
                </select>
                <br></br>
                <button disabled={buttonDisabled}>Submit</button>
            </form>
            <button onClick={getData}>Calculate</button>
            <p>Prediction: {data}</p>
            <p>The current time is {currentTime}.</p>
            
        </div>
  
    )
  }
  
  export default App;
  
