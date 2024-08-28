import { useEffect, useState, useRef } from "react";
import { eventos } from "../../utils/API.jsx";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { searchCode, getListItems } from "../../utils/actions.jsx";
import {
  IconTrash,
  IconRecreadores,
  IconDetail,
  IconMoney,
  IconCalendar
} from "../../components/Icon.jsx";
import { formatoId, formatDateWithTime12Hour } from "../../utils/process.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Table from "../../components/table/Table.jsx";
import Pildora from "../../components/Pildora.jsx";
import { ButtonSimple } from "../../components/button/Button.jsx";
import texts from "../../context/text_es.js";

function Eventos() {
  const [listEventos, setEventos] = useState([]);
  const [dataEventos, setDataEventos] = useState({ pages: 0, total: 0 });
  const [tableLoading, setTableLoaing] = useState(true);
  const renderizado = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (renderizado.current === 0) {
      renderizado.current = renderizado.current + 1;
      getEventos();
      return;
    }
  }, []);

  const getEventos = () => {
    getListItems({
      object: eventos,
      setList: setEventos,
      setData: setDataEventos,
      setLoading: setTableLoaing,
    });
  };

  const columns = [
    {
      name: "Codigo",
      row: (row) => {
        const codigo = formatoId(Number(row.id));
        return codigo;
      },
    },
    {
      name: "Fecha",
      row: (row) => {
        const fecha = formatDateWithTime12Hour(row.fecha_evento_inicio);
        return fecha;
      },
    },
    {
      name: "Documento",
      row: (row) => {
        return `${row.tipo_documento}-${row.numero_documento}`;
      },
    },
    {
      name: "Cliente",
      row: (row) => {
        return `${row.nombres} ${row.apellidos}`;
      },
    },
    {
      name: "Estado de Pago",
      row: (row) => {
        let value;
        if (row.pago_total) {
          value = <Pildora contenido={"Pago Total"} color="bg-succes"></Pildora>
        }
        if (row.anticipo && !row.pago_total) {
          value = <Pildora contenido={"Pago Anticipagdo"} color="bg-warning"></Pildora>
        }
        if (!row.pago_total && !row.anticipo) {
          value = <Pildora contenido={"Ningun Pago"} color="bg-danger"></Pildora>
        }
        return value;
      },
    },
    {
      name: "Estado",
      row: (row) => {
        let value;
        if (row.estado === null) {
          value = "En espera";
          value = <Pildora contenido={"En espera"} color="bg-info"></Pildora>
        }
        if (row.estado === false) {
          value = <Pildora contenido={"Cancelado"} color="bg-danger"></Pildora>
        }
        if (row.estado === true) {
          value = <Pildora contenido={"Completado"} color="bg-succes"></Pildora>
        }
        return value;
      },
    },
    {
      name: "Opciones",
      row: (row) => {
        return (
          <div className="d-flex justify-content-around options-table">
            <IconDetail
              onClick={() => {
                navigate(`/eventos/${row.id}/`);
              }} className="cursor-pointer"
            />
            <IconRecreadores
              onClick={() => {
                navigate(`/eventos/recreadores/${row.id}/`);
              }} className="cursor-pointer"
            />
            <IconMoney
              onClick={() => {
                navigate(`/eventos/pagos/${row.id}/`);
              }}
              className="cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  const options = {
    search: {
      placeholder: texts.registerMessage.searchClient,
      function: (value) => {
        searchCode({
          value: value,
          object: eventos,
          setList: setEventos,
          setData: setDataEventos,
          setLoading: setTableLoaing,
        });
      },
    },
    register: {
      name: texts.registerMessage.buttonRegisterEvento,
      function: () => {
        navigate("/register/eventos/");
      },
    },
  };

  const ButtonCalendar = () => {
    return (
      <div className="w-100 mb-2 d-flex">
        <ButtonSimple className={"ms-auto"} onClick={() => { navigate("/eventos/calendar/") }}>Calendario de Eventos <IconCalendar /></ButtonSimple>
      </div>
    )
  }

  return (
    <Navbar
      name={texts.pages.getEventos.name}
      descripcion={texts.pages.getEventos.description}
    >
      <Table
        childrenTop={ButtonCalendar}
        columns={columns}
        rows={listEventos}
        totalElements={dataEventos.total}
        totalPages={dataEventos.pages}
        options={options}
        loading={tableLoading}
      />
      <Toaster />
    </Navbar>
  );
}

export default Eventos;
