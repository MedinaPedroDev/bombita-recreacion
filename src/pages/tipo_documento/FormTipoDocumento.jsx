import { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { InputsGeneral, InputTextTarea } from "../../components/input/Inputs.jsx";
import { ButtonSimple } from "../../components/button/Button.jsx";
import { tipo_documentos } from "../../utils/API.jsx";
import { alertConfim, toastError, alertLoading } from "../../components/alerts.jsx";
import { Toaster } from "sonner";
import { hasLeadingOrTrailingSpace } from "../../utils/process.jsx";
import { controlErrors, controlResultPost } from "../../utils/actions.jsx";
import { LoaderCircle } from "../../components/loader/Loader.jsx";
import { IconRowLeft } from "../../components/Icon.jsx";
import { useAuthContext } from '../../context/AuthContext.jsx';
import ErrorSystem from "../../components/errores/ErrorSystem.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Swal from 'sweetalert2';
import texts from "../../context/text_es.js";
import pattern from "../../context/pattern.js";

function FormTipoDocumento() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const {getOption} = useAuthContext()
    const renderizado = useRef(0);
    const [errorServer, setErrorServer] = useState("");

    useEffect(() => {
        if (renderizado.current === 0) {
            renderizado.current = renderizado.current + 1
            if (params.id) {
                document.title="Edición Tipo de Documento - Bombita Recreación"
                get_tipoDocumento()
            }else{
                document.title="Registrar Tipo de Documento - Bombita Recreación"
                setLoading(false)
            } 
            return
        }
    }, [])

    const get_tipoDocumento = async () => {
        try {
            const respuesta = await tipo_documentos.get({ subDominio:[Number(params.id)] })
            const errors = controlErrors({respuesta: respuesta, constrolError:setErrorServer})
            if(errors) return
            setErrorServer("")
            const data = respuesta.data.data
            const keys = Object.keys(data);
            keys.forEach(key => {
                setValue(key, `${data[`${key}`]}`)
            });

        } catch (error) {
            setErrorServer(texts.errorMessage.errorObjet)
        } finally {
            setLoading(false)
        }
    }


    // *the useform
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm();

    // *Funcion para registrar
    const onSubmit = handleSubmit(
        async (data) => {
            try {
                const message = params.id ? texts.confirmMessage.confirmEdit : texts.confirmMessage.confirmRegister
                const confirmacion = await alertConfim("Confirmar", message)
                if (confirmacion.isConfirmed) {
                    const body = {
                        nombre: data.nombre,
                        descripcion: data.descripcion,
                    }
                    alertLoading("Cargando")
                    const res = params.id ? await tipo_documentos.put(body, { subDominio:[Number(params.id)]}) : await tipo_documentos.post(body)
                    controlResultPost({
                        respuesta: res,
                        messageExito: params.id ? texts.successMessage.editionTipoDocumento : texts.successMessage.registerTipoDocumento,
                        useNavigate: { navigate: navigate, direction: "/tipo_documentos/" },
                        callbak:()=>{getOption("tipo_documento")}
                    })
                }

            } catch (error) {
                Swal.close()
                toastError(texts.errorMessage.errorConexion)
            }
        }
    )

    return (
        <Navbar name={params.id ? texts.pages.editTipoDocumento.name : texts.pages.registerTipoDocumento.name} descripcion={params.id ? texts.pages.editTipoDocumento.description : texts.pages.registerTipoDocumento.description} dollar={false}>
            <ButtonSimple type="button" className="mb-2" onClick={() => { navigate("/tipo_documentos/") }}> <IconRowLeft /> Regresar</ButtonSimple>


            {
                loading ?
                    (
                        <div className="div-main justify-content-center p-4">
                            <LoaderCircle />
                        </div>
                    )
                    :
                    errorServer ?
                        (
                            <div className="div-main justify-content-center p-4">
                                <ErrorSystem error={errorServer} />
                            </div>
                        )
                        :
                        (
                            <div className="div-main justify-content-between px-3 px-md-4 px-lg-5 py-3">
                                <form className="w-100 d-flex flex-column"

                                    onSubmit={onSubmit}>
                                    <InputsGeneral type={"text"} label={`${texts.label.nombre}`} name="nombre" id="nombre" form={{ errors, register }}
                                        params={{
                                            required: {
                                                value: true,
                                                message: texts.inputsMessage.requiredName,
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: texts.inputsMessage.max100,
                                            },
                                            pattern: {
                                                value: pattern.textWithNumber,
                                                message: texts.inputsMessage.invalidName,
                                            },
                                            validate: (value) => {
                                                if (hasLeadingOrTrailingSpace(value)) {
                                                    return texts.inputsMessage.noneSpace
                                                } else {
                                                    return true
                                                }
                                            }
                                        }}
                                        placeholder={texts.placeholder.nameTipoDocumento}
                                    />
                                    <InputTextTarea label={`${texts.label.descripcion}`} name="descripcion" id="descripcion" form={{ errors, register }}
                                        params={{
                                            maxLength: {
                                                value: 300,
                                                message: texts.inputsMessage.max300
                                            },
                                            required: {
                                                value: true,
                                                message: texts.inputsMessage.requiredDesription,
                                            },
                                            validate: (value) => {
                                                if (hasLeadingOrTrailingSpace(value)) {
                                                    return texts.inputsMessage.noneSpace
                                                } else {
                                                    return true
                                                }
                                            }
                                        }}
                                        placeholder={texts.placeholder.descripcion}
                                    />
                                    <ButtonSimple type="submit" className="mx-auto w-50 mt-3">
                                        {params.id? "Guardar" : "Registrar"}
                                    </ButtonSimple>
                                </form>
                            </div>
                        )
            }

            <Toaster />
        </Navbar>
    )
}

export default FormTipoDocumento