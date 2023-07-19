import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOutlineBookOpen } from "react-icons/hi";
/* templates */
import { Meta } from "@templates/meta";
import { Template } from "@templates/template";
/* utils */
import { paginationComponentOptions } from "@utils/table";
/* components */
import DataTable from "react-data-table-component";
import CadastrarCarro from "@components/modal/form/carro";
import { EmptyTable } from "@components/empty/table";
import Excluir from "@components/modal/delete";
import Navbar from "@components/navigation/navbar";
import { NavbarAdminLinks } from "@utils/data";
import AddEditCarro from "@components/modal/form/carro";

const columns = [
  // {
  //   id: "codigo",
  //   name: "Código",
  //   selector: (row: any) => row.codigo,
  //   sortable: true,
  //   width: "10%",
  // },
  {
    id: "nome",
    name: "Nome",
    selector: (row: any) => row.nome,
    sortable: true,
  },
  {
    id: "registro",
    name: "Concessionaria",
    selector: (row: any) => row.concessionaria.nome,
    sortable: true,
  },
  // {
  //   id: "vendedor",
  //   name: "Vendedor",
  //   selector: (row: any) => row.vendedor?.nome,
  //   sortable: true,
  // },
  {
    id: "acoes",
    sortable: false,
    right: true,
    grow: 0,
    cell: (props: any) => (
      <div className="flex gap-2">
        <Excluir
          title="Excluir Carro"
          description="Tem certeza que deseja excluir esse carro?"
          onClick={() => deleteRegistro(props.id)}
        />
        <AddEditCarro editData={props.id} />
      </div>
    ),
  },
];

const deleteRegistro = async (id: number) => {
  await fetch(`http://localhost:8080/api/carro/excluir/${id}`, {
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
    codigo: "GCC-218",
    nome: "Engenharia da Computação",
    concessionaria: "Concessionaria de Ciência da Computação",
    vendedor: "Antônio Maria",
  },
  {
    id: 2,
    codigo: "GCC-244",
    nome: "Práticas de Programação Orientada a Objetos",
    concessionaria: "Concessionaria de Ciência da Computação",
    vendedor: "Julio Cesar",
  },
];
*/

const Home: NextPage = () => {
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/carro/listar")
      .then((response) => response.json())
      .then((data) => {
        setCarros(data);
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
          <h2 className="text-gray-700">Carros</h2>
          <AddEditCarro />
        </div>

        <div className="mt-8 overflow-x-auto animate-fade-in-up text-gray-700">
          <DataTable
            columns={columns}
            data={carros}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            pointerOnHover
            noDataComponent={<EmptyTable title="Não há carros cadastrados :(" description="Cadastre um carro no botão Cadastrar!" icon={HiOutlineBookOpen} />}
          />
        </div>
      </div>
    </Template>
  );
};

export default Home;
