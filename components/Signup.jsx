"use client"
import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github } from "lucide-react";
import Link from "next/link";


import { cn } from '@/lib/utils'

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState('')


  const router = useRouter()

  const validateSignupForm = () => {
    const newErrors = {};

    if (!emailAddress) {
      newErrors.emailAddress = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submission of the sign-up form
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateSignupForm()) return;
    setIsLoading(true);

    // Check if the sign-in object is loaded - It’s a boolean (true or false) that tells you whether the Clerk sign-up object is ready to use.
    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      // Set 'verifying' true to display second form
      // and capture the OTP code

      setVerifying(true)

    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false);
    }
  }


  const validateVerificationForm = () => {
    const newErrors = {};

    if (!code) {
      newErrors.code = "Code is required";
    } else if (code.length < 6) {
      newErrors.code = "Code must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle the submission of the verification form
  const handleVerify = async (e) => {
    e.preventDefault()

    if (!validateVerificationForm()) return;
    setIsLoading(true);
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.push('/dashboard')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false);
    }
  }

  const signUpWIth = async (strategy) => {
    return signUp
      .authenticateWithRedirect({
        strategy,
        redirectUrl: '/auth/sso-callback',
        redirectUrlComplete: '/dashboard',
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.log(err.errors)
        console.error(err, null, 2)
      })
  }

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-lg">
            <div className="backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 bg-white/10">
              <div className="p-8 sm:p-10">
                <div className="text-center mb-8">
                  <h1 className="text-[18px] font-bold mb-2">Verify your email</h1>
                  <p className="text-gray-300">Please enter your verification code..</p>
                </div>

                <form onSubmit={(e) => handleVerify(e)} >
                  <div className="group relative">
                    <label
                      htmlFor="code"
                      className={cn(
                        "absolute left-3 text-sm transition-all duration-200 pointer-events-none z-1 rounded-md",
                        code ? "-top-[10px] bg-card px-2 text-[13px] bg-background text-purple-400" : "top-4.5 px-2.5 text-gray-300"
                      )}
                    >
                      Verification code
                    </label>
                    <div className="relative">
                      <input
                        id="code"
                        name="code"
                        type="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={cn(
                          "w-full h-14 px-[21px] pt-1 rounded-md border bg-transparent transition-all duration-200",
                          "focus:outline-none focus:ring-1",
                          "peer placeholder-transparent",
                          errors.code ? "border-destructive focus:ring-destructive/30" : "border-input"
                        )}
                        placeholder="Email address"
                      />
                    </div>
                    <p className={`${errors.code ? 'opacity-100' : 'opacity-0'} text-destructive text-xs mt-1 animate-in fade-in-50 px-2 text-red-400`}>**{errors.code} !</p>
                  </div>


                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-11/12 h-10 bg-bluetext-blue-400 rounded-md font-medium mx-auto bg-purple-600 mt-3 cursor-pointer",
                      "transform transition-all duration-200 ease-in-out ring-2",
                      "flex items-center justify-center group",
                      isLoading ? "opacity-80 cursor-not-allowed" : "active:scale-[0.89] active:ring-4"
                    )}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        Verify
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-lg pt-16">
          <div className="backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 bg-white/10">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h1 className="text-[18px] font-bold mb-2">Create your a/c on Next-Auth</h1>
                <p className="text-gray-300">Welcome ! Continue with..</p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <button
                  type="button"
                  onClick={() => signUpWIth('oauth_google')}
                  className="flex items-center justify-center h-10 border rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="text-foreground">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" className="text-blue-500" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" className="text-green-500" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" className="text-yellow-500" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" className="text-red-500" />
                  </svg>

                  <span className="ml-2 text-sm font-semibold text-foreground/80">Google</span>

                </button>
                <button
                  type="button"
                  onClick={() => signUpWIth('oauth_github')}
                  className="flex items-center justify-center h-10 border rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <span className="bg-foreground/80 rounded-full p-[3px]"><Github className="text-background pl-[1px]" size={15} strokeWidth={3} /></span>

                  <span className="ml-2 text-sm font-semibold text-foreground/80">GitHub</span>
                </button>
              </div>


              <div className="relative flex items-center justify-center mt-9 mb-2">
                <div className="h-px flex-1 bg-gray-400"></div>
                <span className="px-3 text-xs">OR</span>
                <div className="h-px flex-1 bg-gray-400"></div>
              </div>

              <div className="text-center mb-4">
                <p className="text-gray-300">Please fill in the details to get started.</p>
              </div>

              <form onSubmit={(e) => handleSubmit(e)} className="space-y-3">
                <div className="space-y-3">
                  <div className="group relative">
                    <label
                      htmlFor="email"
                      className={cn(
                        "absolute left-3 text-sm transition-all duration-200 pointer-events-none z-1 rounded-md",
                        emailAddress ? "-top-[10px] bg-card px-2 text-[13px] bg-background text-purple-400" : "top-4.5 px-2.5 text-gray-300"
                      )}
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className={cn(
                          "w-full h-14 px-[21px] pt-1 rounded-md border bg-transparent transition-all duration-200",
                          "focus:outline-none focus:ring-1",
                          "peer placeholder-transparent",
                          errors.emailAddress ? "border-destructive focus:ring-destructive/30" : "border-input"
                        )}
                        placeholder="Email address"
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5" />
                    </div>
                    <p className={`${errors.emailAddress ? 'opacity-100' : 'opacity-0'} text-destructive text-xs mt-1 animate-in fade-in-50 px-2 text-red-400`}>**{errors.emailAddress} !</p>
                  </div>

                  <div className="group relative">
                    <label
                      htmlFor="password"
                      className={cn(
                        "absolute left-3 text-sm transition-all duration-200 pointer-events-none z-1 rounded-md",
                        password ? "-top-[10px] bg-card px-2 text-[13px] bg-background text-purple-400" : "top-4.5 px-2.5 text-gray-300"
                      )}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={cn(
                          "w-full h-14 px-[21px] pt-1 rounded-md border bg-transparent transition-all duration-200",
                          "focus:outline-none focus:ring-1",
                          "peer placeholder-transparent",
                          errors.password ? "border-destructive focus:ring-destructive/30" : "border-input"
                        )}
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-foreground transition-colors cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className={`${errors.password ? 'opacity-100' : 'opacity-0'} text-destructive text-xs mt-1 animate-in fade-in-50 px-2 text-red-400`}>**{errors.password} !</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div id="clerk-captcha" />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-11/12 h-10 bg-bluetext-blue-400 rounded-md font-medium mx-auto bg-purple-600 -mt-3 cursor-pointer",
                    "transform transition-all duration-200 ease-in-out ring-2",
                    "flex items-center justify-center group",
                    isLoading ? "opacity-80 cursor-not-allowed" : "active:scale-[0.89] active:ring-4"
                  )}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="p-6 border-t bg-gray-600/80 text-center">
              <p className="text-sm">
                Already have an account ?{" "}
                <Link href="/login" className="text-blue-400 hover:text-blue-500 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;