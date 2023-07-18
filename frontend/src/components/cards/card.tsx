import Button from "@components/elements/button";
import Modal from "@components/modal/modal";
import Link from "next/link";
import { IconBaseProps } from "react-icons";

export interface CardProps {
  id: string;
  title: string;
  href: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Card: React.FC<CardProps> = ({ id, title, href, icon: Icon }) => {
  return (
    <>
      <div className="card-white text-gray-700">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-200 p-4 text-primary">
            <Icon size={24} />
          </div>
          <div className="w-full bg-white p-6 flex flex-col items-center">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <div className="w-3/4 lg:w-full mt-4 mb-4 rounded-none"></div>
            <Button>
              <Link href={href}>
                <a>Gerenciar</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
