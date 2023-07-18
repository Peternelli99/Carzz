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

export interface AddEditMarcaProps {
  editData?: Inputs;
}

type Inputs = {
  id?: number;
  nome: string;
  concessionaria: string;
};

const AddEditMarca: React.FC<AddEditMarcaProps> = ({ editData }) => {
  const [show, setShow] = useState(false);

  function handleEditOpen() {
    setShow(true);
    console.log(editData);

    setValue("nome", editData?.nome ? editData.nome : "");
    setConcessionaria(editData?.concessionaria ? editData.concessionaria : "");
  }

  function handleClose() {
    setShow(false);
    reset();
  }

  const [concessionaria, setConcessionaria] = useState("");
  const [registros, setRegistros] = useState<any>([]);

  let options = registros.map(function (registro: any) {
    return { value: registro.nome.toString(), id: registro.id };
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

  const schema = yup.object({
    nome: yup.string().required("Campo obrigatório"),
    concessionaria: yup.string().required("Campo obrigatório"),
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

    editData !== undefined
      ? editMarca(editData.id ? editData.id : 0, data)
      : addMarca(data);

    setShow(false);
    reset();
  };

  const addMarca = async (data: Inputs) => {
    var concessionaria = registros.filter((obj: any) => {
      return obj.id == data.concessionaria;
    });
    concessionaria = concessionaria[0];
    let response = await fetch(`http://localhost:8080/api/marca/cadastrar`, {
      method: "POST",
      body: JSON.stringify({
        nome: data.nome,
        concessionaria: concessionaria,
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

  const editMarca = async (id: number, data: Inputs) => {
    // editar
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
                  editData !== undefined ? "Editar Marca" : "Cadastrar Marca"
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
                <Select
                  label="Concessionária:"
                  placeholder="Selecione a Concessionária"
                  options={options}
                  onClick={(e) => {
                    setValue("concessionaria", e.currentTarget.id);
                    setConcessionaria(e.currentTarget.id);
                  }}
                  selected={concessionaria}
                  errors={errors.concessionaria?.message}
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

export default AddEditMarca;
