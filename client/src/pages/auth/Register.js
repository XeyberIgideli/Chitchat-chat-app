import { Input } from "../../components/Input" 
import { IoLogoFacebook } from "react-icons/io" 
import { useNavigate, useLocation, Link } from "react-router-dom" 
import {register} from "../../config/_firebase"
import { Formik, Form } from "formik"
import { schemaRegister } from "../../validation"
import { Button } from "components/Button"
import { Seperator } from "components/Seperator"
import {Helmet} from 'react-helmet'
export default function Register() { 
 
  const location = useLocation()
  const navigate = useNavigate()
 
  // Handling user login
  async function handleSubmit(values,actions) {  
    const response = await register(values) 
    if(response) {
      navigate(location.state?.return_url || '/', {replace:true})
    }
  }

  return (
   <div>
     <Helmet>
         <title>Register ~ Chitchat</title>
     </Helmet>
     {/* Register form */}
      <div className="w-[350px] flex flex-col gap-y-3">
      <div className="bg-white border px-[40px] pt-10 pb-2">
         
          <a className="flex justify-center mb-4" href=""><img className="h-[51px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png" alt="" /></a>
          
          <p className="text-[#8e8e8e] font-semibold mb-6 text-[17px] text-center">Sign up to see photos and videos from your friends.</p>
          
          <Button>
            <IoLogoFacebook size={20}/>
              Sign up with Facebook
          </Button>

          <Seperator/>

          <Formik initialValues={{
            email: '',
            password: ''
          }} onSubmit={handleSubmit} validationSchema={schemaRegister}>
            {({isSubmitting, values, dirty, isValid }, ) => (
              <Form className="flex flex-col gap-y-1.5">  
                <Input label="Email" type="email" name="email" />
                <Input label="Full Name" type="text" name="fullName" />
                <Input label="Username" type="text" name="username" />
                <Input label="Password" name="password" type="password"/>

                <p className="text-xs text-[#8e8e8e] py-2">
                People who use our service may have uploaded
                your contact information to Chitchat.
                <a href="" className="font-semibold">Learn More</a>
               <br/><br/>
                By signing up, you agree to our <a href="" className="font-normal">Terms</a>,
                 <a href="" className="font-normal text-blue-900">Privacy Policy</a> and <a href="" className="font-normal text-blue-900">Cookies Policy</a>.
                </p>
          
                <Button type="submit" disabled={!isValid || !dirty || isSubmitting}>Sign Up</Button>
  
            </Form>
            )}

          </Formik> 

      </div>

      <div className="bg-white border p-4 text-center">
        Have an account? <Link to="/auth/login" className="text-primary font-semibold">Log In</Link>
      </div>
      
      </div>
      
   </div>
  );
}