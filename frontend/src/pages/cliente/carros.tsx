import type { NextPage } from "next";
import { HiOutlineBookOpen } from "react-icons/hi";
/* templates */
import { Meta } from "@templates/meta";
import { Template } from "@templates/template";
/* utils */
import { paginationComponentOptions } from "@utils/table";
/* components */
import DataTable from "react-data-table-component";
import { EmptyTable } from "@components/empty/table";
import { NavbarClienteLinks } from "@utils/data";
import Navbar from "@components/navigation/navbar";
import Button from "@components/elements/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const columns = [
  // {
  //   id: "codigo",
  //   name: "Código",
  //   selector: (row: any) => row.id,
  //   sortable: true,
  //   width: "10%",
  // },
  {
    id: "id_carro",
    name: "id do carro",
    selector: (row: any) => row.carro.id,
    sortable: true,
  },
  {
    id: "nome",
    name: "Nome do carro",
    selector: (row: any) => row.carro.nome,
    sortable: true,
  },
  {
    id: "cliente",
    name: "Cliente (dono)",
    selector: (row: any) => row.cliente.nome,
    sortable: true,
  },
  {
    id: "cliente",
    name: "Id do cliente",
    selector: (row: any) => row.cliente.id,
    sortable: true,
  },
];



const Home: NextPage = () => {
  const [carrosComprados, setCarrosComprados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/comprar/listar")
      .then((response) => response.json())
      .then((data) => {
        console.log("carros comprados", data);
        setCarrosComprados(data);
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
      <Navbar links={NavbarClienteLinks} />
      <div className="container py-16">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-gray-700">Carros</h2>
            <p className="mt-2 text-sm text-gray-500">Carros comprados</p>
          </div>
          <Button variant="primary">
            <Link href="/cliente/comprar">
              <a>Comprar</a>
            </Link>
          </Button>
        </div>

        <div className="mt-8 overflow-x-auto animate-fade-in-up text-gray-700">
          <DataTable
            columns={columns}
            data={carrosComprados}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            pointerOnHover
            noDataComponent={
              <EmptyTable
                title="Não há carros cadastrados :("
                description="Compre um carro no botão Comprar!"
                icon={HiOutlineBookOpen}
              />
            }
          />
        </div>
      </div>
    </Template>
  );
};

export default Home;
