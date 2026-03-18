import React from "react";
import MetaModal from "../../../components/MetaModal";

export default function CardMetas({ meta, onClose }) {
    if (!meta) return null;

    return (
        <div className="bg-black/50 fixed inset-0 flex items-start justify-center z-50 overflow-hidden" >
            <MetaModal meta={meta} onClose={onClose} />
        </div>
    );
}