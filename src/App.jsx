import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Package, ShoppingCart, PlusCircle, 
  CheckCircle2, Clock, Phone, X, AlertTriangle, 
  TrendingUp, ShieldAlert, Send, Sparkles, Trash2, Store
} from 'lucide-react';

export default function App() {
  // Estados salvos no LocalStorage
  const [produtos, setProdutos] = useState(() => {
    const saved = localStorage.getItem('dash_produtos');
    return saved ? JSON.parse(saved) : [
      { id: 1, nome: "Camiseta Oversized Preta", categoria: "Vestuário", custo: 35.00, venda: 89.90, estoque: 15 },
      { id: 2, nome: "Tênis Sneaker Street", categoria: "Calçados", custo: 120.00, venda: 299.90, estoque: 4 },
      { id: 3, nome: "Boné dad hat Minimal", categoria: "Acessórios", custo: 20.00, venda: 59.90, estoque: 22 }
    ];
  });

  const [vendas, setVendas] = useState(() => {
    const saved = localStorage.getItem('dash_vendas');
    return saved ? JSON.parse(saved) : [
      { id: 1, produto: "Camiseta Oversized Preta", qtd: 2, total: 179.80, lucro: 109.80, data: "2026-09-14", pagamento: "PIX" },
      { id: 2, produto: "Boné dad hat Minimal", qtd: 1, total: 59.90, lucro: 39.90, data: "2026-09-14", pagamento: "Crédito" }
    ];
  });

  const [caixaSaldo, setCaixaSaldo] = useState(() => {
    const saved = localStorage.getItem('dash_caixa_saldo');
    return saved ? JSON.parse(saved) : 4850.00;
  });

  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  
  // Modais
  const [modalProdutoOpen, setModalProdutoOpen] = useState(false);
  const [modalVendaOpen, setModalVendaOpen] = useState(false);

  // Form Novo Produto
  const [novoProd, setNovoProd] = useState({ nome: '', categoria: 'Vestuário', custo: '', venda: '', estoque: '' });

  // Form Nova Venda
  const [novaVenda, setNovoVenda] = useState({ produtoId: '', qtd: '1', pagamento: 'PIX' });

  // Salvar LocalStorage
  useEffect(() => {
    localStorage.setItem('dash_produtos', JSON.stringify(produtos));
    localStorage.setItem('dash_vendas', JSON.stringify(vendas));
    localStorage.setItem('dash_caixa_saldo', JSON.stringify(caixaSaldo));
  }, [produtos, vendas, caixaSaldo]);

  // Métricas
  const faturamentoTotal = vendas.reduce((acc, v) => acc + v.total, 0);
  const lucroTotal = vendas.reduce((acc, v) => acc + v.lucro, 0);
  const produtosEstoqueBaixo = produtos.filter(p => p.estoque <= 5).length;

  // Cadastrar Produto
  const handleCadastrarProduto = (e) => {
    e.preventDefault();
    if (!novoProd.nome || !novoProd.venda) return;

    const prodCriado = {
      id: Date.now(),
      nome: novoProd.nome,
      categoria: novoProd.categoria,
      custo: Number(novoProd.custo),
      venda: Number(novoProd.venda),
      estoque: Number(novoProd.estoque)
    };

    setProdutos([...produtos, prodCriado]);
    setNovoProd({ nome: '', categoria: 'Vestuário', custo: '', venda: '', estoque: '' });
    setModalProdutoOpen(false);
  };

  // Registrar Venda (Baixa no estoque e entra no caixa)
  const handleRegistrarVenda = (e) => {
    e.preventDefault();
    const prodObj = produtos.find(p => p.id === Number(novaVenda.produtoId));
    const qtdVendida = Number(novaVenda.qtd);

    if (!prodObj || prodObj.estoque < qtdVendida) {
      alert("Estoque insuficiente para essa venda!");
      return;
    }

    const totalVenda = prodObj.venda * qtdVendida;
    const lucroVenda = (prodObj.venda - prodObj.custo) * qtdVendida;

    // Atualizar estoque
    const produtosAtualizados = produtos.map(p => {
      if (p.id === prodObj.id) {
        return { ...p, estoque: p.estoque - qtdVendida };
      }
      return p;
    });

    const vendaCriada = {
      id: Date.now(),
      produto: prodObj.nome,
      qtd: qtdVendida,
      total: totalVenda,
      lucro: lucroVenda,
      data: new Date().toISOString().split('T')[0],
      pagamento: novaVenda.pagamento
    };

    setProdutos(produtosAtualizados);
    setVendas([vendaCriada, ...vendas]);
    setCaixaSaldo(prev => prev + totalVenda);

    setNovoVenda({ produtoId: '', qtd: '1', pagamento: 'PIX' });
    setModalVendaOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/80 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20">
              <Store className="w-5 h-5 text-slate-950 font-black" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                StockFlow <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-1.5 py-0.5 rounded-full uppercase">PRO</span>
              </h1>
              <p className="text-[11px] text-slate-400">Caixa & Gestão de Lojas</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button 
              onClick={() => setAbaAtiva('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${abaAtiva === 'dashboard' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <TrendingUp className="w-4 h-4" /> Visão Geral & Caixa
            </button>
            <button 
              onClick={() => setAbaAtiva('produtos')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${abaAtiva === 'produtos' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <Package className="w-4 h-4" /> Controle de Estoque ({produtos.length})
            </button>
            <button 
              onClick={() => setAbaAtiva('vendas')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${abaAtiva === 'vendas' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <ShoppingCart className="w-4 h-4" /> Histórico de Vendas
            </button>
          </nav>
        </div>

        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <p className="text-xs font-semibold text-slate-300">Adeus Papel e Caneta</p>
          </div>
          <button 
            onClick={() => setModalProdutoOpen(true)} 
            className="w-full bg-slate-800 hover:bg-slate-700/80 text-slate-200 py-2 rounded-xl text-xs font-semibold border border-slate-700/50 transition-all cursor-pointer"
          >
            + Cadastrar Produto
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-semibold tracking-widest uppercase">Sistema Sem Papel</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Foco em Conversão & Vendas</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-0.5">
              {abaAtiva === 'dashboard' && 'Painel de Controle do Negócio'}
              {abaAtiva === 'produtos' && 'Gestão de Estoque & Produtos'}
              {abaAtiva === 'vendas' && 'Registro de Vendas & Caixa'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setModalVendaOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" /> Registrar Venda (PDV)
            </button>
          </div>
        </header>

        {/* Dashboard */}
        {abaAtiva === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="bg-slate-900/60 backdrop-blur border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Faturamento Total</span>
                <p className="text-3xl font-black text-white mt-4 tracking-tight">R$ {faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold">+{vendas.length}</span> vendas realizadas no período
                </div>
              </div>

              <div className="bg-slate-900/60 backdrop-blur border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-sky-500/40 transition-all">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lucro Líquido Estimado</span>
                <p className="text-3xl font-black text-sky-400 mt-4 tracking-tight">R$ {lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  Margem calculada sobre custo de produtos
                </div>
              </div>

              <div className="bg-slate-900/60 backdrop-blur border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Caixa em Mãos / Saldo</span>
                <p className="text-3xl font-black text-emerald-400 mt-4 tracking-tight">R$ {caixaSaldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  {produtosEstoqueBaixo > 0 ? <span className="text-amber-400 font-semibold">{produtosEstoqueBaixo} produtos com estoque baixo!</span> : 'Estoque regularizado'}
                </div>
              </div>
            </div>

            {/* Vendas Recentes */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-white">Últimas Vendas Registradas</h3>
                <button onClick={() => setAbaAtiva('vendas')} className="text-xs text-emerald-400 hover:underline">Ver histórico completo</button>
              </div>

              <div className="divide-y divide-slate-800/60">
                {vendas.slice(0, 4).map((v) => (
                  <div key={v.id} className="py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 text-emerald-400">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-white">{v.produto} <span className="text-xs text-slate-400 font-normal">({v.qtd} un)</span></p>
                        <p className="text-xs text-slate-500">Forma: {v.pagamento} • Data: {v.data}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-sm text-white">R$ {v.total.toFixed(2)}</span>
                      <span className="text-xs text-emerald-400 block">+ R$ {v.lucro.toFixed(2)} lucro</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Produtos / Estoque */}
        {abaAtiva === 'produtos' && (
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-white">Catálogo & Controle de Estoque</h3>
              <button 
                onClick={() => setModalProdutoOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
              >
                + Novo Produto
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Produto</th>
                    <th className="pb-3 font-semibold">Categoria</th>
                    <th className="pb-3 font-semibold">Preço de Custo</th>
                    <th className="pb-3 font-semibold">Preço de Venda</th>
                    <th className="pb-3 font-semibold text-right">Qtd em Estoque</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {produtos.map(p => (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition-all">
                      <td className="py-4 font-semibold text-white">{p.nome}</td>
                      <td className="py-4 text-slate-400">{p.categoria}</td>
                      <td className="py-4 text-slate-300">R$ {p.custo.toFixed(2)}</td>
                      <td className="py-4 font-bold text-emerald-400">R$ {p.venda.toFixed(2)}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.estoque <= 5 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                          {p.estoque} unidades
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vendas */}
        {abaAtiva === 'vendas' && (
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Produto</th>
                    <th className="pb-3 font-semibold">Quantidade</th>
                    <th className="pb-3 font-semibold">Total Venda</th>
                    <th className="pb-3 font-semibold">Lucro Real</th>
                    <th className="pb-3 font-semibold text-right">Pagamento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {vendas.map(v => (
                    <tr key={v.id} className="hover:bg-slate-800/30 transition-all">
                      <td className="py-4 font-semibold text-white">{v.produto}</td>
                      <td className="py-4 text-slate-300">{v.qtd} un</td>
                      <td className="py-4 font-bold text-white">R$ {v.total.toFixed(2)}</td>
                      <td className="py-4 text-emerald-400 font-semibold">+ R$ {v.lucro.toFixed(2)}</td>
                      <td className="py-4 text-right">
                        <span className="bg-slate-800 border border-slate-700 text-slate-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          {v.pagamento}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Novo Produto */}
      {modalProdutoOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button onClick={() => setModalProdutoOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Cadastrar Novo Produto</h3>
            <form onSubmit={handleCadastrarProduto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nome do Produto</label>
                <input 
                  type="text" required
                  value={novoProd.nome} 
                  onChange={e => setNovoProd({...novoProd, nome: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Ex: Tênis Esportivo"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Preço de Custo (R$)</label>
                  <input 
                    type="number" step="0.01" required
                    value={novoProd.custo} 
                    onChange={e => setNovoProd({...novoProd, custo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    placeholder="50.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Preço de Venda (R$)</label>
                  <input 
                    type="number" step="0.01" required
                    value={novoProd.venda} 
                    onChange={e => setNovoProd({...novoProd, venda: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    placeholder="120.00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Categoria</label>
                  <input 
                    type="text" 
                    value={novoProd.categoria} 
                    onChange={e => setNovoProd({...novoProd, categoria: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Qtd em Estoque</label>
                  <input 
                    type="number" required
                    value={novoProd.estoque} 
                    onChange={e => setNovoProd({...novoProd, estoque: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    placeholder="10"
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all cursor-pointer mt-2 shadow-lg shadow-emerald-500/20">
                Salvar Produto
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Registrar Venda (PDV) */}
      {modalVendaOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button onClick={() => setModalVendaOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Registrar Venda (Caixa)</h3>
            <form onSubmit={handleRegistrarVenda} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Selecionar Produto</label>
                <select 
                  required
                  value={novaVenda.produtoId} 
                  onChange={e => setNovoVenda({...novaVenda, produtoId: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Escolha no estoque...</option>
                  {produtos.map(p => (
                    <option key={p.id} value={p.id}>{p.nome} - R$ {p.venda.toFixed(2)} ({p.estoque} disp.)</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Quantidade</label>
                  <input 
                    type="number" min="1" required
                    value={novaVenda.qtd} 
                    onChange={e => setNovoVenda({...novaVenda, qtd: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Forma de Pagamento</label>
                  <select 
                    value={novaVenda.pagamento} 
                    onChange={e => setNovoVenda({...novaVenda, pagamento: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Crédito">Cartão de Crédito</option>
                    <option value="Débito">Cartão de Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all cursor-pointer mt-2 shadow-lg shadow-emerald-500/20">
                Confirmar Venda & Baixar Estoque
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}