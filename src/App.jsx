import React, { useState } from 'react';
import { 
  DollarSign, Users, AlertTriangle, Wallet, PlusCircle, 
  CheckCircle2, Clock, XCircle, Phone, FileText, ChevronRight 
} from 'lucide-react';

export default function App() {
  // Mock Data Inicial
  const [metrics] = useState({
    totalEmprestado: 45800.00,
    lucroPrevisto: 9200.00,
    inadimplencia: 3400.00,
    caixaDisponivel: 12500.00
  });

  const [clientes, setClientes] = useState([
    { id: 1, nome: "Carlos Silva", apelido: "Carlinhos Pneus", telefone: "11999998888", risco: "Baixo", limite: 5000 },
    { id: 2, nome: "Marcos Oliveira", apelido: "Marquinhos Auto", telefone: "11988887777", risco: "Médio", limite: 3000 },
    { id: 3, nome: "Julio Cesar", apelido: "Julinho Informática", telefone: "11977776666", risco: "Alto", limite: 1500 },
  ]);

  const [parcelas, setParcelas] = useState([
    { id: 1, cliente: "Carlos Silva", valor: 1250.00, vencimento: "2026-09-20", status: "Pendente", juros: "10% a.m." },
    { id: 2, cliente: "Marcos Oliveira", valor: 850.00, vencimento: "2026-09-12", status: "Atrasado", juros: "12% a.m." },
    { id: 3, cliente: "Julio Cesar", valor: 600.00, vencimento: "2026-09-15", status: "Pago", juros: "15% a.m." },
  ]);

  const [abaAtiva, setAbaAtiva] = useState('dashboard');

  const darBaixa = (id) => {
    setParcelas(parcelas.map(p => p.id === id ? { ...p, status: 'Pago' } : p));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
              <Wallet className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide">CashFlow <span className="text-emerald-400">Pro</span></h1>
              <p className="text-xs text-slate-500">Gestão & Capital</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setAbaAtiva('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${abaAtiva === 'dashboard' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/60'}`}
            >
              <DollarSign className="w-4 h-4" /> Visão Geral
            </button>
            <button 
              onClick={() => setAbaAtiva('clientes')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${abaAtiva === 'clientes' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/60'}`}
            >
              <Users className="w-4 h-4" /> Mutuários (Clientes)
            </button>
            <button 
              onClick={() => setAbaAtiva('parcelas')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${abaAtiva === 'parcelas' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/60'}`}
            >
              <Clock className="w-4 h-4" /> Controle de Parcelas
            </button>
          </nav>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1">Sistema Ativo</p>
          <p className="text-emerald-400 flex items-center gap-1">● Servidor Online</p>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {abaAtiva === 'dashboard' && 'Painel de Controle'}
              {abaAtiva === 'clientes' && 'Gestão de Clientes'}
              {abaAtiva === 'parcelas' && 'Controle de Parcelas & Vencimentos'}
            </h2>
            <p className="text-sm text-slate-400">Acompanhe de perto o fluxo de recebimentos e capital rodando.</p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/10">
            <PlusCircle className="w-4 h-4" /> Novo Empréstimo
          </button>
        </header>

        {/* Visão Geral (Dashboard) */}
        {abaAtiva === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs font-medium text-slate-400">Capital Emprestado</span>
                <p className="text-2xl font-bold text-slate-100 mt-2">R$ {metrics.totalEmprestado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs font-medium text-slate-400">Lucro Previsto</span>
                <p className="text-2xl font-bold text-emerald-400 mt-2">R$ {metrics.lucroPrevisto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs font-medium text-slate-400">Total em Atraso</span>
                <p className="text-2xl font-bold text-rose-500 mt-2">R$ {metrics.inadimplencia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs font-medium text-slate-400">Caixa Disponível</span>
                <p className="text-2xl font-bold text-sky-400 mt-2">R$ {metrics.caixaDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            {/* Resumo de Parcelas na Home */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Vencimentos Próximos</h3>
              <div className="divide-y divide-slate-800">
                {parcelas.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{p.cliente}</p>
                      <p className="text-xs text-slate-500">Vencimento: {p.vencimento} • Juros: {p.juros}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-sm">R$ {p.valor.toFixed(2)}</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        p.status === 'Pago' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        p.status === 'Pendente' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Clientes */}
        {abaAtiva === 'clientes' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase">
                    <th className="pb-3 font-semibold">Nome / Apelido</th>
                    <th className="pb-3 font-semibold">Telefone / WhatsApp</th>
                    <th className="pb-3 font-semibold">Risco</th>
                    <th className="pb-3 font-semibold">Limite Informal</th>
                    <th className="pb-3 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {clientes.map(c => (
                    <tr key={c.id} className="hover:bg-slate-800/40">
                      <td className="py-4 font-medium">{c.nome} <span className="text-xs text-slate-500 block">({c.apelido})</span></td>
                      <td className="py-4 text-slate-300">
                        <a href={`https://wa.me/55${c.telefone}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline">
                          <Phone className="w-3.5 h-3.5" /> {c.telefone}
                        </a>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${c.risco === 'Baixo' ? 'bg-emerald-500/10 text-emerald-400' : c.risco === 'Médio' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}`}>
                          {c.risco}
                        </span>
                      </td>
                      <td className="py-4 text-slate-300">R$ {c.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td className="py-4 text-right">
                        <button className="text-slate-400 hover:text-white text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">Ver Perfil</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Controle de Parcelas */}
        {abaAtiva === 'parcelas' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase">
                    <th className="pb-3 font-semibold">Mutuário</th>
                    <th className="pb-3 font-semibold">Valor da Parcela</th>
                    <th className="pb-3 font-semibold">Vencimento</th>
                    <th className="pb-3 font-semibold">Taxa / Juros</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Ação Rápida</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {parcelas.map(p => (
                    <tr key={p.id} className="hover:bg-slate-800/40">
                      <td className="py-4 font-medium">{p.cliente}</td>
                      <td className="py-4 font-bold text-slate-100">R$ {p.valor.toFixed(2)}</td>
                      <td className="py-4 text-slate-300">{p.vencimento}</td>
                      <td className="py-4 text-slate-400">{p.juros}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          p.status === 'Pago' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          p.status === 'Pendente' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {p.status !== 'Pago' ? (
                          <button 
                            onClick={() => darBaixa(p.id)}
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                          >
                            Dar Baixa (Pago)
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500 flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Quitado
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
