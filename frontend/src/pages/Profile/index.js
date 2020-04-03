import React from "react";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import { useEffect } from "react";
import api from "../../services/api";
import { useState } from "react";

export default function Profile() {
  const history = useHistory();
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      alert("Caso excluído com sucesso");
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro a excluir caso. Tente novamente.");
    }
  }

  async function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button " to="/incidets/new">
          Cadastrar Novo Caso
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(indicent => (
          <li key={indicent.id}>
            <strong>CASO:</strong>
            <p>{indicent.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{indicent.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(indicent.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(indicent.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
