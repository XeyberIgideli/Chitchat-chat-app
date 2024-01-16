import { Input } from "../../components/Input"
import { useRef, useEffect, useState } from "react"
import { IoLogoFacebook } from "react-icons/io" 
import { useNavigate, useLocation, Link } from "react-router-dom" 
import {login} from "../../config/_firebase"
import { Formik, Form } from "formik"
import { schemaLogin } from "../../validation"
import { Button } from "components/Button"
import { Seperator } from "components/Seperator"
import {Helmet} from 'react-helmet'
export default function Login() {
   
  const homeSliderRef = useRef()  
 
  const location = useLocation()
  const navigate = useNavigate()

  // Home screenshot slider
  useEffect(() => {
    const images = homeSliderRef.current.querySelectorAll('img')
    let total = images.length
    let index = 0
    let homeSlider = setInterval(() => {
      if( index < total - 1) {
        index++
      } else {
        Array.from(images).map(item => item.style.opacity = 0)
        index = 0
      }
      images[index].style.opacity = 100
    }, 3000)

    return () => {
      clearInterval(homeSlider)
    }
  }, [homeSliderRef])
  
  // Handling user login
  async function handleSubmit(values,actions) { 
    const response = await login(values.username, values.password)
    if(response) {
      navigate('/', {replace:true})
    }
  }

  return (
   <div className="h-full w-full flex flex-wrap overflow-auto  gap-x-8 items-center justify-center">
    <Helmet>
         <title>Login ~ Chitchat</title>
    </Helmet>
    {/* Left ~ Home phone section */}
    <div className="hidden md:block w-[380px] h-[581px] relative bg-hero-image bg-[length:468.32px_634.15px] bg-[top_left_-46px]">
      <div className="w-[250px] h-[538px] absolute top-[27px] right-[18px]" ref={homeSliderRef}>
        <img className="w-full h-full absolute transition-opacity duration-1000 ease-linear"
                src="https://www.instagram.com/static/images/homepage/screenshots/screenshot1-2x.png/cfd999368de3.png"
                alt=""/>
        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
              src="https://www.instagram.com/static/images/homepage/screenshots/screenshot2-2x.png/80b8aebdea57.png"
              alt=""/>
        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
              src="https://www.instagram.com/static/images/homepage/screenshots/screenshot3-2x.png/fe2540684ab2.png"
              alt=""/>
        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
							 src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png"
							 alt=""/>
      </div>
    </div>

      {/* Right ~ Home form section */}

      <div className="w-[350px] flex flex-col gap-y-3">
      <div className="bg-white border px-[40px] pt-10 pb-2">
         
          <a className="flex justify-center mb-8" href=""><img className="h-[51px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png" alt="" /></a>
          <Formik initialValues={{
            email: '',
            password: ''
          }} onSubmit={handleSubmit} validationSchema={schemaLogin}>
            {({isSubmitting, values, dirty, isValid }, ) => (
              <Form className="flex flex-col gap-y-1.5">  
                <Input label="Phone number, username or email" type="text" name="username" />
                <Input label="Password" name="password" type="password"/>
          
                <Button type="submit" disabled={!isValid || !dirty || isSubmitting}>Log In</Button>

                <Seperator/>

                <a href="" className="flex items-center justify-center gap-x-2 font-semibold text-blue-900 text-sm mb-2">
                  <IoLogoFacebook size={20}/>
                  Log in with Facebook
                </a>

                <a href="" 
                className="flex items-center justify-center gap-x-2 font-semibold text-blue-700 text-sm mb-2">
                Forgot password?
                </a>
            </Form>
            )}

          </Formik> 

      </div>

      <div className="bg-white border p-4 text-center">
        Don't have an account? <Link to="/auth/register" className="text-primary font-semibold">Sign Up</Link>
      </div>
      
      </div>
      
   </div>
  );
}