-- =========================================================================
-- JETFUEL-SIM - SCHEMA DO BANCO DE DADOS (CLOUDFLARE D1)
-- =========================================================================

-- 1. FROTA (CTAs e SRVs)
CREATE TABLE IF NOT EXISTS fleet (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'SRV' ou 'CTA'
    capacity INTEGER,
    status TEXT DEFAULT 'AVAILABLE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. OPERADORES (Líderes, Motoristas/Abastecedores)
CREATE TABLE IF NOT EXISTS operators (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL, -- 'LIDER', 'OPERADOR'
    status TEXT DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. MALHA BASE (Voos)
CREATE TABLE IF NOT EXISTS flights (
    id TEXT PRIMARY KEY,
    airline TEXT NOT NULL,
    airline_code TEXT NOT NULL,
    flight_number TEXT NOT NULL,
    destination TEXT NOT NULL,
    etd TEXT,
    eta TEXT,
    aircraft_model TEXT,
    registration TEXT,
    position_id TEXT,
    actual_arrival_time TEXT,
    status TEXT DEFAULT 'SCHEDULED', -- SCHEDULED, EN_ROUTE, IN_POSITION, REFUELED, DEPARTED, CANCELED
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. DESIGNAÇÕES DO TURNO (Quem opera qual frota)
CREATE TABLE IF NOT EXISTS shift_allocations (
    id TEXT PRIMARY KEY,
    operator_id TEXT NOT NULL,
    fleet_id TEXT NOT NULL,
    shift_date DATE NOT NULL,
    shift_period TEXT NOT NULL, -- 'MANHA', 'TARDE', 'NOITE'
    status TEXT DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(operator_id) REFERENCES operators(id),
    FOREIGN KEY(fleet_id) REFERENCES fleet(id)
);

-- 5. BANCO DO DIA (Histórico Completo / Eventos de Auditoria)
CREATE TABLE IF NOT EXISTS daily_logs (
    id TEXT PRIMARY KEY,
    flight_id TEXT,
    action_type TEXT NOT NULL, -- 'FLIGHT_CREATED', 'ASSIGNED', 'REFUEL_START', 'REFUEL_END', 'CANCELLED'
    operator_id TEXT,
    fleet_id TEXT,
    description TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- DADOS INICIAIS (SEED) - INVENTÁRIO DA FROTA VIBRA (FORNECIDO PELO USUÁRIO)
-- =========================================================================
-- Inserindo os SRVs
INSERT INTO fleet (id, name, type) VALUES ('srv-2104', '2104 (Ford)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2108', '2108 (Ford)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2111', '2111 (Ford)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2113', '2113 (Ford)', 'SRV');

INSERT INTO fleet (id, name, type) VALUES ('srv-2122', '2122 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2123', '2123 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2124', '2124 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2125', '2125 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2126', '2126 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2127', '2127 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2128', '2128 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2129', '2129 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2130', '2130 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2131', '2131 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2132', '2132 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2133', '2133 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2135', '2135 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2136', '2136 (MB)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2137', '2137 (MB)', 'SRV');

INSERT INTO fleet (id, name, type) VALUES ('srv-2140', '2140 (VW)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2145', '2145 (VW)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2160', '2160 (VW)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2161', '2161 (VW)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2164', '2164 (VW)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2165', '2165 (VW)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2174', '2174 (VW)', 'SRV');
INSERT INTO fleet (id, name, type) VALUES ('srv-2177', '2177 (VW)', 'SRV');

-- Inserindo os CTAs
INSERT INTO fleet (id, name, type, capacity) VALUES ('cta-1405', '1405', 'CTA', 15000);
INSERT INTO fleet (id, name, type, capacity) VALUES ('cta-1425', '1425', 'CTA', 20000);
INSERT INTO fleet (id, name, type, capacity) VALUES ('cta-1426', '1426', 'CTA', 20000);
INSERT INTO fleet (id, name, type, capacity) VALUES ('cta-1428', '1428', 'CTA', 20000);
INSERT INTO fleet (id, name, type, capacity) VALUES ('cta-1435', '1435', 'CTA', 20000);
INSERT INTO fleet (id, name, type, capacity) VALUES ('cta-1437', '1437', 'CTA', 20000);
INSERT INTO fleet (id, name, type, capacity) VALUES ('cta-1439', '1439', 'CTA', 20000);
INSERT INTO fleet (id, name, type, capacity) VALUES ('cta-1499', '1499', 'CTA', 20000);
INSERT INTO fleet (id, name, type, capacity) VALUES ('cta-1517', '1517', 'CTA', 20000);
