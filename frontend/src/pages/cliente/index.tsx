import Card from "@components/cards/card";
import Button from "@components/elements/button";
import Navbar from "@components/navigation/navbar";
import { NavbarClienteLinks } from "@utils/data";
import type { NextPage } from "next";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { HiOutlineBookOpen, HiOutlineUserGroup } from "react-icons/hi";
import { Meta } from "../../templates/meta";
import { Template } from "../../templates/template";
/* utils */
import { paginationComponentOptions } from "@utils/table";
import { EmptyTable } from "@components/empty/table";
import { useEffect, useState } from "react";

const columns = [
  // {
  //   id: "codigo",
  //   name: "Código",
  //   selector: (row: any) => row.codigo,
  //   sortable: true,
  // },
  {
    id: "nome",
    name: "Nome",
    selector: (row: any) => row.nome,
    sortable: true,
    width: "50%",
  },
  // {
  //   id: "vendedor",
  //   name: "Vendedor",
  //   selector: (row: any) => row.vendedor?.nome,
  //   sortable: true,
  // },
];

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
          description="Acompanhe seus carros"
          image="/img/banner/logo.png"
          imageAlt=""
        />
      }
    >
      <Navbar links={NavbarClienteLinks} />
      <div className="container py-16">
        <h1 className="text-gray-700 text-center">Bem Vindo</h1>
        <div className="w-full mt-12 flex items-start gap-6">
          <div className="card-white pb-8">
            <div className="flex justify-between items-center">
              <Button variant="primary">
                <Link href="/cliente/comprar">
                  <a>Comprar</a>
                </Link>
              </Button>
            </div>
            <br />
            <DataTable
              columns={columns}
              data={carros}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              highlightOnHover
              pointerOnHover
              noDataComponent={
                <EmptyTable
                  title="Não há carros"
                  description="Consulte a loja para comprar os carros!"
                  icon={HiOutlineBookOpen}
                />
              }
            />
          </div>
          {/*  */}
          <div className="w-3/4 flex flex-col gap-6">
            <div className="card-white flex flex-col items-center justify-center">
              <div className="bg-gray-200 rounded-full p-4 text-primary">
                <HiOutlineUserGroup size={24} />
              </div>
              <p className="mt-6 text-xl font-semibold text-gray-900">
                Nome do Cliente
              </p>
              <p className="text-gray-600 text-sm">
                nome.cliente@gmail.com
              </p>
              <br />
              <Button variant="outline">
                <Link href="/cliente/perfil">
                  <a>Perfil</a>
                </Link>
              </Button>
            </div>
            <Card
              id="cliente-carros"
              title="Carros"
              icon={HiOutlineBookOpen}
              href="/cliente/carros"
            />
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Home;
