import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOfficeBuilding } from "react-icons/hi";
/* templates */
import { Meta } from "@templates/meta";
import { Template } from "@templates/template";
/* utils */
import { paginationComponentOptions } from "@utils/table";
/* components */
import DataTable from "react-data-table-component";
import CadastrarConcessionaria from "@components/modal/form/concessionaria";
import { EmptyTable } from "@components/empty/table";
import Excluir from "@components/modal/delete";
import moment from "moment";
import Navbar from "@components/navigation/navbar";
import { NavbarAdminLinks } from "@utils/data";
import AddEditConcessionaria from "@components/modal/form/concessionaria";

const columns = [
  {
    id: "data",
    name: "Data Criação",
    selector: (row: any) => {
      return moment(row.dataCriacao).format("DD-MM-YYYY");
    },
    sortable: true,
  },
  {
    id: "nome",
    name: "Nome",
    selector: (row: any) => row.nome,
    sortable: true,
    width: "50%",
  },
  {
    id: "sigla",
    name: "Sigla",
    selector: (row: any) => row.sigla,
    sortable: true,
  },
  {
    id: "acoes",
    sortable: false,
    right: true,
    grow: 0,
    cell: (props: any) => (
      <div className="flex gap-2">
        <Excluir
          title="Excluir Concessionaria"
          description="Tem certeza que deseja excluir essa concessionaria?"
          onClick={() => deleteRegistro(props.id)}
        />
        <AddEditConcessionaria editData={props} /> 
      </div>
    ),
  },
];
/*
const data = [
{}
  ...
];
*/
const deleteRegistro = async (id: number) => {
  await fetch(`http://localhost:8080/api/concessionaria/excluir/${id}`, {
    method: "DELETE",
  }).then((response) => {
    console.log(response);
    window.location.reload();
  });
};

const Home: NextPage = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/concessionaria/listar")
      .then((response) => response.json())
      .then((data) => {
        setRegistros(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Template
      meta={
        <Meta
          title=""
          description=""
          image="/img/banner/logo.png"
          imageAlt=""
        />
      }
    >
      <Navbar links={NavbarAdminLinks} />
      <div className="container py-16">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-700">Concessionárias</h2>
          <AddEditConcessionaria />
        </div>

        <div className="mt-8 overflow-x-auto animate-fade-in-up text-gray-700">
          <DataTable
            columns={columns}
            data={registros}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            pointerOnHover
            noDataComponent={
              <EmptyTable
                title="Não há concessionárias cadastradas :("
                description="Cadastre uma concessionária no botão Cadastrar!"
                icon={HiOfficeBuilding}
              />
            }
          />
        </div>
      </div>
    </Template>
  );
};

export default Home;
