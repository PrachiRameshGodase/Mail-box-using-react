import { useState, useRef} from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";


function LoginForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading,setisLoading]=useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const dispatch=useDispatch()
    const navigate=useNavigate()

    
    

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
      };
      const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const confirmPassword=confirmPasswordInputRef.current.value;
        console.log(enteredEmail, enteredPassword,confirmPassword);
    
        localStorage.setItem("email",enteredEmail);
    
    
        if(enteredPassword===confirmPassword){
        setisLoading(true)
        let url;
        if (isLogin) {
          url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdfhYYKbljPUoCi54zxzAh7RZ9GSY8wgY"
        } else {
          url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdfhYYKbljPUoCi54zxzAh7RZ9GSY8wgY"
        }
        fetch(url,
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((response) => {
          setisLoading(false)
          if (response.ok) {
            return response.json()
          } else {
            //The response holds error
            return response.json().then((data) => {
              console.log(data);
              let errorMessage="Authencation failed!";
              // if(data && data.error && data.error.message){
              //   errorMessage=data.error.message 
              // }
              // alert(errorMessage);
              throw new Error(errorMessage)
            });
          }
        }).then(data=>{
          console.log(data)
          // authCtx.login(data.idToken);
    
          dispatch(authActions.login(data.idToken))
         
            console.log("successfully sign up")
            navigate("/mailbox");
        //   authCtx.autoLogout();
          
        }).catch(err=>{
          alert(err.message);
        })
      }
      else{
        alert("Password is wrong")
        
      }
      }
  return (
    <div>
        <form onSubmit={submitHandler} className="bg-gradient-to-b to-red-800 via-yellow-300 from-green-600  rounded-lg shadow-md p-6 space-y-6 wd-full mx-auto max-w-xl mt-5">
        <h1 className="text-white text-2xl font-bold mb-3 flex justify-center ">{isLogin ? "Login" : "Sign Up"}</h1>
 
        <div>
          <label htmlFor="email" className="block text-white font-semibold mb-1">
          Your Email
          </label>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            required
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-white font-semibold mb-1">
          Your Password
          </label>
          <input
             type="password"
             id="password"
             ref={passwordInputRef}
             required
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
          />
      </div>


      <div>
          <label htmlFor="confirmPassword" className="block text-white font-semibold mb-1">
          Confirm Password
          </label>
          <input
             type="password"
             id="confirmPassword"
             ref={confirmPasswordInputRef}
             required
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
          />
      </div>

      <div className="mb-2 flex justify-center">
              {!isLoading ? (
                <button
                  type="submit"
                  className="bg-red-600 text-white rounded-2 px-4 py-2.5 hover:bg-green-800 text-lg"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              ) : ( 
                <p>Sending request...</p>
              )}
        </div>
        <div className="flex justify-center font-sans">
            <button
                type="button"
                className="bg-transparent text-white underline"
                onClick={switchAuthModeHandler}
            >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </button>

              
            </div>
 
            <div className="flex justify-center font-sans mt-2">
              <Link to="/forgotpassword" className="text-white underline">
                Forgot Password
              </Link>
            </div> 

      
       
    </form>
    </div>
  )
}

export default LoginForm
