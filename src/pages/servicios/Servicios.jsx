import { useEffect, useState, useRef } from "react"
import { servicios } from "../../utils/API.jsx"
import { Toaster } from "sonner";
import { useNavigate } from 'react-router-dom';
import { deleteItem, searchCode, getListItems } from "../../utils/actions.jsx";
import { IconTrash, IconEdit, IconDetail } from "../../components/Icon.jsx";
import { formatoId, normalizeDecimalNumber } from "../../utils/process.jsx";
import Table from "../../components/table/Table";
import Navbar from "../../components/navbar/Navbar";
import texts from "../../context/text_es.js";


function Servicios() {
  const [listServicios, setServicios] = useState([])
  const [dataServicios, setDataServicios] = useState({ pages: 0, total: 0 })
  const [tableLoading, setTableLoaing] = useState(true)
  const renderizado = useRef(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (renderizado.current === 0) {
      renderizado.current = renderizado.current + 1
      getServicios()
      return
    }
  }, [])

  const getServicios = () => {
    getListItems({
      object: servicios,
      setList: setServicios,
      setData: setDataServicios,
      setLoading: setTableLoaing
    })
  }

  const columns = [
    {
      name: "Código",
      row: (row) => { const codigo = formatoId(Number(row.id)); return codigo }
    },
    {
      name: "Nombre",
      row: (row) => { return row.nombre }
    },
    {
      name: "Precio Ref",
      row: (row) => { return `${normalizeDecimalNumber(row.precio)} $` }
    },
    {
      name: "Duración",
      row: (row) => {
        const horas = row.duracion.horas
        const minutos = row.duracion.minutos
        return `${horas < 10 ? `0${horas}` : horas}:${minutos < 10 ? `0${minutos}` : minutos} ${horas === 0 ? "min" : "h"}`

      }
    },
    {
      name: "Opciones",
      row: (row) => {
        return <div className='d-flex justify-content-around options-table'>
          <IconDetail
            onClick={() => { navigate(`/servicios/${row.id}/`) }}
            className="cursor-pointer"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={texts.tootlip.servicio}
            data-bs-trigger="hover"
          />
          <IconEdit
            onClick={() => { navigate(`/edit/servicio/${row.id}/`) }}
            className="cursor-pointer"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={texts.tootlip.editar}
            data-bs-trigger="hover"
          />
          <IconTrash
            onClick={() => {
              deleteItem({
                row: row,
                objet: servicios,
                functionGet: getServicios
              })
            }}
            className="cursor-pointer"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={texts.tootlip.eliminar}
            data-bs-trigger="hover"
          />
        </div>
      }
    },
  ]

  const options = {
    search: {
      placeholder: texts.registerMessage.searchItem,
      function: (value) => {
        searchCode({
          value: value,
          object: servicios,
          setList: setServicios,
          setLoading: setTableLoaing,
          setData: setDataServicios,
        })
      }
    },
    register: {
      name: texts.registerMessage.buttonRegisterServicio,
      function: () => {
        navigate("/register/servicio/")
      }
    }
  }

  return (
    <Navbar name={`${texts.pages.getServicios.name}`} descripcion={`${texts.pages.getServicios.description}`}>
      <Table
        columns={columns}
        rows={listServicios}
        totalElements={dataServicios.total}
        totalPages={dataServicios.pages}
        options={options}
        loading={tableLoading}
        order={true}
        organizar={[
          { label: "Codigo", value: "orig" },
          { label: "Nombre", value: "alf" },
        ]}
      />
      <Toaster />
    </Navbar>
  )
}

export default Servicios