import Card from "@components/cards/card";
import Navbar from "@components/navigation/navbar";
import { Cards, NavbarAdminLinks } from "@utils/data";
import type { NextPage } from "next";
import { Meta } from "../../templates/meta";
import { Template } from "../../templates/template";

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
      <Navbar links={NavbarAdminLinks} />
      <div className="container py-16">
        <h1 className="text-gray-700 text-center">Olá</h1>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {Cards.map((card) => (
            <Card id={card.id} title={card.title} icon={card.icon} href={card.href} />
          ))}
        </div>
      </div>
    </Template>
  );
};

export default Home;
