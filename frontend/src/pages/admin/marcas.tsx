import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiFolderOpen } from "react-icons/hi";
/* templates */
import { Meta } from "@templates/meta";
import { Template } from "@templates/template";
/* utils */
import { paginationComponentOptions } from "@utils/table";
/* components */
import DataTable from "react-data-table-component";
import CadastrarMarca from "@components/modal/form/marca";
import { EmptyTable } from "@components/empty/table";
import Excluir from "@components/modal/delete";
import Navbar from "@components/navigation/navbar";
import { NavbarAdminLinks } from "@utils/data";
import AddEditMarca from "@components/modal/form/marca";

const columns = [
  {
    id: "nome",
    name: "Nome",
    selector: (row: any) => row.nome,
    sortable: true,
    width: "40%",
  },
  {
    id: "registro",
    name: "Concessionaria",
    selector: (row: any) => row.concessionaria,
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
          title="Excluir Marca"
          description="Tem certeza que deseja excluir esse marca?"
          onClick={() => deleteMarca(props.id)}
        />
        {/* <AddEditMarca editData={props} /> */}
      </div>
    ),
  },
];

const deleteMarca = async (id: number) => {
  await fetch(`http://localhost:8080/api/marca/excluir/${id}`, {
    method: "DELETE",
  }).then((response) => {
    console.log(response);
    window.location.reload();
  });
};
/*
const data = [
  {
    id: 1,
    nome: "Fiat Palio",
    concessionaria: "Lavelli",
    vendedor: "Antônio Maria",
  },
  {
    id: 2,
    nome: "Fiat Uno",
    concessionaria: "Roma",
    vendedor: "Julio Cesar",
  },
];
*/

const Home: NextPage = () => {
  const [cursos, setMarcas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/marca/listar")
      .then((response) => response.json())
      .then((data) => {
        data.map((marca: any) => {
          marca.concessionaria = marca.concessionaria.nome;
        });
        setMarcas(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Template
      meta={
        <Meta
          title="Sistema Carros"
          description="Administre suas funcionalidades"
          image="/img/banner/logo.png"
          imageAlt="Sistema Carros"
        />
      }
    >
      <Navbar links={NavbarAdminLinks} />
      <div className="container py-16">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-700">Marcas</h2>
          <AddEditMarca />
        </div>

        <div className="mt-8 overflow-x-auto animate-fade-in-up text-gray-700">
          <DataTable
            columns={columns}
            data={cursos}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            pointerOnHover
            noDataComponent={
              <EmptyTable
                title="Não há marcas cadastradas :("
                description="Cadastre uma marca no botão Cadastrar!"
                icon={HiFolderOpen}
              />
            }
          />
        </div>
      </div>
    </Template>
  );
};

export default Home;
