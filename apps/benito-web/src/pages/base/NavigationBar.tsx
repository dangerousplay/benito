import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import imgUrl from "../../assets/logo.png";
import {HeartIcon} from "@heroicons/react/20/solid";

const textClass = "font-bold text-white";

export const NavigationBar = () => {
    return (
        <Navbar position="static" className={"bg-black"} >
            <NavbarBrand>
                <img src={imgUrl} width={60} height={60} alt={"Benito logo"} />
                <p className={textClass}>Benito</p>
            </NavbarBrand>

            <NavbarContent justify="end" className={"gap-x-4 justify-end"}>
                <NavbarItem>
                    <Link href="#">
                        <Button color="danger" size="sm" startContent={<HeartIcon className={"w-4"}/>} className={"font-bold text-medium"}>
                            Doar
                        </Button>
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="#" className={textClass}>Sobre nós</Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="#" className={textClass}>Blog</Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="#" className={textClass}>Login</Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
