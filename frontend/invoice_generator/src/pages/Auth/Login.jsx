import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  FileText,
  ArrowRight,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, usenavigate } from "react-router-dom";

const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const[formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ error, setError ] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });
  const handleInputChange = (e) => {};
  const handleBlur = (e) => {};
  const isFormValid = () => {};
  const handleSubmit = async () => {};
  return (
    <div className=''>
      <div className=''>
        {/* Header */}
        <div className=''>
          <div className=''>
            <FileText className='' />
          </div>
          <h1 className=''>Login to Your Account </h1>
          <p className=''>
            Welcome back to Invoice Generator
          </p>
        </div>
        {/*Form*/} 
        <div className=''>
          {/* Email*/} 
          <div>
            <label className=''>
              Email
            </label>
            <div className=''>
              <Mail className='' />
              <input 
                name = "email"
                type = "email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  fieldErrors.email && touched.email
                    ?"border-red-300 focus:ring-red-500"
                    :"border-gray-300 focus:ring-black"
                }`}
                placeholder='Enter your email'
              />
            </div>
            {fieldErrors.email && touched.email && (
              <p className=''>{fieldErrors.email}</p>
            )}
          </div>

          {/*Password*/} 
          <div>
            <label className=''>
              Password
            </label>
            <div className=''>
              <Lock className='' />
              <input
                name="password"
                type={showPassword? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  fieldErrors.password && touched.password
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
                }`} 
                placeholder='Enter your password'
              />
              <button
                type="button"
                onClick={()=> setShowPassword(!showPassword)}
                className=''
              >
                {showPassword ? (
                  <EyeOff className=""/>
                ) : (
                  <Eye className=''/>
                )}
              </button>
            </div>
            {fieldErrors.password && touched.password && (
              <p className=''>
                {fieldErrors.password}
              </p>
            )}
          </div>
            {/* Error/Success messages*/} 
            {error && (
              <div className=''>
                <p className=''>{error}</p>
              </div>
            )}
          
          
        </div>
      </div>
    </div>
  )
}

export default Login