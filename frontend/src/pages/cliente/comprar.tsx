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
import { EmptyTable } from "@components/empty/table";
import { NavbarClienteLinks } from "@utils/data";
import Navbar from "@components/navigation/navbar";
import Button from "@components/elements/button";
import Link from "next/link";
import AddComprarCarro from "@components/modal/form/comprar";

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
    id: "concessionaria",
    name: "Concessionaria",
    selector: (row: any) => row.concessionaria?.nome,
    sortable: true,
  },
  {
    id: "vendedor",
    name: "Vendedor",
    selector: (row: any) => row.vendedor?.nome,
    sortable: true,
  },
];
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
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
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

  // let optionsCarros = carros.map(function (carro: any) {
  //   return { value: carro.nome, id: carro.id };
  // });

  let carroId = selectedRows.map(function (carro: any) {
    return {id: carro.id };
  });

  // let ids = selectedRows.map(function (carro: any) {
  //   return {idCarro: id};
  // });

  const handleChange = ({ selectedRows }: any) => {
    setSelectedRows(selectedRows);
    // console.log("optionCarrosID", optionsCarros);
    console.log("selectedRows", selectedRows);
    // console.log("id carro", carroId );
    // console.log("id id id", ids );
    // addCarro(selectedRows.id)
  };

  type Inputs = {
    cliente: object;
    carro: object;
    nome: string;
  };

  const addCarro = async (data: Inputs) => {
    let response = await fetch(`http://localhost:8080/api/comprar/comprar`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleConfirmClick = () => {
    if (selectedRows && selectedRows.length > 0) {
      // Filter out any null or undefined rows before mapping
      const filteredRows = selectedRows.filter((row) => row !== null && row !== undefined);
  
      // Map over the filteredRows and extract the necessary data
      const data = {
        cliente: {
          id: "1"
        },
        carro: {
          id: filteredRows[0].id,
          nome: filteredRows[0].nome
        },
        nome: filteredRows[0].nome
      };
  
      addCarro(data);
    } else {
      console.log("No selected rows to confirm.");
    }
  };

  // {
  //   "cliente": {
  //     "id": 1
  //   },
  //   "carro": {
  //     "id": 1,
  //     "nome": "ford Ka"
  //   },
  //   "nome": "ford Ka"
  // }

  return (
    <Template
      meta={
        <Meta
          title=""
          description="Administre suas funcionalidades"
          image="/img/banner/logo.png"
          imageAlt=""
        />
      }
    >
      <Navbar links={NavbarClienteLinks} />
      <div className="container py-16">
        <h2 className="text-gray-700">Comprar Carros</h2>
        <p className="mt-2 text-sm text-gray-500">
          Selecione os carros para comprar
        </p>

        <div className="mt-8 w-full flex lg:items-start gap-6 flex-col lg:flex-row">
          <div className="card-white overflow-x-auto animate-fade-in-up text-gray-700">
            <DataTable
              columns={columns}
              data={carros}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              highlightOnHover
              pointerOnHover
              selectableRows
              onSelectedRowsChange={handleChange}
              noDataComponent={
                <EmptyTable
                  title="Não há carros cadastrados :("
                  description="Cadastre um carro no botão Cadastrar!"
                  icon={HiOutlineBookOpen}
                />
              }
            />
          </div>

          <div className="card-white flex flex-col w-full lg:w-1/3">
            <h4>Carros Comprados</h4>
            {selectedRows.length == 1 && (
              <p>{selectedRows.length} selecionada</p>
            )}
            {selectedRows.length > 1 && (
              <p>{selectedRows.length} selecionados</p>
            )}

            <div className="w-3/4 lg:w-full border-b border-gray-300 mt-4 mb-6"></div>

            {selectedRows.length > 0 ? (
              <ul>
                {selectedRows.map((row) => (
                  <li key={row.id}>
                    {row?.codigo} - {row?.nome}
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p>Não há carros selecionados</p>
              </div>
            )}

            <div className="self-end mt-8">
              <Button variant="primary" onClick={handleConfirmClick}>
                {/* <Link href="/cliente"> */}
                <a>Confirmar</a>
                {/* </Link> */}
              </Button>
               {/* <AddComprarCarro /> */}
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Home;
