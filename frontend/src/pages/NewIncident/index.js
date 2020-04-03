import React, { useState } from "react";

import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import CurrencyInput from 'react-currency-input';

export default function NewIncident() {
  const ongId = localStorage.getItem("ongId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0.0);

  const history = useHistory();

  function handleValueChange(event, maskedvalue, floatvalue){
      setValue(floatvalue);
  }

  async function handlerNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      alert("Caso cadastrado com sucesso.");
      history.push("/profile");
    } catch {
      alert("Erro no cadastro, tente novamente");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section className="form">
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um héroi para resolver
            isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handlerNewIncident}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <CurrencyInput value={value} 
            onChangeEvent={handleValueChange}
            decimalSeparator="," 
            thousandSeparator="."
            prefix="R$ "/>

          <div className="button-group">
            <button className="button-back" type="submit">
              Cancelar
            </button>
            <button className="button" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
