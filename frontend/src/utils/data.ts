import {
  HiCreditCard,
    HiOutlineBookOpen,
    HiOutlineBriefcase,
    HiOutlineFolderOpen,
    HiOutlineGlobe,
    HiOutlineOfficeBuilding,
    HiOutlineUserGroup,
  } from "react-icons/hi";
    
  export const NavbarAdminLinks = [
    {
      id: "home",
      title: "Menu",
      href: "/admin",
    },
    {
      id: "concessionarias",
      title: "Concessionárias",
      href: "/admin/concessionarias",
    },
    {
      id: "marcas",
      title: "Marcas",
      href: "/admin/marcas",
    },
    {
      id: "carros",
      title: "Carros",
      href: "/admin/carros",
    },
    {
      id: "vendedores",
      title: "Vendedores",
      href: "/admin/vendedores",
    },
    {
      id: "clientes",
      title: "Clientes",
      href: "/admin/clientes",
    },
  ];

  export const NavbarClienteLinks = [
    {
      id: "home",
      title: "Menu",
      href: "/cliente",
    },
    {
      id: "carros",
      title: "Carros",
      href: "/cliente/carros",
    },
  ];
  
  export const Cards = [
    {
      id: "concessionaria",
      title: "Concessionárias",
      icon: HiOutlineOfficeBuilding,
      href: "/admin/concessionarias",
    },
    {
      id: "marca",
      title: "Marcas",
      icon: HiOutlineFolderOpen,
      href: "/admin/marcas",
    },
    {
      id: "carros",
      title: "Carros",
      icon: HiOutlineGlobe,
      href: "/admin/carros",
    },
    {
      id: "vendedor",
      title: "Vendedores",
      icon: HiCreditCard, 
      href: "/admin/vendedores",
    },
    {
      id: "cliente",
      title: "Clientes",
      icon: HiOutlineUserGroup,
      href: "/admin/clientes",
    },
  ];
  
  export const Cadastrar = [
    {
      id: "concessionaria",
      title: "Cadastrar Concessionária",
      form: [
        {
          form: "input",
          id: "nome",
          label: "Nome:",
          type: "text",
          placeholder: "Digite o nome",
        },
      ],
    },
    {
      id: "marca",
      title: "Cadastrar Marca",
      form: [
        {
          form: "input",
          id: "nome",
          label: "Nome:",
          type: "text",
          placeholder: "Digite o nome",
        },
      ],
    },
    {
      id: "carro",
      title: "Cadastrar Carro",
      form: [
        {
          form: "input",
          id: "nome",
          label: "Nome:",
          type: "text",
          placeholder: "Digite o nome",
        },
      ],
    },
    {
      id: "vendedor",
      title: "Cadastrar Vendedor",
      form: [
        {
          form: "input",
          id: "nome",
          label: "Nome:",
          type: "text",
          placeholder: "Digite o nome",
        },
      ],
    },
    {
      id: "cliente",
      title: "Cadastrar Cliente",
      form: [
        {
          form: "input",
          id: "nome",
          label: "Nome:",
          type: "text",
          placeholder: "Digite o nome",
        },
      ],
    },
  ];
  