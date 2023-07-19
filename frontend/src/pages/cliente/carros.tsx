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
import { useState } from "react";

const columns = [
  {
    id: "nome",
    name: "Nome",
    selector: (row: any) => row.nome,
    sortable: true,
  },
  {
    id: "registro",
    name: "Concessionárias",
    selector: (row: any) => row.concessionaria,
    sortable: true,
  },
  {
    id: "vendedor",
    name: "Vendedor",
    selector: (row: any) => row?.vendedor,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    nome: "Palio Fire",
    concessionaria: "Lavelli",
    vendedor: "Antônio Maria",
  },
  {
    id: 2,
    nome: "Fiat Argo",
    concessionaria: "Roma",
    vendedor: "Leonidas",
  },
];

const Home: NextPage = () => {
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
            data={data}
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
