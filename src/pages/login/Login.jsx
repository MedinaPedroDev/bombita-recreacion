
import './login.css'
import { useForm } from "react-hook-form";
import logo from "../../assets/logo-bombita.png";
import { useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { login, cargos } from "../../utils/API.jsx"
import { getCookie } from "../../utils/cookie.jsx"
import { errorAxios } from "../../utils/process.jsx"
import { IconUserCircleSolid, IconWarnig, IconUsers, IconBloq } from "../../components/Icon"
import texts from '../../context/text_es.js';
import pattern from '../../context/pattern.js';

function Login() {
  const { saveUser, isAuthenticateds } = useAuthContext()
  const [buttonLogin, setButton] = useState("Ingresar")
  const [alert, setAlert] = useState()
  const navigate = useNavigate();

  //* the useform
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Login - Bombita Recreación"
  }, [])

  //*funcion del evento submit para iniciar sesion
  const onSubmit = handleSubmit(
    async (data) => {
      setButton("Espere")
      try {
        document.getElementById("button-login").disabled = true
        const res = await login(data)
        if (!res.status === 200) {
          setAlert(`${texts.errorMessage.errorResponse}. Codigo ${res.status}`)
          return
        }
        if (!(res.data.status && res.data.token)) {
          setAlert(res.data.message)
          return
        }
        saveUser(res.data.data, res.data.token)
        setAlert("")
        navigate("/inicio/")
      } catch (error) {
        const message = await errorAxios(error)
        setAlert(message)
      }
      finally {
        setButton("Ingresar")
        document.getElementById("button-login").disabled = false
      }
    }
  )

  // *verificacion por si ya esta logeado el usuario
  if (isAuthenticateds && getCookie("token")) {
    <Navigate to="/inicio/" />
  }

  return (
    <main className='w-100 px-2 px-md-0 vh-100 d-flex justify-content-center align-items-center bg-login position-relative'>
      <form className='form w-100 w-sm-50 w-lg-30'
        autoComplete={"off"}
        onSubmit={onSubmit}
      >
        <div className="icon-user" >
        <img src={logo} alt="Logo" width="220px" />
        </div>

        <h1 className='h3 fw-bold mb-4 mt-5 text-white text-center'>Inicio de Sesión</h1>

        <div className='w-100 d-flex align-items-center'>
          <label htmlFor="user" className='icon-input d-flex cursor-pointer'>
            <IconUsers />
          </label>
          <div className={`w-100 position-relative overflow-hidden  ${errors.usuario ? "error" : ""}`} id="container-input-usuario">

            <input
              type="text"
              id="user"
              name="usuario"
              {
              ...register("usuario", {
                required: {
                  value: true,
                  message: texts.inputsMessage.requiredUser,
                }
              })
              }
              onKeyUp={
                (e) => {
                  if (e.target.value) {
                    document.getElementById("container-input-usuario").classList.add("valid")
                  } else {
                    document.getElementById("container-input-usuario").classList.remove("valid")
                  }
                }
              }
            />
            <label htmlFor="user" className='lb-name cursor-pointer'>
              <span className='text-name'>{texts.label.user}</span>
            </label>
          </div>
        </div>
        {errors.usuario ? <span className='error-login'>{errors.usuario.message}</span> : <span className='error-login invisible'>error</span>}

        <div className='w-100 d-flex align-items-center'>
          <label htmlFor="password" className='icon-input d-flex cursor-pointer'>
            <IconBloq />
          </label>
          <div className={`w-100 position-relative overflow-hidden ${errors.contraseña ? "error" : ""}`} id="container-input-password">
            <input
              id="password"
              type="password"
              name="contraseña"
              {
              ...register("contraseña", {
                required: {
                  value: true,
                  message: texts.inputsMessage.requiredPassword,
                }
              })
              }
              onKeyUp={
                (e) => {
                  if (e.target.value) {
                    document.getElementById("container-input-password").classList.add("valid")
                  } else {
                    document.getElementById("container-input-password").classList.remove("valid")
                  }
                }
              }
              autoComplete="current-password"
            />
            <label htmlFor="password" className='lb-name cursor-pointer'>
              <span className='text-name'>{texts.label.password}</span>
            </label>
          </div>
        </div>
        {errors.contraseña ? <span className='error-login'>{errors.contraseña.message}</span> : <span className='error-login invisible'>error</span>}

        {
          alert ?
            (
              <div className='alert-login mt-3'>
                <IconWarnig />
                <p className='ms-2 '>{alert}</p>
              </div>
            )
            :
            ""
        }

        <button type="subtmit" className={`button-style-login mt-4 btn-disabled`} id="button-login">
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="name">{buttonLogin}</span>
        </button>
      </form>
    </main>
  )
}

export default Login