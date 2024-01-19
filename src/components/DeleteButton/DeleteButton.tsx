import React from "react";

interface DeleteButtonProps {
    onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({onClick}) => {
    return (
        <img src={require('./../../imgs/delete.png')} alt="Delete Icon" onClick={onClick} width="60" height="60"/>
    );
};

export default DeleteButton;
