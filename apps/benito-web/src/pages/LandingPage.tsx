import {Button} from "@nextui-org/react";
import {Link} from "react-router-dom";

export const LandingPage = () => {
  return (
      <div>
          <div style={{height: "calc(100vh - 64px)"}}
               className={"relative bg-center bg-cover w-full bg-[url('/bg-home-inspiring.png')]"}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-3">
                  <p className={"font-bold text-white text-2xl"}>Juntos podemos transformar o mundo</p>
                  <Link to="/home/needs">
                      <Button color="primary" size="md" className={"font-bold text-xl w-36 bg-black hover:bg-gray-900"}>
                          Doar
                      </Button>
                  </Link>
              </div>
          </div>
      </div>
  )
};
