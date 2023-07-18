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

export interface AddEditClienteProps {
  editData?: Inputs;
}

type Inputs = {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
};

const AddEditCliente: React.FC<AddEditClienteProps> = ({ editData }) => {
  const [show, setShow] = useState(false);

  function handleEditOpen() {
    setShow(true);
    console.log(editData);

    setValue("nome", editData?.nome ? editData.nome : "");
    setValue("email", editData?.email ? editData.email : "");
    setValue("cpf", editData?.cpf ? editData.cpf : "");
  }

  function handleClose() {
    setShow(false);
    reset();
  }

  const schema = yup.object({
    nome: yup.string().required("Campo obrigatório"),
    email: yup.string().email().required("Campo obrigatório"),
    cpf: yup.string().required("Campo obrigatório"),
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
    console.log(editData)
    editData !== undefined
      ? editCliente(Number(editData), data)
      : addCliente(data);

    setShow(false);
    reset();
  };

  const addCliente = async (data: Inputs) => {

    let response = await fetch(`http://localhost:8080/api/cliente/cadastrar`, {
      method: "POST",
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
      }),
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

  const editCliente = async (id: number, data: Inputs) => {
    console.log( data.nome, data.email, data.cpf, id)
    
    let response = await fetch(`http://localhost:8080/api/cliente/editar/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
      }),
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
          Cadastrar
        </Button>
      )}
      {show && (
        <>
          <Modal>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HeaderModal
                title={
                  editData !== undefined ? "Editar Cliente" : "Cadastrar Cliente"
                }
                setClose={handleClose}
              />
              <div className="grid gap-3 px-4 py-6">
                <Input
                  label="Nome:"
                  id="nome"
                  type="text"
                  placeholder="Digite o nome"
                  errors={errors.nome?.message}
                  {...register("nome")}
                />
                <Input
                  label="Email:"
                  id="email"
                  type="email"
                  placeholder="Digite o email"
                  errors={errors.email?.message}
                  {...register("email")}
                />
                <Input
                  label="CPF:"
                  id="cpf"
                  type="text"
                  placeholder="Digite a cpf"
                  errors={errors.cpf?.message}
                  {...register("cpf")}
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

export default AddEditCliente;
