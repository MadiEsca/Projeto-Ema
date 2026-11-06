from pathlib import Path
import os

from flask import Flask, render_template, send_from_directory


BASE_DIR = Path(__file__).resolve().parent
app = Flask(
    __name__,
    template_folder=BASE_DIR / "templates",
    static_folder=BASE_DIR / "static",
)


@app.get("/dashboard")
def dashboard():
    return render_template(
        "dashboard.html",
        user={"name": "Marina Silva", "first_name": "Marina"},
        current_date="10 nov. 2026",
    )


@app.get("/")
def landing():
    return render_template("landing.html")


@app.get("/development/<feature>")
def development(feature):
    features = {
        "goals": {
            "title": "Metas",
            "eyebrow": "Planejamento pessoal",
            "description": "Estamos desenhando uma forma simples de transformar seus planos em metas acompanháveis, sem pressão e sem complicação.",
            "symbol": "◎",
            "step": "Definição de objetivos",
        },
        "accounts": {
            "title": "Contas e cartões",
            "eyebrow": "Central financeira",
            "description": "Em breve você poderá organizar contas, cartões e saldos em um único lugar, com mais contexto para cada decisão.",
            "symbol": "▣",
            "step": "Conexões seguras",
        },
        "settings": {
            "title": "Configurações",
            "eyebrow": "Preferências do Ema",
            "description": "Estamos preparando uma área para você ajustar notificações, privacidade e a experiência do Ema ao seu jeito.",
            "symbol": "✦",
            "step": "Personalização",
        },
    }
    selected = features.get(feature, features["settings"])
    return render_template(
        "development.html",
        user={"name": "Marina Silva", "first_name": "Marina"},
        current_date="10 nov. 2026",
        feature=selected,
    )


@app.get("/reports")
def reports():
    report_data = {
        "period": "01 out — 10 nov. 2026",
        "total": "R$ 5.286,32",
        "daily_average": "R$ 176,21",
        "largest_category": "Casa",
        "largest_share": "36%",
        "change": "3,2%",
        "services_paid_total": "R$ 2.634,90",
        "services_pending_total": "R$ 436,60",
        "services": [
            {"name": "Aluguel do apartamento", "vendor": "Imobiliária Central", "due": "05 nov. 2026", "category": "Casa", "status": "paid", "status_label": "Pago", "amount": "R$ 1.850,00", "tone": "home"},
            {"name": "Supermercado Pão de Açúcar", "vendor": "Compras do mês", "due": "04 nov. 2026", "category": "Alimentação", "status": "paid", "status_label": "Pago", "amount": "R$ 462,73", "tone": "food"},
            {"name": "Netflix Premium", "vendor": "Renovação automática", "due": "12 nov. 2026", "category": "Assinaturas", "status": "pending", "status_label": "A pagar", "amount": "R$ 55,90", "tone": "subscription"},
            {"name": "Plano de celular", "vendor": "Claro Pós", "due": "15 nov. 2026", "category": "Serviços", "status": "pending", "status_label": "A pagar", "amount": "R$ 89,90", "tone": "service"},
            {"name": "Plano anual de academia", "vendor": "Smart Fit", "due": "02 nov. 2026", "category": "Lazer", "status": "paid", "status_label": "Pago", "amount": "R$ 299,90", "tone": "leisure"},
            {"name": "Energia elétrica", "vendor": "Enel São Paulo", "due": "20 nov. 2026", "category": "Casa", "status": "pending", "status_label": "A pagar", "amount": "R$ 174,80", "tone": "home"},
        ],
        "categories": [
            {"name": "Casa", "amount": "R$ 1.903,08", "percent": 36, "delta": "− 4,8%", "tone": "home", "description": "Aluguel, contas e manutenção"},
            {"name": "Alimentação", "amount": "R$ 1.269,12", "percent": 24, "delta": "+ 8,1%", "tone": "food", "description": "Mercado, restaurantes e delivery"},
            {"name": "Transporte", "amount": "R$ 951,54", "percent": 18, "delta": "− 2,4%", "tone": "transport", "description": "Combustível, apps e passagens"},
            {"name": "Lazer", "amount": "R$ 634,36", "percent": 12, "delta": "+ 12,6%", "tone": "leisure", "description": "Cultura, viagens e assinaturas"},
            {"name": "Outros", "amount": "R$ 528,22", "percent": 10, "delta": "− 1,2%", "tone": "other", "description": "Compras e despesas diversas"},
        ],
        "top_expenses": [
            {"name": "Aluguel do apartamento", "category": "Casa", "date": "08 nov. 2026", "amount": "R$ 1.850,00", "tone": "home"},
            {"name": "Supermercado Pão de Açúcar", "category": "Alimentação", "date": "04 nov. 2026", "amount": "R$ 462,73", "tone": "food"},
            {"name": "Plano anual de academia", "category": "Lazer", "date": "02 nov. 2026", "amount": "R$ 299,90", "tone": "leisure"},
            {"name": "Uber e 99", "category": "Transporte", "date": "01 nov. 2026", "amount": "R$ 184,60", "tone": "transport"},
        ],
    }
    return render_template(
        "reports.html",
        user={"name": "Marina Silva", "first_name": "Marina"},
        current_date="10 nov. 2026",
        report=report_data,
    )


@app.get("/shortcuts")
def shortcuts():
    shortcut_data = {
        "accounts": [
            {"name": "Conta principal", "institution": "Itaú Unibanco", "last4": "4821", "tone": "orange"},
            {"name": "Conta digital", "institution": "Nubank", "last4": "9034", "tone": "purple"},
        ],
        "banks": [
            {"name": "Itaú Unibanco", "tone": "orange", "available": True},
            {"name": "Nubank", "tone": "purple", "available": True},
            {"name": "Banco Inter", "tone": "orange-light", "available": True},
        ],
        "recent_imports": [
            {"name": "extrato_itau_outubro.ofx", "date": "06 nov. 2026", "rows": "42 lançamentos", "status": "Importado"},
            {"name": "movimentacoes_nubank.csv", "date": "28 out. 2026", "rows": "28 lançamentos", "status": "Importado"},
        ],
    }
    return render_template(
        "shortcuts.html",
        user={"name": "Marina Silva", "first_name": "Marina"},
        current_date="10 nov. 2026",
        shortcuts=shortcut_data,
    )


@app.get("/roas.json")
def rotas():
    return send_from_directory(BASE_DIR / "public", "rotas.json")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "3000"))
    app.run(host="0.0.0.0", port=port, debug=False)
