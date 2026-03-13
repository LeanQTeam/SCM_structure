import { useState, useMemo } from "react";

const MapIcon = ({ name, size = 20, color = "currentColor" }) => {
  const s = size;
  const icons = {
    supplier:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
    truck_in:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    qc:         <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    warehouse:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    release:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>,
    production: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>,
    assembly:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    packaging:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    truck_out:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    customer:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    buy_order:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    buy_stock:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
    make_order: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>,
    assemble:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    pack_order: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    make_stock: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    target:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    chart:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    check:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    pin:        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    map:        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    calc:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/></svg>,
    info:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    box:        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    factory:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>,
  };
  return icons[name] || null;
};

const COLORS = { supply: "#F59E0B", mfg: "#3B82F6", info: "#8B5CF6" };

const TRANS = {
  pl: {
    subtitle: "Logistyka · PG WZiE",
    title: "Struktura Zapasów w Łańcuchu Dostaw",
    langBtn: "EN",
    days: "dni",
    cltLabel: "Customer Lead Time – czas dany przez klienta",
    chipSupply: "Dostawy",
    chipMfg: "Produkcja",
    chipInfo: "Information Flow",
    chipTotal: "Łącznie",
    groupSupply: "Dostawy (Supply)",
    groupMfg: "Produkcja (Manufacturing)",
    groupInfo: "Przepływ informacji (Information Flow)",
    // supply slider labels
    supplierProd: "Produkcja u dostawcy",
    transport: "Transport do firmy",
    qc: "Kontrola jakości dostawy",
    warehouseIn: "Przyjęcie na magazyn",
    // mfg slider labels
    materialRelease: "Wydanie materiałów z magazynu",
    production: "Produkcja / obróbka",
    assembly: "Montaż",
    packaging: "Pakowanie",
    shippingPrep: "Przygotowanie wysyłki",
    transportOut: "Transport do klienta",
    // info slider labels
    customerService: "Obsługa klienta",
    shippingPlanning: "Planowanie wysyłki",
    packagingPlanning: "Planowanie pakowania",
    assemblyPlanning: "Planowanie montażu",
    productionPlanning: "Planowanie produkcji",
    purchasingPlanning: "Planowanie zakupów",
    onlyBTO: "tylko BTO",
    // timeline
    timelineTitle: "Oś czasu łańcucha dostaw",
    execLabel: (n, u) => `Execution Time = ${n} ${u}`,
    cltBarLabel: (n, u) => `Customer LT = ${n} ${u} ← od prawej`,
    decouplingPointLabel: "Punkt odcięcia",
    legSupply: "Dostawy",
    legMfg: "Produkcja",
    legInfo: "Information Flow",
    // strategy result
    strategyTitle: "Rekomendowana strategia",
    beforeCut: "Przed punktem odcięcia",
    afterCut: "Za punktem odcięcia",
    pullKanban: "→ pull od zużycia zapasu (pętle kanban, sygnał uzupełnienia).",
    pullOrder: "→ pull od zamówienia klienta (order-driven).",
    kanbanNote: (n, u) => `Planowanie zakupów obsługuje pętla kanban – nie jest częścią ścieżki krytycznej zamówienia. Czas: ${n} ${u}.`,
    stockTitle: "Miejsca utrzymywania zapasów:",
    // map
    mapTitle: "Mapa łańcucha dostaw",
    mapSub: "Górny pas: przepływ informacji (← od klienta) | Dolny pas: przepływ materiałów (→ do klienta)",
    mSupplier: "Dostawca", mTransIn: "Transport\ndo firmy", mQC: "Kontrola\njakości",
    mStockMat: "Mag.\nmateriałów", mRelease: "Wydanie\nmat.", mProd: "Produkcja",
    mStockSemi: "Mag.\npółprod.", mAssembly: "Montaż", mStockPrePack: "Mag. przed\npak.",
    mPackaging: "Pakowanie", mStockFG: "Mag. wyrobów\ngot.", mShipPrep: "Przygot.\nwysyłki",
    mTransOut: "Transport\ndo klienta", mCustomer: "Klient",
    iPlanPurch: "Plan. zakupów", iPlanProd: "Plan. produkcji", iPlanAsm: "Plan. montażu",
    iPlanPack: "Plan. pakowania", iPlanShip: "Plan. wysyłki", iCustServ: "Obsługa\nklienta",
    legInfoKanban: "Information flow ← (kanban pull)",
    legInfoOrder: "Information flow ← (order-driven pull)",
    legMatFlow: "Material flow → (fizyczny przepływ)",
    legStockActive: "Magazyn zapasów (aktywny)",
    matFlowLabel: "MATERIAL FLOW →",
    cutBadge: "✂ PUNKT ODCIĘCIA",
    // strategies section
    strategiesTitle: "Strategie",
    strategiesSub: "Każda strategia obliczana jest kumulatywnie od strony klienta (od prawej do lewej):",
    loopMTS: "Pętla MTS (Make to Stock)",
    loopPTO: "Pętla PTO (Pack to Order)",
    loopATO: "Pętla ATO (Assemble to Order)",
    loopMTO: "Pętla MTO (Make to Order)",
    loopBTO: "Pętla BTO (Buy to Order)",
    sCustServ: "Obsługa klienta", sPlanShip: "+ Planowanie wysyłki", sTransOut: "+ Transport do klienta",
    sPrevMTS: "Poprzednia pętla (MTS)", sPlanPack: "+ Planowanie pakowania", sPack: "+ Pakowanie",
    sPrevPTO: "Poprzednia pętla (PTO)", sPlanAsm: "+ Planowanie montażu", sAsm: "+ Montaż",
    sPrevATO: "Poprzednia pętla (ATO)", sPlanProd: "+ Planowanie produkcji", sProd: "+ Produkcja",
    sRelease: "+ Wydanie materiałów",
    sPrevMTO: "Poprzednia pętla (MTO)", sPlanPurch: "+ Planowanie zakupów",
    sSupplProd: "+ Produkcja u dostawcy", sTransIn: "+ Transport do firmy",
    sQC: "+ Kontrola jakości", sWHIn: "+ Przyjęcie na magazyn",
    noteMTS: "Jeśli Customer LT < tego progu → zawsze MTS",
    notePTO: "Customer LT ≥ tego progu → można pakować na zamówienie",
    noteATO: "Customer LT ≥ tego progu → można montować na zamówienie",
    noteMTO: "Planowanie zakupów NIE wchodzi – kanban uzupełnia magazyn materiałów",
    noteBTO: "Cały łańcuch dostaw na zamówienie klienta",
    loopResult: "Pętla",
    summaryTitle: "Podsumowanie progów dla aktualnych parametrów:",
    // decision table
    tableTitle: "Tabela decyzyjna (progi obliczone dla aktualnych parametrów)",
    tHeaders: ["Warunek", "Zakupy", "Prod.", "Zapas"],
    tBTO: (n) => `Customer LT ≥ ${n}d (cały łańcuch + plan. zakupów)`,
    tMTO: (n) => `Customer LT ≥ ${n}d (produkcja + info bez zakupów)`,
    tATO: (n) => `Customer LT ≥ ${n}d (montaż + info)`,
    tPTO: (n) => `Customer LT ≥ ${n}d (pakowanie + info)`,
    tMTS: (n) => `Customer LT < ${n}d`,
    stockNone: "Brak", stockMat: "Magazyn materiałów",
    stockATO: "Mat. + półprod. przed montażem",
    stockPTO: "Mat. + półprod. przed pakowaniem",
    stockMTS: "Mat. + wyroby gotowe",
    keyPrinciple: "Kluczowa zasada:",
    keyText: (n, u) => `Przy BTS czas planowania zakupów (${n} ${u}) nie wchodzi do ścieżki krytycznej zamówienia — zakupy obsługuje pętla kanban (pull od zużycia).`,
    footer1: "Joanna Czerska · Logistics Management",
    footer2: "Wydział Zarządzania i Ekonomii · Politechnika Gdańska",
    // decoupling labels
    dBTO: "Brak zapasów – cały łańcuch realizowany na zlecenie klienta",
    dMTO: "Punkt odcięcia: Magazyn surowców / materiałów",
    dATO: "Punkt odcięcia: Magazyn półproduktów przed montażem",
    dPTO: "Punkt odcięcia: Magazyn przed pakowaniem",
    dMTS: "Punkt odcięcia: Magazyn wyrobów gotowych",
    spMat: "Magazyn surowców / materiałów",
    spSemi: "Magazyn półproduktów (po produkcji, przed montażem)",
    spPrePack: "Magazyn przed pakowaniem",
    spFG: "Magazyn wyrobów gotowych",
    // strategy full descriptions
    btoBuyDesc: "Materiały zamawiane dopiero po otrzymaniu zlecenia klienta. Planowanie zakupów jest częścią ścieżki krytycznej.",
    btsBuyDesc: "Materiały uzupełniane przez pętlę kanban niezależnie od zamówienia klienta. Planowanie zakupów NIE jest częścią ścieżki krytycznej.",
    mtoDesc: "Produkcja uruchamiana po otrzymaniu zamówienia. Materiały już w magazynie (BTS).",
    atoDesc: "Półprodukty gotowe po produkcji. Montaż uruchamiany na zamówienie klienta.",
    ptoDesc: "Produkt złożony w magazynie. Pakowanie realizowane pod konkretne zamówienie.",
    mtsDesc: "Wyroby gotowe w magazynie. Klient otrzymuje dostawę po czasie obsługi i planowania wysyłki.",
  },
  en: {
    subtitle: "Logistics · PG WZiE",
    title: "Inventory Structure in the Supply Chain",
    langBtn: "PL",
    days: "days",
    cltLabel: "Customer Lead Time – time allowed by the customer",
    chipSupply: "Supply",
    chipMfg: "Manufacturing",
    chipInfo: "Information Flow",
    chipTotal: "Total",
    groupSupply: "Supply",
    groupMfg: "Manufacturing",
    groupInfo: "Information Flow",
    supplierProd: "Supplier production",
    transport: "Inbound transport",
    qc: "Quality inspection",
    warehouseIn: "Goods receipt",
    materialRelease: "Material issue",
    production: "Production / processing",
    assembly: "Assembly",
    packaging: "Packaging",
    shippingPrep: "Shipping preparation",
    transportOut: "Outbound transport",
    customerService: "Customer service",
    shippingPlanning: "Shipping planning",
    packagingPlanning: "Packaging planning",
    assemblyPlanning: "Assembly planning",
    productionPlanning: "Production planning",
    purchasingPlanning: "Purchasing planning",
    onlyBTO: "BTO only",
    timelineTitle: "Supply chain timeline",
    execLabel: (n, u) => `Execution Time = ${n} ${u}`,
    cltBarLabel: (n, u) => `Customer LT = ${n} ${u} ← from right`,
    decouplingPointLabel: "Decoupling point",
    legSupply: "Supply",
    legMfg: "Manufacturing",
    legInfo: "Information Flow",
    strategyTitle: "Recommended strategy",
    beforeCut: "Before the decoupling point",
    afterCut: "After the decoupling point",
    pullKanban: "→ pull driven by stock consumption (kanban replenishment loops).",
    pullOrder: "→ pull driven by actual customer order (order-driven).",
    kanbanNote: (n, u) => `Purchasing planning is handled by the kanban loop – NOT on the customer order critical path. Time: ${n} ${u}.`,
    stockTitle: "Inventory holding points:",
    mapTitle: "Supply chain map",
    mapSub: "Top row: information flow (← from customer) | Bottom row: material flow (→ to customer)",
    mSupplier: "Supplier", mTransIn: "Inbound\ntransport", mQC: "Quality\ncheck",
    mStockMat: "Raw mat.\nstock", mRelease: "Material\nissue", mProd: "Production",
    mStockSemi: "Semi-fin.\nstock", mAssembly: "Assembly", mStockPrePack: "Pre-pack\nstock",
    mPackaging: "Packaging", mStockFG: "Finished\ngoods stock", mShipPrep: "Shipping\nprep.",
    mTransOut: "Outbound\ntransport", mCustomer: "Customer",
    iPlanPurch: "Purch. plan.", iPlanProd: "Prod. plan.", iPlanAsm: "Asm. plan.",
    iPlanPack: "Pack. plan.", iPlanShip: "Ship. plan.", iCustServ: "Customer\nservice",
    legInfoKanban: "Information flow ← (kanban pull)",
    legInfoOrder: "Information flow ← (order-driven pull)",
    legMatFlow: "Material flow → (physical flow)",
    legStockActive: "Active inventory location",
    matFlowLabel: "MATERIAL FLOW →",
    cutBadge: "✂ DECOUPLING POINT",
    strategiesTitle: "Strategies",
    strategiesSub: "Each strategy is calculated cumulatively from the customer side (right to left):",
    loopMTS: "Loop MTS (Make to Stock)",
    loopPTO: "Loop PTO (Pack to Order)",
    loopATO: "Loop ATO (Assemble to Order)",
    loopMTO: "Loop MTO (Make to Order)",
    loopBTO: "Loop BTO (Buy to Order)",
    sCustServ: "Customer service", sPlanShip: "+ Shipping planning", sTransOut: "+ Outbound transport",
    sPrevMTS: "Previous loop (MTS)", sPlanPack: "+ Packaging planning", sPack: "+ Packaging",
    sPrevPTO: "Previous loop (PTO)", sPlanAsm: "+ Assembly planning", sAsm: "+ Assembly",
    sPrevATO: "Previous loop (ATO)", sPlanProd: "+ Production planning", sProd: "+ Production",
    sRelease: "+ Material issue",
    sPrevMTO: "Previous loop (MTO)", sPlanPurch: "+ Purchasing planning",
    sSupplProd: "+ Supplier production", sTransIn: "+ Inbound transport",
    sQC: "+ Quality inspection", sWHIn: "+ Goods receipt",
    noteMTS: "If Customer LT < this threshold → always MTS",
    notePTO: "Customer LT ≥ this threshold → can pack to order",
    noteATO: "Customer LT ≥ this threshold → can assemble to order",
    noteMTO: "Purchasing planning NOT included – kanban replenishes material stock",
    noteBTO: "Entire supply chain executed to customer order",
    loopResult: "Loop",
    summaryTitle: "Summary of thresholds for current parameters:",
    tableTitle: "Decision table (thresholds calculated for current parameters)",
    tHeaders: ["Condition", "Buying", "Making", "Stock"],
    tBTO: (n) => `Customer LT ≥ ${n}d (full chain + purch. planning)`,
    tMTO: (n) => `Customer LT ≥ ${n}d (production + info excl. purchasing)`,
    tATO: (n) => `Customer LT ≥ ${n}d (assembly + info)`,
    tPTO: (n) => `Customer LT ≥ ${n}d (packaging + info)`,
    tMTS: (n) => `Customer LT < ${n}d`,
    stockNone: "None", stockMat: "Raw materials warehouse",
    stockATO: "Mat. + semi-finished before assembly",
    stockPTO: "Mat. + semi-finished before packaging",
    stockMTS: "Mat. + finished goods",
    keyPrinciple: "Key principle:",
    keyText: (n, u) => `Under BTS, purchasing planning time (${n} ${u}) is NOT on the customer order critical path — replenishment is handled by the kanban loop (consumption-driven pull).`,
    footer1: "Joanna Czerska · Logistics Management",
    footer2: "Faculty of Management and Economics · Gdańsk University of Technology",
    dBTO: "No stock – entire chain executed to customer order",
    dMTO: "Decoupling point: Raw materials warehouse",
    dATO: "Decoupling point: Semi-finished goods stock (before assembly)",
    dPTO: "Decoupling point: Pre-packaging stock",
    dMTS: "Decoupling point: Finished goods warehouse",
    spMat: "Raw materials warehouse",
    spSemi: "Semi-finished goods stock (after production, before assembly)",
    spPrePack: "Pre-packaging stock",
    spFG: "Finished goods warehouse",
    btoBuyDesc: "Materials ordered only upon receipt of customer order. Purchasing planning is on the critical path.",
    btsBuyDesc: "Materials replenished via kanban loop independent of customer orders. Purchasing planning is NOT on the critical path.",
    mtoDesc: "Production triggered by customer order. Materials already in stock (BTS).",
    atoDesc: "Semi-finished goods ready after production. Assembly triggered by customer order.",
    ptoDesc: "Assembled product in stock. Packaging executed per specific customer order.",
    mtsDesc: "Finished goods in stock. Customer receives delivery after customer service and shipping planning time.",
  }
};

function SliderGroup({ title, color, items, values, onChange, collapsed, onToggle, total, unit }) {
  return (
    <div style={{ background: "white", borderRadius: "14px", border: `2px solid ${color}25`, overflow: "hidden", boxShadow: `0 2px 12px ${color}12` }}>
      <button onClick={onToggle} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "10px", height: "24px", borderRadius: "4px", background: color, flexShrink: 0 }} />
          <span style={{ fontWeight: "700", fontSize: "13px", color: "#1B2F5E", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ background: `${color}18`, color, fontWeight: "800", fontSize: "15px", padding: "3px 12px", borderRadius: "20px", border: `1.5px solid ${color}35` }}>
            {total} <span style={{ fontSize: "10px", fontWeight: "500" }}>{unit}</span>
          </div>
          <span style={{ color: "#94A3B8", fontSize: "14px" }}>{collapsed ? "▼" : "▲"}</span>
        </div>
      </button>
      {!collapsed && (
        <div style={{ padding: "4px 16px 16px", borderTop: `1px solid ${color}15` }}>
          {items.map(item => (
            <div key={item.key} style={{ marginTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "500" }}>{item.label}</span>
                  {item.note && <span style={{ fontSize: "10px", background: "#FEF3C7", color: "#92400E", padding: "1px 6px", borderRadius: "8px", fontWeight: "600" }}>{item.note}</span>}
                </div>
                <span style={{ fontSize: "13px", fontWeight: "700", color, flexShrink: 0, marginLeft: "8px" }}>{values[item.key]} {unit}</span>
              </div>
              <input type="range" min={item.min ?? 0} max={item.max ?? 30} step={1} value={values[item.key]}
                onChange={e => onChange(item.key, Number(e.target.value))}
                style={{ width: "100%", accentColor: color, cursor: "pointer" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const allStrategyCodes = ["BTO", "BTS", "MTO", "ATO", "PTO", "MTS"];

export default function App() {
  const [customerLT, setCustomerLT] = useState(10);
  const [collapsed, setCollapsed] = useState({ supply: true, mfg: true, info: true });
  const [lang, setLang] = useState("pl");
  const T = TRANS[lang];

  const [supplyLT, setSupplyLT] = useState({ supplierProd: 10, transport: 5, qc: 2, warehouseIn: 1 });
  const [mfgLT, setMfgLT]       = useState({ materialRelease: 1, production: 5, assembly: 2, packaging: 1, shippingPrep: 1, transportOut: 1 });
  const [infoLT, setInfoLT]     = useState({ customerService: 1, shippingPlanning: 1, packagingPlanning: 1, assemblyPlanning: 1, productionPlanning: 2, purchasingPlanning: 1 });

  const strategyInfo = {
    BTO: { label: "BTO", full: "Buy to Order",      color: "#F59E0B", desc: T.btoBuyDesc, icon: "buy_order"  },
    BTS: { label: "BTS", full: "Buy to Stock",       color: "#D97706", desc: T.btsBuyDesc, icon: "buy_stock"  },
    MTO: { label: "MTO", full: "Make to Order",      color: "#3B82F6", desc: T.mtoDesc,    icon: "make_order" },
    ATO: { label: "ATO", full: "Assemble to Order",  color: "#6366F1", desc: T.atoDesc,    icon: "assemble"   },
    PTO: { label: "PTO", full: "Pack to Order",      color: "#8B5CF6", desc: T.ptoDesc,    icon: "pack_order" },
    MTS: { label: "MTS", full: "Make to Stock",      color: "#10B981", desc: T.mtsDesc,    icon: "make_stock" },
  };

  const supplyItems = [
    { key: "supplierProd", label: T.supplierProd, max: 60 },
    { key: "transport",    label: T.transport,    max: 30 },
    { key: "qc",           label: T.qc,           max: 10 },
    { key: "warehouseIn",  label: T.warehouseIn,  max: 5  },
  ];
  const mfgItems = [
    { key: "materialRelease", label: T.materialRelease, max: 5  },
    { key: "production",      label: T.production,      max: 30 },
    { key: "assembly",        label: T.assembly,        max: 20 },
    { key: "packaging",       label: T.packaging,       max: 10 },
    { key: "shippingPrep",    label: T.shippingPrep,    max: 5  },
    { key: "transportOut",    label: T.transportOut,    max: 10 },
  ];
  const infoItems = [
    { key: "customerService",   label: T.customerService,   max: 5  },
    { key: "shippingPlanning",  label: T.shippingPlanning,  max: 5  },
    { key: "packagingPlanning", label: T.packagingPlanning, max: 5  },
    { key: "assemblyPlanning",  label: T.assemblyPlanning,  max: 5  },
    { key: "productionPlanning",label: T.productionPlanning,max: 10 },
    { key: "purchasingPlanning",label: T.purchasingPlanning,max: 10, note: T.onlyBTO },
  ];

  const totalSupply = Object.values(supplyLT).reduce((a,b)=>a+b,0);
  const totalMfg    = Object.values(mfgLT).reduce((a,b)=>a+b,0);
  const totalInfoCalc = Object.values(infoLT).reduce((a,b)=>a+b,0);
  const totalExecution = totalSupply + totalMfg + totalInfoCalc;

  const { buyStrategy, makeStrategy, stockPoints, decouplingLabel, decouplingPos,
          timeForMTS, timeForPTO, timeForATO, timeForMTO, timeForBTO } = useMemo(() => {
    const timeForMTS = infoLT.customerService + infoLT.shippingPlanning + mfgLT.transportOut;
    const timeForPTO = timeForMTS + infoLT.packagingPlanning + mfgLT.packaging;
    const timeForATO = timeForPTO + infoLT.assemblyPlanning + mfgLT.assembly;
    const timeForMTO = timeForATO + infoLT.productionPlanning + mfgLT.production + mfgLT.materialRelease;
    const timeForBTO = timeForMTO + infoLT.purchasingPlanning + totalSupply;

    let buyStrategy, makeStrategy, stockPoints = [], decouplingLabel, decouplingPos = 0;
    if (customerLT >= timeForBTO) {
      buyStrategy="BTO"; makeStrategy="MTO"; stockPoints=[];
      decouplingLabel=T.dBTO; decouplingPos=0;
    } else if (customerLT >= timeForMTO) {
      buyStrategy="BTS"; makeStrategy="MTO"; stockPoints=[T.spMat];
      decouplingLabel=T.dMTO; decouplingPos=totalSupply;
    } else if (customerLT >= timeForATO) {
      buyStrategy="BTS"; makeStrategy="ATO"; stockPoints=[T.spMat, T.spSemi];
      decouplingLabel=T.dATO; decouplingPos=totalSupply+mfgLT.materialRelease+mfgLT.production;
    } else if (customerLT >= timeForPTO) {
      buyStrategy="BTS"; makeStrategy="PTO"; stockPoints=[T.spMat, T.spSemi, T.spPrePack];
      decouplingLabel=T.dPTO; decouplingPos=totalSupply+mfgLT.materialRelease+mfgLT.production+mfgLT.assembly;
    } else {
      buyStrategy="BTS"; makeStrategy="MTS"; stockPoints=[T.spMat, T.spFG];
      decouplingLabel=T.dMTS; decouplingPos=totalSupply+totalMfg;
    }
    return { buyStrategy, makeStrategy, stockPoints, decouplingLabel, decouplingPos, timeForMTS, timeForPTO, timeForATO, timeForMTO, timeForBTO };
  }, [customerLT, supplyLT, mfgLT, infoLT, totalSupply, totalMfg, T]);

  const maxLT = Math.max(totalExecution, customerLT, 20);
  const customerBarPct = Math.min((customerLT / maxLT) * 100, 100);
  const decouplingPct = totalExecution > 0 ? Math.max(1, Math.min((decouplingPos / maxLT) * 100, 97)) : 0;

  const segments = [
    { label: T.supplierProd,    value: supplyLT.supplierProd,      color: COLORS.supply },
    { label: T.transport,       value: supplyLT.transport,          color: COLORS.supply },
    { label: T.qc,              value: supplyLT.qc,                 color: COLORS.supply },
    { label: T.warehouseIn,     value: supplyLT.warehouseIn,        color: COLORS.supply },
    { label: T.materialRelease, value: mfgLT.materialRelease,       color: COLORS.mfg },
    { label: T.production,      value: mfgLT.production,            color: COLORS.mfg },
    { label: T.assembly,        value: mfgLT.assembly,              color: COLORS.mfg },
    { label: T.packaging,       value: mfgLT.packaging,             color: COLORS.mfg },
    { label: T.shippingPrep,    value: mfgLT.shippingPrep,          color: COLORS.mfg },
    { label: T.transportOut,    value: mfgLT.transportOut,          color: COLORS.mfg },
    { label: T.purchasingPlanning,  value: infoLT.purchasingPlanning,  color: COLORS.info },
    { label: T.productionPlanning,  value: infoLT.productionPlanning,  color: COLORS.info },
    { label: T.assemblyPlanning,    value: infoLT.assemblyPlanning,    color: COLORS.info },
    { label: T.packagingPlanning,   value: infoLT.packagingPlanning,   color: COLORS.info },
    { label: T.shippingPlanning,    value: infoLT.shippingPlanning,    color: COLORS.info },
    { label: T.customerService,     value: infoLT.customerService,     color: COLORS.info },
  ].filter(s => s.value > 0);

  const toggle = key => setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));

  const tableRows = [
    { cond: T.tBTO(timeForBTO), buy:"BTO", make:"MTO", stock: T.stockNone },
    { cond: T.tMTO(timeForMTO), buy:"BTS", make:"MTO", stock: T.stockMat  },
    { cond: T.tATO(timeForATO), buy:"BTS", make:"ATO", stock: T.stockATO  },
    { cond: T.tPTO(timeForPTO), buy:"BTS", make:"PTO", stock: T.stockPTO  },
    { cond: T.tMTS(timeForPTO), buy:"BTS", make:"MTS", stock: T.stockMTS  },
  ];

  const u = T.days;

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0F172A 0%,#1B2F5E 60%,#0F172A 100%)", fontFamily:"'Georgia',serif", color:"#E2E8F0" }}>

      {/* Sticky header */}
      <div style={{ position:"sticky", top:0, zIndex:100, background:"rgba(15,23,42,0.97)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"10px 16px" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#94A3B8" }}>{T.subtitle}</div>
            <div style={{ fontSize:"15px", fontWeight:"800", color:"#F8FAFC" }}>{T.title}</div>
          </div>
          <button onClick={() => setLang(l => l === "pl" ? "en" : "pl")} style={{
            background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.2)",
            borderRadius:"8px", padding:"6px 14px", color:"#F8FAFC", fontSize:"12px",
            fontWeight:"800", cursor:"pointer", letterSpacing:"0.08em", flexShrink:0,
            transition:"background 0.2s",
          }}>{T.langBtn}</button>
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"14px 12px 48px" }}>

        {/* Customer LT */}
        <div style={{ background:"linear-gradient(135deg,#7F1D1D,#991B1B)", borderRadius:"16px", padding:"16px 18px", marginBottom:"12px", border:"2px solid #EF444430", boxShadow:"0 6px 24px #EF444420" }}>
          <div style={{ fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#FCA5A5", fontWeight:"600", marginBottom:"10px", display:"flex", alignItems:"center", gap:"6px" }}>
            <MapIcon name="target" size={13} color="#FCA5A5" /> {T.cltLabel}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
            <input type="range" min={1} max={90} step={1} value={customerLT}
              onChange={e => setCustomerLT(Number(e.target.value))}
              style={{ flex:1, accentColor:"#EF4444", cursor:"pointer" }} />
            <div style={{ background:"#EF4444", color:"white", fontWeight:"900", fontSize:"26px", padding:"6px 14px", borderRadius:"12px", minWidth:"68px", textAlign:"center", boxShadow:"0 3px 14px #EF444450", flexShrink:0 }}>
              {customerLT}
              <div style={{ fontSize:"10px", fontWeight:"500" }}>{u}</div>
            </div>
          </div>
        </div>

        {/* Summary chips */}
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"12px" }}>
          {[
            { label:`${T.chipSupply}: ${totalSupply}d`, color:COLORS.supply },
            { label:`${T.chipMfg}: ${totalMfg}d`,      color:COLORS.mfg    },
            { label:`${T.chipInfo}: ${totalInfoCalc}d`, color:COLORS.info   },
            { label:`${T.chipTotal}: ${totalExecution}d`, color:"#E2E8F0", bold:true },
          ].map(item => (
            <div key={item.label} style={{ background:`${item.color}22`, color:item.color, border:`1.5px solid ${item.color}40`, padding:"4px 11px", borderRadius:"20px", fontSize:"11px", fontWeight:item.bold?"800":"600" }}>
              {item.label}
            </div>
          ))}
        </div>

        {/* Sliders */}
        <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"12px" }}>
          <SliderGroup title={T.groupSupply} color={COLORS.supply} items={supplyItems} values={supplyLT}
            total={totalSupply} unit={u} onChange={(k,v)=>setSupplyLT(p=>({...p,[k]:v}))}
            collapsed={collapsed.supply} onToggle={()=>toggle("supply")} />
          <SliderGroup title={T.groupMfg} color={COLORS.mfg} items={mfgItems} values={mfgLT}
            total={totalMfg} unit={u} onChange={(k,v)=>setMfgLT(p=>({...p,[k]:v}))}
            collapsed={collapsed.mfg} onToggle={()=>toggle("mfg")} />
          <SliderGroup title={T.groupInfo} color={COLORS.info} items={infoItems} values={infoLT}
            total={totalInfoCalc} unit={u} onChange={(k,v)=>setInfoLT(p=>({...p,[k]:v}))}
            collapsed={collapsed.info} onToggle={()=>toggle("info")} />
        </div>

        {/* Timeline */}
        <div style={{ background:"white", borderRadius:"16px", padding:"16px", marginBottom:"12px", boxShadow:"0 4px 20px rgba(0,0,0,0.25)" }}>
          <div style={{ fontSize:"11px", fontWeight:"800", color:"#1B2F5E", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"12px", display:"flex", alignItems:"center", gap:"6px" }}>
            <MapIcon name="chart" size={13} color="#1B2F5E" /> {T.timelineTitle}
          </div>
          <div style={{ fontSize:"10px", color:"#94A3B8", fontWeight:"600", textTransform:"uppercase", marginBottom:"4px" }}>
            {T.execLabel(totalExecution, u)}
          </div>
          <div style={{ position:"relative", height:"34px", background:"#F1F5F9", borderRadius:"8px", overflow:"hidden", marginBottom:"8px" }}>
            {segments.map((seg,i) => {
              const prev = segments.slice(0,i).reduce((a,s)=>a+s.value,0);
              return (
                <div key={i} title={`${seg.label}: ${seg.value} ${u}`} style={{
                  position:"absolute", left:`${(prev/maxLT)*100}%`, width:`${(seg.value/maxLT)*100}%`,
                  height:"100%", background:seg.color, borderRight:"1px solid rgba(255,255,255,0.2)",
                  display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
                }}>
                  {(seg.value/maxLT)>0.07 && <span style={{ fontSize:"9px", color:"white", fontWeight:"700", padding:"0 2px" }}>{seg.value}d</span>}
                </div>
              );
            })}
            {buyStrategy !== "BTO" && (
              <div style={{ position:"absolute", left:`${decouplingPct}%`, top:0, bottom:0, width:"3px", background:"white", boxShadow:"0 0 6px rgba(0,0,0,0.5)", zIndex:10 }} />
            )}
          </div>
          <div style={{ fontSize:"10px", color:"#94A3B8", fontWeight:"600", textTransform:"uppercase", marginBottom:"4px" }}>
            {T.cltBarLabel(customerLT, u)}
          </div>
          <div style={{ position:"relative", height:"28px", background:"#F1F5F9", borderRadius:"8px", marginBottom:"10px" }}>
            <div style={{ position:"absolute", right:0, width:`${customerBarPct}%`, height:"100%", background:"linear-gradient(90deg,#FCA5A5,#EF4444)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:"10px", color:"white", fontWeight:"700" }}>← {customerLT} {u} →</span>
            </div>
          </div>
          {buyStrategy !== "BTO" && (
            <div style={{ position:"relative", height:"26px", marginBottom:"4px" }}>
              <div style={{ position:"absolute", left:`${decouplingPct}%`, transform:"translateX(-50%)", background:"#1B2F5E", color:"white", padding:"3px 10px", borderRadius:"12px", fontSize:"9px", fontWeight:"700", whiteSpace:"nowrap", top:"4px", boxShadow:"0 2px 8px rgba(27,47,94,0.5)" }}>
                ▼ {T.decouplingPointLabel}
              </div>
            </div>
          )}
          {/* Legend */}
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", paddingTop:"8px", borderTop:"1px solid #F1F5F9" }}>
            {[
              { label:T.legSupply, color:COLORS.supply },
              { label:T.legMfg,    color:COLORS.mfg    },
              { label:T.legInfo,   color:COLORS.info   },
            ].map(item => (
              <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"11px", color:"#64748B" }}>
                <div style={{ width:"10px", height:"10px", borderRadius:"3px", background:item.color }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Result */}
        <div style={{ background:"white", borderRadius:"16px", padding:"16px", marginBottom:"12px", boxShadow:"0 4px 20px rgba(0,0,0,0.25)" }}>
          <div style={{ fontSize:"11px", fontWeight:"800", color:"#1B2F5E", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"12px", display:"flex", alignItems:"center", gap:"6px" }}>
            <MapIcon name="check" size={13} color="#1B2F5E" /> {T.strategyTitle}
          </div>
          <div style={{ background:"#F8FAFC", border:"2px solid #E2E8F0", borderRadius:"10px", padding:"10px 12px", marginBottom:"12px", fontSize:"12px", color:"#374151", lineHeight:"1.6" }}>
            <div>Customer LT: <strong style={{ color:"#EF4444" }}>{customerLT} {u}</strong></div>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginTop:"4px" }}>
              {[
                { label:`MTS: ${timeForMTS}d`, active: customerLT < timeForPTO,                                  color:strategyInfo.MTS.color },
                { label:`PTO: ${timeForPTO}d`, active: customerLT>=timeForPTO && customerLT<timeForATO,          color:strategyInfo.PTO.color },
                { label:`ATO: ${timeForATO}d`, active: customerLT>=timeForATO && customerLT<timeForMTO,          color:strategyInfo.ATO.color },
                { label:`MTO: ${timeForMTO}d`, active: customerLT>=timeForMTO && customerLT<timeForBTO,          color:strategyInfo.MTO.color },
                { label:`BTO: ${timeForBTO}d`, active: customerLT>=timeForBTO,                                   color:strategyInfo.BTO.color },
              ].map(t => (
                <div key={t.label} style={{ padding:"2px 9px", borderRadius:"10px", fontSize:"11px", fontWeight:"700", background:t.active?`${t.color}20`:"#F1F5F9", color:t.active?t.color:"#94A3B8", border:`1.5px solid ${t.active?t.color+"50":"#E2E8F0"}` }}>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
          {/* Badges */}
          <div style={{ display:"flex", gap:"7px", flexWrap:"wrap", marginBottom:"12px" }}>
            {allStrategyCodes.map(code => {
              const s = strategyInfo[code];
              const active = code===buyStrategy || code===makeStrategy;
              return (
                <div key={code} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"8px 10px", borderRadius:"10px", background:active?s.color:"#F1F5F9", color:active?"white":"#94A3B8", transition:"all 0.3s", boxShadow:active?`0 3px 12px ${s.color}50`:"none", border:`2px solid ${active?s.color:"#E2E8F0"}`, transform:active?"scale(1.04)":"scale(1)", flex:"1 1 calc(33% - 6px)", minWidth:"80px" }}>
                  <MapIcon name={s.icon} size={16} color={active?"white":"#94A3B8"} />
                  <div>
                    <div style={{ fontSize:"12px", fontWeight:"800" }}>{s.label}</div>
                    <div style={{ fontSize:"9px", fontWeight:"500", opacity:0.85, lineHeight:1.2 }}>{s.full}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Active strategy cards */}
          {[buyStrategy, makeStrategy].filter((v,i,a)=>a.indexOf(v)===i).map(code => {
            const s = strategyInfo[code];
            return (
              <div key={code} style={{ background:`${s.color}10`, border:`2px solid ${s.color}30`, borderRadius:"10px", padding:"11px 13px", marginBottom:"8px", display:"flex", gap:"10px", alignItems:"flex-start" }}>
                <MapIcon name={s.icon} size={22} color={s.color} />
                <div>
                  <div style={{ fontWeight:"800", fontSize:"13px", color:s.color }}>{s.label} – {s.full}</div>
                  <div style={{ fontSize:"12px", color:"#374151", lineHeight:"1.5", marginTop:"2px" }}>{s.desc}</div>
                </div>
              </div>
            );
          })}
          {/* Decoupling info */}
          <div style={{ background:"#EFF6FF", border:"2px solid #BFDBFE", borderRadius:"10px", padding:"11px 13px", marginBottom:stockPoints.length>0?"8px":0 }}>
            <div style={{ fontWeight:"700", color:"#1B2F5E", fontSize:"12px", marginBottom:"4px", display:"flex", alignItems:"center", gap:"5px" }}>
              <MapIcon name="pin" size={12} color="#1B2F5E" /> {decouplingLabel}
            </div>
            <div style={{ fontSize:"11px", color:"#1E40AF", lineHeight:"1.6" }}>
              <strong>{T.beforeCut}</strong> {T.pullKanban}<br />
              <strong>{T.afterCut}</strong> {T.pullOrder}
              {buyStrategy==="BTS" && <><br /><span style={{ color:"#7C3AED" }}>⚠ {T.kanbanNote(infoLT.purchasingPlanning, u)}</span></>}
            </div>
          </div>
          {/* Stock points */}
          {stockPoints.length>0 && (
            <div style={{ background:"#ECFDF5", border:"2px solid #A7F3D0", borderRadius:"10px", padding:"11px 13px" }}>
              <div style={{ fontWeight:"700", color:"#065F46", fontSize:"12px", marginBottom:"7px", display:"flex", alignItems:"center", gap:"5px" }}>
                <MapIcon name="factory" size={13} color="#065F46" /> {T.stockTitle}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
                {stockPoints.map((point,i) => (
                  <div key={i} style={{ background:"#10B981", color:"white", padding:"5px 13px", borderRadius:"20px", fontSize:"12px", fontWeight:"600", display:"inline-flex", alignItems:"center", gap:"6px", alignSelf:"flex-start", boxShadow:"0 2px 8px #10B98130" }}>
                    <MapIcon name="box" size={13} color="white" /> {point}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Supply Chain Map */}
        <div style={{ background:"white", borderRadius:"16px", padding:"16px 14px", marginBottom:"12px", boxShadow:"0 4px 20px rgba(0,0,0,0.25)" }}>
          <div style={{ fontSize:"11px", fontWeight:"800", color:"#1B2F5E", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"4px", display:"flex", alignItems:"center", gap:"6px" }}>
            <MapIcon name="map" size={13} color="#1B2F5E" /> {T.mapTitle}
          </div>
          <div style={{ fontSize:"10px", color:"#94A3B8", marginBottom:"14px" }}>{T.mapSub}</div>

          {(() => {
            const hasStockMat     = stockPoints.some(s=>s===T.spMat);
            const hasStockSemi    = stockPoints.some(s=>s===T.spSemi);
            const hasStockPrePack = stockPoints.some(s=>s===T.spPrePack);
            const hasStockFG      = stockPoints.some(s=>s===T.spFG);
            const isBTO = buyStrategy==="BTO";

            const cols = [
              { id:"supplier",     matLabel:T.mSupplier,    matIcon:"supplier",  matColor:"#92400E", matBg:"#FEF3C7", matBorder:"#F59E0B", nodeTime:`${supplyLT.supplierProd}d`, infoLabel:`${T.iPlanPurch}\n${infoLT.purchasingPlanning}d`, infoActive:isBTO, infoColor:isBTO?"#EF4444":"#9CA3AF" },
              { id:"transport_in", matLabel:T.mTransIn,     matIcon:"truck_in",  matColor:"#B45309", matBg:"#FFFBEB", matBorder:"#FCD34D", nodeTime:`${supplyLT.transport}d`,     infoLabel:null },
              { id:"qc",           matLabel:T.mQC,          matIcon:"qc",        matColor:"#B45309", matBg:"#FFFBEB", matBorder:"#FCD34D", nodeTime:`${supplyLT.qc}d`,            infoLabel:null },
              { id:"stockMat",     matLabel:T.mStockMat,    matIcon:"warehouse", matColor:"#065F46", matBg:"#ECFDF5", matBorder:"#10B981", nodeTime:"≈", isStock:true, stockActive:hasStockMat, infoLabel:null },
              { id:"wydanie",      matLabel:T.mRelease,     matIcon:"release",   matColor:"#1E3A5F", matBg:"#EFF6FF", matBorder:"#93C5FD", nodeTime:`${mfgLT.materialRelease}d`,  infoLabel:null },
              { id:"production",   matLabel:T.mProd,        matIcon:"production",matColor:"#1E40AF", matBg:"#EFF6FF", matBorder:"#3B82F6", nodeTime:`${mfgLT.production}d`,       infoLabel:`${T.iPlanProd}\n${infoLT.productionPlanning}d`, infoActive:true, infoColor:"#EF4444" },
              { id:"stockSemi",    matLabel:T.mStockSemi,   matIcon:"warehouse", matColor:"#065F46", matBg:"#ECFDF5", matBorder:"#10B981", nodeTime:"≈", isStock:true, stockActive:hasStockSemi, infoLabel:null },
              { id:"assembly",     matLabel:T.mAssembly,    matIcon:"assembly",  matColor:"#3730A3", matBg:"#EEF2FF", matBorder:"#6366F1", nodeTime:`${mfgLT.assembly}d`,         infoLabel:`${T.iPlanAsm}\n${infoLT.assemblyPlanning}d`, infoActive:true, infoColor:"#EF4444" },
              { id:"stockPrePack", matLabel:T.mStockPrePack,matIcon:"warehouse", matColor:"#065F46", matBg:"#ECFDF5", matBorder:"#10B981", nodeTime:"≈", isStock:true, stockActive:hasStockPrePack, infoLabel:null },
              { id:"packaging",    matLabel:T.mPackaging,   matIcon:"packaging", matColor:"#5B21B6", matBg:"#F5F3FF", matBorder:"#8B5CF6", nodeTime:`${mfgLT.packaging}d`,        infoLabel:`${T.iPlanPack}\n${infoLT.packagingPlanning}d`, infoActive:true, infoColor:"#EF4444" },
              { id:"stockFG",      matLabel:T.mStockFG,     matIcon:"warehouse", matColor:"#065F46", matBg:"#ECFDF5", matBorder:"#10B981", nodeTime:"≈", isStock:true, stockActive:hasStockFG, infoLabel:null },
              { id:"shippingPrep", matLabel:T.mShipPrep,    matIcon:"release",   matColor:"#991B1B", matBg:"#FEF2F2", matBorder:"#FCA5A5", nodeTime:`${mfgLT.shippingPrep}d`,     infoLabel:`${T.iPlanShip}\n${infoLT.shippingPlanning}d`, infoActive:true, infoColor:"#EF4444" },
              { id:"transport_out",matLabel:T.mTransOut,    matIcon:"truck_out", matColor:"#991B1B", matBg:"#FEF2F2", matBorder:"#FCA5A5", nodeTime:`${mfgLT.transportOut}d`,     infoLabel:null },
              { id:"customer",     matLabel:T.mCustomer,    matIcon:"customer",  matColor:"#7F1D1D", matBg:"#FEF2F2", matBorder:"#EF4444", nodeTime:null, infoLabel:`${T.iCustServ}\n${infoLT.customerService}d`, infoActive:true, infoColor:"#EF4444" },
            ];

            const decouplingIdx = isBTO ? -1 : cols.findIndex(c=>c.isStock&&c.stockActive);
            const zone = (idx) => {
              if (decouplingIdx<0) return "bto";
              if (idx<decouplingIdx) return "kanban";
              if (idx===decouplingIdx) return "cut";
              return "order";
            };
            const infoFlowColor = (idx) => {
              const z = zone(idx);
              return (z==="order"||z==="bto"||z==="cut") ? "#EF4444" : "#9CA3AF";
            };

            const INFO_H = 72, NODE_SIZE = 50;

            return (
              <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
                <div style={{ minWidth:"980px" }}>

                  {/* Info bubbles row */}
                  <div style={{ display:"flex", alignItems:"flex-end", width:"100%" }}>
                    {cols.map((col,idx) => (
                      <div key={col.id+"_info"} style={{ flex:col.isStock?"0 0 52px":"1", display:"flex", flexDirection:"column", alignItems:"center", minWidth:col.isStock?"52px":"56px" }}>
                        <div style={{ minHeight:INFO_H, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", width:"100%" }}>
                          {col.infoLabel ? (
                            <>
                              <div style={{ background:"#FFFFFF", border:`1.5px solid ${infoFlowColor(idx)}`, borderRadius:"7px", padding:"4px 5px", fontSize:"8px", fontWeight:"700", color:"#1E293B", textAlign:"center", lineHeight:"1.35", whiteSpace:"pre-line", width:"calc(100% - 6px)", boxSizing:"border-box", minHeight:"36px", display:"flex", alignItems:"center", justifyContent:"center" }}>{col.infoLabel}</div>
                              <div style={{ width:"2px", height:"12px", background:infoFlowColor(idx), opacity:0.8 }} />
                            </>
                          ) : <div style={{ flex:1 }} />}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info flow SVG arrows */}
                  {(() => {
                    const stockW=52, normalW=72;
                    const totalW=cols.reduce((a,c)=>a+(c.isStock?stockW:normalW),0);
                    let centers=[], x=0;
                    cols.forEach(c=>{ const w=c.isStock?stockW:normalW; centers.push(x+w/2); x+=w; });
                    const svgH=16, y=svgH/2;
                    return (
                      <svg width="100%" height={svgH} viewBox={`0 0 ${totalW} ${svgH}`} preserveAspectRatio="none" style={{ display:"block", overflow:"visible" }}>
                        <defs>
                          <marker id="arr-red"  markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse"><polygon points="0,0 8,3 0,6" fill="#EF4444"/></marker>
                          <marker id="arr-gray" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse"><polygon points="0,0 8,3 0,6" fill="#9CA3AF"/></marker>
                        </defs>
                        {cols.map((_,idx) => {
                          if (idx===0) return null;
                          const x1=centers[idx-1]+2, x2=centers[idx]-2;
                          const c=infoFlowColor(idx);
                          return <line key={idx} x1={x1} y1={y} x2={x2} y2={y} stroke={c} strokeWidth="1.5" markerStart={`url(#${c==="#EF4444"?"arr-red":"arr-gray"})`} />;
                        })}
                      </svg>
                    );
                  })()}

                  {/* Material nodes */}
                  <div style={{ display:"flex", alignItems:"center", marginTop:"2px" }}>
                    {cols.map((col,idx) => {
                      const isDecoupling = idx===decouplingIdx;
                      const dimmed = col.isStock&&!col.stockActive;
                      const matArrowColor = dimmed?"#E2E8F0":"#374151";
                      return (
                        <div key={col.id} style={{ flex:col.isStock?"0 0 52px":"1", display:"flex", alignItems:"center", minWidth:col.isStock?"52px":"56px" }}>
                          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", opacity:dimmed?0.2:1, transition:"opacity 0.3s", paddingTop:isDecoupling?"14px":"0" }}>
                            <div style={{ width:col.isStock?"46px":NODE_SIZE+"px", height:col.isStock?"46px":NODE_SIZE+"px", borderRadius:col.isStock?"8px":"12px", background:dimmed?"#F1F5F9":col.matBg, border:`2px solid ${isDecoupling?"#1B2F5E":col.matBorder}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:isDecoupling?"0 0 0 3px #1B2F5E50,0 4px 16px #1B2F5E30":"0 2px 6px rgba(0,0,0,0.06)", position:"relative" }}>
                              <MapIcon name={col.matIcon} size={col.isStock?16:18} color={dimmed?"#CBD5E1":col.matColor} />
                              {col.nodeTime && <div style={{ fontSize:"9px", fontWeight:"900", color:col.nodeTime==="≈"?"#94A3B8":col.matColor, lineHeight:1, marginTop:"2px" }}>{col.nodeTime}</div>}
                              {isDecoupling && (
                                <div style={{ position:"absolute", top:"-16px", left:"50%", transform:"translateX(-50%)", background:"#1B2F5E", color:"white", fontSize:"7px", fontWeight:"800", padding:"2px 5px", borderRadius:"5px", whiteSpace:"nowrap", boxShadow:"0 2px 6px #1B2F5E50" }}>
                                  {T.cutBadge}
                                </div>
                              )}
                            </div>
                            <div style={{ fontSize:"7.5px", fontWeight:"600", color:dimmed?"#CBD5E1":col.matColor, textAlign:"center", lineHeight:"1.3", maxWidth:col.isStock?"52px":"56px", whiteSpace:"pre-line" }}>{col.matLabel}</div>
                          </div>
                          {idx<cols.length-1 && <div style={{ flexShrink:0, fontSize:"12px", color:matArrowColor, fontWeight:"900", lineHeight:1 }}>→</div>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Material flow label */}
                  <div style={{ display:"flex", alignItems:"center", marginTop:"8px" }}>
                    <div style={{ fontSize:"8px", fontWeight:"800", color:"#374151", textTransform:"uppercase", letterSpacing:"0.06em", background:"#F1F5F9", padding:"2px 6px", borderRadius:"4px", whiteSpace:"nowrap" }}>{T.matFlowLabel}</div>
                  </div>

                  {/* Legend */}
                  <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginTop:"10px", paddingTop:"10px", borderTop:"1px solid #F1F5F9" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"9px", color:"#9CA3AF" }}><div style={{ width:"18px", height:"2px", background:"#9CA3AF", borderRadius:"2px" }} />{T.legInfoKanban}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"9px", color:"#EF4444" }}><div style={{ width:"18px", height:"2px", background:"#EF4444", borderRadius:"2px" }} />{T.legInfoOrder}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"9px", color:"#374151" }}><div style={{ width:"18px", height:"2px", background:"#374151", borderRadius:"2px" }} />{T.legMatFlow}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"9px", color:"#065F46" }}><div style={{ width:"10px", height:"10px", background:"#ECFDF5", border:"2px solid #10B981", borderRadius:"3px" }} />{T.legStockActive}</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Strategies */}
        <div style={{ background:"white", borderRadius:"16px", padding:"16px", marginBottom:"12px", boxShadow:"0 4px 20px rgba(0,0,0,0.25)" }}>
          <div style={{ fontSize:"11px", fontWeight:"800", color:"#1B2F5E", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"14px", display:"flex", alignItems:"center", gap:"6px" }}>
            <MapIcon name="calc" size={13} color="#1B2F5E" /> {T.strategiesTitle}
          </div>
          <div style={{ fontSize:"10px", color:"#64748B", marginBottom:"12px", lineHeight:"1.5" }}>{T.strategiesSub}</div>

          {[
            { strategy:"MTS", color:strategyInfo.MTS.color, active:customerLT<timeForPTO,
              label:T.loopMTS,
              steps:[{ label:T.sCustServ,value:infoLT.customerService },{ label:T.sPlanShip,value:infoLT.shippingPlanning },{ label:T.sTransOut,value:mfgLT.transportOut }],
              total:timeForMTS, note:T.noteMTS },
            { strategy:"PTO", color:strategyInfo.PTO.color, active:customerLT>=timeForPTO&&customerLT<timeForATO,
              label:T.loopPTO,
              steps:[{ label:T.sPrevMTS,value:timeForMTS,base:true },{ label:T.sPlanPack,value:infoLT.packagingPlanning },{ label:T.sPack,value:mfgLT.packaging }],
              total:timeForPTO, note:T.notePTO },
            { strategy:"ATO", color:strategyInfo.ATO.color, active:customerLT>=timeForATO&&customerLT<timeForMTO,
              label:T.loopATO,
              steps:[{ label:T.sPrevPTO,value:timeForPTO,base:true },{ label:T.sPlanAsm,value:infoLT.assemblyPlanning },{ label:T.sAsm,value:mfgLT.assembly }],
              total:timeForATO, note:T.noteATO },
            { strategy:"MTO", color:strategyInfo.MTO.color, active:customerLT>=timeForMTO&&customerLT<timeForBTO,
              label:T.loopMTO,
              steps:[{ label:T.sPrevATO,value:timeForATO,base:true },{ label:T.sPlanProd,value:infoLT.productionPlanning },{ label:T.sProd,value:mfgLT.production },{ label:T.sRelease,value:mfgLT.materialRelease }],
              total:timeForMTO, note:T.noteMTO },
            { strategy:"BTO", color:strategyInfo.BTO.color, active:customerLT>=timeForBTO,
              label:T.loopBTO,
              steps:[{ label:T.sPrevMTO,value:timeForMTO,base:true },{ label:T.sPlanPurch,value:infoLT.purchasingPlanning },{ label:T.sSupplProd,value:supplyLT.supplierProd },{ label:T.sTransIn,value:supplyLT.transport },{ label:T.sQC,value:supplyLT.qc },{ label:T.sWHIn,value:supplyLT.warehouseIn }],
              total:timeForBTO, note:T.noteBTO },
          ].map(({ strategy, color, active, label, steps, total, note }) => (
            <div key={strategy} style={{ marginBottom:"10px", borderRadius:"12px", border:`2px solid ${active?color:"#E2E8F0"}`, overflow:"hidden", boxShadow:active?`0 2px 12px ${color}25`:"none", transition:"all 0.3s" }}>
              <div style={{ background:active?color:"#F8FAFC", padding:"8px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontWeight:"800", fontSize:"12px", color:active?"white":"#64748B" }}>{active?"▶ ":""}{label}</div>
                <div style={{ fontWeight:"900", fontSize:"15px", color:active?"white":color, background:active?"rgba(255,255,255,0.2)":`${color}15`, padding:"2px 10px", borderRadius:"10px" }}>{total} {u}</div>
              </div>
              <div style={{ padding:"10px 14px", background:"white" }}>
                {steps.map((step,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"3px 0", borderBottom:i<steps.length-1?"1px dashed #F1F5F9":"2px solid #E2E8F0" }}>
                    <span style={{ fontSize:"11px", color:step.base?"#94A3B8":"#374151", fontStyle:step.base?"italic":"normal" }}>{step.label}</span>
                    <span style={{ fontSize:"12px", fontWeight:"700", color:step.base?"#94A3B8":color }}>{step.value} {u}</span>
                  </div>
                ))}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"6px" }}>
                  <span style={{ fontSize:"11px", fontWeight:"800", color:"#1B2F5E" }}>= {T.loopResult} {strategy}</span>
                  <span style={{ fontSize:"14px", fontWeight:"900", color }}>= {total} {u}</span>
                </div>
                <div style={{ fontSize:"10px", color:"#94A3B8", marginTop:"4px", fontStyle:"italic" }}>{note}</div>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div style={{ background:"#F8FAFC", borderRadius:"10px", padding:"10px 14px", border:"2px solid #E2E8F0", marginTop:"4px" }}>
            <div style={{ fontSize:"11px", fontWeight:"700", color:"#1B2F5E", marginBottom:"6px" }}>{T.summaryTitle}</div>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
              {[
                { label:`MTS < ${timeForPTO}d`,              color:strategyInfo.MTS.color },
                { label:`PTO ${timeForPTO}–${timeForATO-1}d`,color:strategyInfo.PTO.color },
                { label:`ATO ${timeForATO}–${timeForMTO-1}d`,color:strategyInfo.ATO.color },
                { label:`MTO ${timeForMTO}–${timeForBTO-1}d`,color:strategyInfo.MTO.color },
                { label:`BTO ≥ ${timeForBTO}d`,              color:strategyInfo.BTO.color },
              ].map(t => (
                <div key={t.label} style={{ padding:"3px 10px", borderRadius:"10px", fontSize:"10px", fontWeight:"700", background:`${t.color}18`, color:t.color, border:`1.5px solid ${t.color}40` }}>{t.label}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Decision table */}
        <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"14px", padding:"14px", border:"1px solid rgba(255,255,255,0.08)", marginBottom:"12px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:"#94A3B8", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"10px" }}>{T.tableTitle}</div>
          <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"11px", minWidth:"340px" }}>
              <thead>
                <tr style={{ borderBottom:"2px solid rgba(255,255,255,0.12)" }}>
                  {T.tHeaders.map(h => <th key={h} style={{ padding:"6px 8px", textAlign:"left", color:"#94A3B8", fontWeight:"600", whiteSpace:"nowrap" }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {tableRows.map(({ cond, buy, make, stock }, i) => (
                  <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.05)", background:(buy===buyStrategy&&make===makeStrategy)?"rgba(59,130,246,0.18)":"transparent" }}>
                    <td style={{ padding:"7px 8px", color:"#CBD5E1", lineHeight:"1.4", fontSize:"10px" }}>{cond}</td>
                    <td style={{ padding:"7px 8px" }}><span style={{ background:`${strategyInfo[buy]?.color}28`, color:strategyInfo[buy]?.color, padding:"2px 7px", borderRadius:"7px", fontWeight:"700", whiteSpace:"nowrap" }}>{buy}</span></td>
                    <td style={{ padding:"7px 8px" }}><span style={{ background:`${strategyInfo[make]?.color}28`, color:strategyInfo[make]?.color, padding:"2px 7px", borderRadius:"7px", fontWeight:"700", whiteSpace:"nowrap" }}>{make}</span></td>
                    <td style={{ padding:"7px 8px", color:"#94A3B8", fontSize:"10px" }}>{stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop:"10px", padding:"8px 10px", background:"rgba(124,58,237,0.12)", borderRadius:"8px", fontSize:"10px", color:"#C4B5FD", lineHeight:"1.6", display:"flex", gap:"6px", alignItems:"flex-start" }}>
            <MapIcon name="info" size={12} color="#C4B5FD" />
            <span><strong>{T.keyPrinciple}</strong> {T.keyText(infoLT.purchasingPlanning, u)}</span>
          </div>
        </div>

        <div style={{ textAlign:"center", fontSize:"10px", color:"#475569", lineHeight:"1.7" }}>
          {T.footer1}<br />{T.footer2}
        </div>
      </div>
    </div>
  );
}
