import "./Input.css";

function Input({ type = 'text', value, onChange, placeholder, ...props }){
    return(
        <input
            type={type}
            value= {value}
            onChange= {onChange}
            placeholder={placeholder}
            className="input"
            {...props} //props contiene todas las demas propiedades que no fueron pasadas como parametro    
        />
    );
}

export default Input;