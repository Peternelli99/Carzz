import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineUserGroup,
} from "react-icons/hi";
/* templates */
import { Meta } from "@templates/meta";
import { Template } from "@templates/template";
/* utils */
import { paginationComponentOptions } from "@utils/table";
/* components */
import DataTable from "react-data-table-component";
import AddEditCliente from "@components/modal/form/cliente";
import { EmptyTable } from "@components/empty/table";
import Excluir from "@components/modal/delete";
import Navbar from "@components/navigation/navbar";
import { NavbarAdminLinks } from "@utils/data";

const deleteCliente = async (id: number) => {
  await fetch(`http://localhost:8080/api/cliente/excluir/${id}`, {
    method: "DELETE",
  }).then((response) => {
    console.log(response);
    window.location.reload();
  });
};

const Home: NextPage = () => {
  const [alunos, setClientes] = useState([]);

  const columns = [
    {
      id: "cpf",
      name: "CPF",
      selector: (row: any) => row.cpf,
      sortable: true,
      width: "15%",
    },
    {
      id: "nome",
      name: "Nome",
      selector: (row: any) => row.nome,
      sortable: true,
      width: "30%",
    },
    {
      id: "email",
      name: "E-mail",
      selector: (row: any) => row.email,
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
            title="Excluir Cliente"
            description="Tem certeza que deseja excluir esse cliente?"
            onClick={() => deleteCliente(props.id)}
          />
          <AddEditCliente editData={props.id} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/cliente/listar")
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
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
          <h2 className="text-gray-700">Clientes</h2>
          <AddEditCliente />
        </div>

        <div className="mt-8 overflow-x-auto animate-fade-in-up text-gray-700">
          <DataTable
            columns={columns}
            data={alunos}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            pointerOnHover
            noDataComponent={
              <EmptyTable
                title="Não há clientes cadastrados :("
                description="Cadastre um cliente no botão Cadastrar!"
                icon={HiOutlineUserGroup}
              />
            }
          />
        </div>
      </div>
    </Template>
  );
};

export default Home;
