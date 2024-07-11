import React, { useRef, useState } from "react";
import Header from "../Header";
import { checkValidData } from "../../utils/validate";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import './Login.css'

const Login = () => {
  const [errMessage, setErrMessage] = useState("");


  const dispatch = useDispatch();

  // const authenticateUser = (
  //   isSignUp,
  //   userName,
  //   email,
  //   password,
  //   setErrMessage
  // ) => {
  //   isSignUp
  //     ? createUserWithEmailAndPassword(auth, email, password)
  //         .then((userCredential) => {
  //           const user = userCredential.user;
  //           updateProfile(user, {
  //             displayName: userName,
  //             photoURL: "https://example.com/jane-q-user/profile.jpg",
  //           })
  //             .then(() => {
  //               const { uid, email, displayName, photoURL } = auth.currentUser;
  //               dispatch(addUser({ uid, email, displayName, photoURL }));
  //             })
  //             .catch((error) => {
  //               throw error;
  //             });
  //         })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //           setErrMessage(errorCode + " - " + errorMessage);
  //         })
  //     : signInWithEmailAndPassword(auth, email, password)
  //         .then((userCredential) => {})
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //           setErrMessage(errorCode + " - " + errorMessage);
  //         });
  // };

  // const handleButtonClick = (e) => {
  //   e.preventDefault();
  //   // Validate Form Data
  //   const valid = checkValidData(
  //     emailRef.current.value,
  //     passwordRef.current.value
  //   );
  //   setErrMessage(valid);
  //   if (valid) return;
  //   authenticateUser(
  //     signUp,
  //     nameRef?.current?.value,
  //     emailRef?.current?.value,
  //     passwordRef?.current?.value,
  //     setErrMessage
  //   );
  // };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = provider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        const auth = result.user;
        const { uid, email, displayName, photoURL } = auth.currentUser;
        dispatch(addUser({ uid, email, displayName, photoURL }));

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        setErrMessage(error.message)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = provider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className='login h-lvh flex items-center justify-center'>
      <Header />

      <form className='relative bg-black p-6 mx-auto left-0 right-0 text-white bg-opacity-80 max-w-[350px] rounded-lg'>
        <button class='signin' onClick={handleGoogleAuth}>
          <svg
            viewBox='0 0 256 262'
            preserveAspectRatio='xMidYMid'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
              fill='#4285F4'
            ></path>
            <path
              d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
              fill='#34A853'
            ></path>
            <path
              d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
              fill='#FBBC05'
            ></path>
            <path
              d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
              fill='#EB4335'
            ></path>
          </svg>
          Sign in with Google
        </button>

        <p className='text-red-500'>{errMessage}</p>
      </form>
    </div>
  );
};

export default Login;
