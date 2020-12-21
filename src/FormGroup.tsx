import * as React from "react";

// // // //

export function FormGroup(props: { label: string; children: React.ReactNode }) {
    return (
        <div className="mt-5">
            <p className="font-semibold mb-2">{props.label}</p>
            {props.children}
        </div>
    );
}