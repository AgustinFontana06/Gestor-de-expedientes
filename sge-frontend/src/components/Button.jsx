import "./Button.css"

function Button({ texto, onClick, type = 'button', children, className }){ //el atributo children es el que estara dentro de la etiqueta
    return(
        <button type ={type} onClick={onClick} className={className}>
            {children || texto}
        </button>
    );
};

export default Button;