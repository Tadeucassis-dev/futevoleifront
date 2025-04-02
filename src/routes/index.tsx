import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import AlunoList from "../pages/AlunoList";
import AlunoForm from "../pages/AlunoForm";
import CheckinList from "../pages/CheckinList";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/alunos" element={<AlunoList />} />
                <Route path="/alunos/novo" element={<AlunoForm />} />
                <Route path="/checkins" element={<CheckinList alunoId={1} />} />
            </Routes>
        </Router>
    );
}