import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import Button from "@components/elements/button";
import Input from "@components/form/input";
// modal
import FooterModal from "../footer";
import HeaderModal from "../header";
import Modal from "../modal";
import { Select } from "@components/form/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiOutlinePencilAlt } from "react-icons/hi";

export interface AddComprarCarroProps {
  editData?: Inputs;
}

type Inputs = {
  id?: number;
  nome: string;
  // codigo: string;
  concessionaria: string;
  vendedor: string;
  carro: string;
  cliente: string;
};

const AddComprarCarro: React.FC<AddComprarCarroProps> = ({ editData }) => {
  const [show, setShow] = useState(false);

  function handleEditOpen() {
    setShow(true);
    console.log(editData);

    setValue("nome", editData?.nome ? editData.nome : "");
    setConcessionaria(editData?.concessionaria ? editData.concessionaria : "");
    setVendedor(editData?.vendedor ? editData.vendedor : "");
  }

  function handleClose() {
    setShow(false);
    reset();
  }

  const [vendedor, setVendedor] = useState("");
  const [vendedores, setVendedores] = useState<any>([]);

  const [concessionaria, setConcessionaria] = useState("");
  const [registros, setRegistros] = useState<any>([]);

  const [carro, setCarro] = useState("");
  const [carros, setCarros] = useState<any>([]);

  const [cliente, setCliente] = useState("");
  const [clientes, setClientes] = useState<any>([]);

  let options = registros.map(function (registro: any) {
    return { value: registro.nome?.toString(), id: registro.id };
  });

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

  useEffect(() => {
    fetch("http://localhost:8080/api/carro/listar")
      .then((response) => response.json())
      .then((data) => {
        console.log("dataCarros que vem o back", data);
        setCarros(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let optionsCarros = carros.map(function (carro: any) {
    return { value: carro.nome?.toString(), id: carro.id };
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/cliente/listar")
      .then((response) => response.json())
      .then((data) => {
        console.log("data Clientes que vem o back", data);
        setClientes(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let optionsClientes = clientes.map(function (cliente: any) {
    return { value: cliente.nome?.toString(), id: cliente.id };
  });

  let optionsVendedores = vendedores.map(function (vendedor: any) {
    return { value: vendedor.nome.toString(), id: vendedor.id };
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/vendedor/listar")
      .then((response) => response.json())
      .then((data) => {
        setVendedores(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const schema = yup.object({
    // nome: yup.string().required("Campo obrigatório"),
    // carro: yup.string().required("Campo obrigatório"),
    // cliente: yup.string().required("Campo obrigatório"),
    // concessionaria: yup.string().required("Campo obrigatório"),
    // vendedor: yup.string().required("Campo obrigatório"),
  });

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    editData !== undefined ? editCarro(Number(editData), data) : addCarro(data);

    setShow(false);
    reset();
  };

  const addCarro = async (e: Inputs) => {
    console.log("e diego", e);
    var carro = registros.filter((obj: any) => {
      return obj.id == e.nome;
    });
    carro = carro[0];
    console.log("carro diego", carro);
    const data = {
      cliente: {
        id_cliente: cliente,
      },
      carro: {
        id_carro: carro?.id,
        nome: carro.nome,
      },
      nome: carro.nome,
    };

    let response = await fetch(`http://localhost:8080/api/comprar/comprar`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data enviando", data);
        //window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editCarro = async (id: number, data: Inputs) => {
    var carro = carros.filter((obj: any) => {
      return obj.id == data.carro;
    });
    carro = carro[0];

    console.log("clientes", clientes);
    var cliente = clientes.filter((obj: any) => {
      return obj.id == data.cliente;
    });
    cliente = cliente[0];

    console.log("data", data);
    console.log("cliente", cliente);
    console.log("carro", carro);
    //  data.nome, cliente, id);


    const compraObj = {
      cliente: cliente,
      carro: carro,
      nome: carro.nome,
    };

    let response = await fetch(
      `http://localhost:8080/api/comprar/editar/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(compraObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      {editData !== undefined ? (
        <button
          type="button"
          className="text-primary p-1 hover:bg-gray-50 rounded-full transition duration-200"
          onClick={handleEditOpen}
        >
          <HiOutlinePencilAlt size={18} />
        </button>
      ) : (
        <Button variant="primary" onClick={() => setShow(true)}>
          Comprar Carro
        </Button>
      )}
      {show && (
        <>
          <Modal>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HeaderModal
                title={
                  editData !== undefined ? "Editar Carro" : "Comprar Carro"
                }
                setClose={handleClose}
              />
              <div className="grid gap-3 px-4 py-6">
                {/* <Input
                  label="Nome:"
                  id="nome"
                  type="text"
                  placeholder="Digite o nome"
                  errors={errors.nome?.message}
                  {...register("nome")}
                /> */}
                <Select
                  label="Carro:"
                  placeholder="Selecione o carro para comprar"
                  options={optionsCarros}
                  onClick={(e) => {
                    setValue("carro", e.currentTarget.id);
                    setCarro(e.currentTarget.id);
                  }}
                  selected={carro}
                  errors={errors.nome?.message}
                />
                <Select
                  label="Cliente:"
                  placeholder="Selecione o cliente que vai comprar o carro"
                  options={optionsClientes}
                  onClick={(e) => {
                    setValue("cliente", e.currentTarget.id);
                    setCliente(e.currentTarget.id);
                  }}
                  selected={cliente}
                  errors={errors.nome?.message}
                />
              </div>
              <FooterModal
                submit={editData !== undefined ? "Editar" : "Cadastrar"}
                variant={editData !== undefined ? "primary" : "success"}
                setClose={handleClose}
              />
            </form>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddComprarCarro;
