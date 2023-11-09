import {Button} from "@nextui-org/react";
import {Link} from "react-router-dom";

export const LandingPage = () => {
  return (
      <div className={"bg-blend-hard-light bg-gray-600"}>
          <div className={"relative bg-center bg-cover h-[500px] w-full bg-[url('/bg-home-inspiring.png')]"}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-3">
                  <p className={"font-bold text-white text-2xl"}>Juntos podemos transformar o mundo</p>
                  <Link to="/home/organizations">
                      <Button color="primary" size="md" className={"font-bold text-xl w-36 bg-black hover:bg-gray-900"}>
                          Doar
                      </Button>
                  </Link>

              </div>
          </div>
      </div>
  )
};
