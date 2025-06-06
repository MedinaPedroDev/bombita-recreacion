import { useEffect, useState, useRef } from "react";
import { actividades } from "../../utils/API.jsx";
import { Toaster } from "sonner";
import { useNavigate } from 'react-router-dom';
import { deleteItem, searchCode, getListItems } from "../../utils/actions.jsx";
import { formatoId, formatDateWithTime12Hour, activeTooltip } from "../../utils/process.jsx";
import { IconTrash, IconEdit, IconDetail } from "../../components/Icon.jsx";
import { alertInfo } from "../../components/alerts.jsx";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import texts from "../../context/text_es.js";

function Actividades() {
  const [listActividades, setActividades] = useState([])
  const [dataActividades, setDataActividades] = useState({ pages: 0, total: 0 })
  const [tableLoading, setTableLoaing] = useState(true)
  const renderizado = useRef(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (renderizado.current === 0) {
      document.title = "Actividades - Bombita Recreación"
      renderizado.current = renderizado.current + 1
      getActividades()
      return
    }
  }, [])

  const getActividades = (filtros = {}) => {
    getListItems({
      object: actividades,
      filtros: { ...filtros },
      setList: setActividades,
      setData: setDataActividades,
      setLoading: setTableLoaing,
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
      name: "Descripción",
      row: (row) => { return row.descripcion }
    },
    {
      name: "Opciones",
      row: (row) => {
        return <div className='d-flex justify-content-around options-table'>
          <IconTrash
            onClick={() => {
              deleteItem({
                row: row,
                objet: actividades,
                functionGet: getActividades
              })
            }}
            className="cursor-pointer"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={texts.tootlip.eliminar}
            data-bs-trigger="hover"
          />
          <IconEdit
            onClick={() => { navigate(`/edit/actividad/${row.id}/`) }}
            className="cursor-pointer"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={texts.tootlip.editar}
            data-bs-trigger="hover"
          />
        </div>
      }
    },
  ]

  const options = {
    search: {
      placeholder: texts.registerMessage.searchItem,
      function: (value, filtros = {}) => {
        searchCode({
          value: value,
          object: actividades,
          filtros: filtros,
          setList: setActividades,
          setData: setDataActividades,
          setLoading: setTableLoaing,
        })
      }
    },
    register: {
      name: texts.registerMessage.buttonRegisterActividad,
      function: () => {
        navigate("/register/actividad/")
      }
    }
  }

  return (
    <Navbar name={texts.pages.getActividades.name} descripcion={texts.pages.getActividades.description} dollar={false}>

      <Table
        columns={columns}
        rows={listActividades}
        totalElements={dataActividades.total}
        totalPages={dataActividades.pages}
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

export default Actividades