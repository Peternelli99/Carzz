import React, { FormEvent, useState } from "react";

import Input from "@components/form/input";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Meta } from "@templates/meta";
import Button from "@components/elements/button";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    router.push("/admin");
  };

  const { data: session } = useSession();

  return (
    <>
      <Meta title="Login" description="Login | Sistemas venda de carros" />
      <div className="h-screen bg-gradient-to-tr from-primary to-primary-light">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-lg bg-white rounded-2xl px-4 py-8 md:px-8 md:py-12 overflow-hidden">
            <h3 className="relative z-0 mb-8 text-gray-700 font-bold text-3xl lg:text-4xl">
              Login
            </h3>
            <form
              className="relative z-0 flex flex-col space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="E-mail:"
                id="email"
                type="email"
                errors={errors.email?.message}
                {...register("email", {
                  required: "Obrigatório",
                })}
                required
              />

              <Input
                label="Senha:"
                id="password"
                type="password"
                errors={errors.password?.message}
                {...register("password", {
                  required: "Obrigatório",
                })}
                required
              />
              <div className="mt-4 self-end">
                <Button type="submit" variant="primary">
                  Entrar
                </Button>
              </div>
            </form>
          </div>

          <div className="links"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
