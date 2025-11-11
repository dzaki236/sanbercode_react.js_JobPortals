
import { Card as Carding } from "flowbite-react";

export function Card(props) {
    return (
        <Carding href="#" className="max-w-sm">
            {props.children}
        </Carding>
    );
}
