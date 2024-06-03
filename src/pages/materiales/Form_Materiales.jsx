import { InputsGeneral, InputTextTarea } from "../../components/input/Input"
import { ButtonSimple } from "../../components/button/Button"
import { useNavigate } from 'react-router-dom'
import { materiales } from "../../utils/API.jsx";
import { alertConfim, toastError, alertLoading } from "../../utils/alerts.jsx"
import { hasLeadingOrTrailingSpace } from "../../utils/process.jsx"
import { controlResultPost } from "../../utils/actions.jsx"
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import Navbar from "../../components/navbar/Navbar"
import Swal from 'sweetalert2';
import texts from "../../context/text_es.js";
import pattern from "../../context/pattern.js";
import {IconRowLeft} from "../../components/Icon"

function Form_Materiales() {
    const navigate = useNavigate();

    // *the useform
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()

    // *Funcion para registrar
    const onSubmit = handleSubmit(
        async (data) => {
            try {
                const confirmacion = await alertConfim("Confirmar", texts.confirmMessage.confirRegister)
                if (confirmacion.isConfirmed) {
                    const body = {
                        nombre: data.nombre,
                        total: Number(data.total),
                        descripcion: data.descripcion,
                    }
                    alertLoading("Cargando")
                    const res = await materiales.post(body)
                    controlResultPost({
                        respuesta: res,
                        messageExito: texts.successMessage.material,
                        useNavigate: { navigate: navigate, direction: "/materiales" }
                    })
                }
            } catch (error) {
                console.log(error)
                Swal.close()
                toastError(texts.errorMessage.errorConexion,)
            }
        }
    )
    return (
        <Navbar name={texts.pages.registerMaterial.name} descripcion={texts.pages.registerMaterial.description}>
            <ButtonSimple type="button" className="mb-2" onClick={() => { navigate("/materiales") }}> <IconRowLeft/> Regresar</ButtonSimple>

            <div className="div-main justify-content-between px-3 px-md-4 px-lg-5 py-3">
                <form className="w-100 d-flex flex-column"
                    onSubmit={onSubmit}>
                    <InputsGeneral type={"text"} label={texts.label.nombre} name="nombre" id="nombre" form={{ errors, register }}
                        params={{
                            required: {
                                value: true,
                                message: texts.inputsMessage.requireName
                            },
                            maxLength: {
                                value: 50,
                                message: texts.inputsMessage.max50
                            },
                            minLength: {
                                value: 5,
                                message: texts.inputsMessage.min5
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
                        placeholder={"Nombre del Material"}
                    />
                    <InputsGeneral type={"number"} label={`${texts.label.cantidadTotal}`} name="total" id="total" form={{ errors, register }}
                        defaultValue={0}
                        params={{
                            min: {
                                value: 0,
                                message: texts.inputsMessage.min0
                            },
                            step: {
                                value: 1,
                                message: texts.inputsMessage.step1
                            }
                        }}
                        placeholder="0"
                    />
                    <InputTextTarea label={`${texts.label.descripcion}`} name="descripcion" id="descripcion" form={{ errors, register }}
                        params={{
                            maxLength: {
                                value: 200,
                                message: texts.inputsMessage.max200
                            },
                            validate: (value) => {
                                if (hasLeadingOrTrailingSpace(value)) {
                                    return texts.inputsMessage.noneSpace
                                } else {
                                    return true
                                }
                            }
                        }}
                        placeholder={texts.placeholder.descrpcion}
                    />
                    <ButtonSimple type="submit" className="mx-auto w-50 mt-3">
                        Registrar
                    </ButtonSimple>
                </form>
            </div>
            <Toaster />
        </Navbar>
    )
}

export default Form_Materiales