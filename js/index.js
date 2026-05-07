// --- CONFIGURACIÓN GENERAL ---
const CONFIG = {
  pin: "5854",                          // PIN de acceso a la app
  appName: "RegaloFamiliar",
  ciclo: {
    inicio: "Abril 2026",
    fin: "Marzo 2027",
    meses: ["Abril","Mayo","Junio","Julio","Agosto","Septiembre",
            "Octubre","Noviembre","Diciembre","Enero","Febrero","Marzo"],
    // Meses sin cumpleaños (colchón)
    mesesColchon: ["Abril", "Mayo", "Junio"]
  },
  fechaActualizacion: "8 mayo 2026"     // Actualizar
};

// --- PARTICIPANTES ---
// Cómo actualizar un pago:
//   1. Encuentra el participante por nombre
//   2. En su array "pagos", cambia el estado del mes correspondiente:
//      - "pagado"   → cuota mensual pagada
//      - "pendiente"→ aún no ha pagado
//      - "proximo"  → mes futuro (no ha llegado aún)
//   3. Actualiza "montoPagado" con el valor real pagado ese mes
//   4. Actualiza el campo "unoPorciento" a true cuando lo pague
//
// Notas:
//   - "cuotaMensual": lo que paga cada mes (puede variar si la meta es diferente)
//   - "meta": cuánto recibirá de regalo en su cumpleaños
//   - Los meses van de Abril 2026 a Marzo 2027 (en ese orden)

const PARTICIPANTES = [
  {
    nombre: "Andrea",
    cumpleanos: "13 Agosto 2026",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: false,        // true = ya pagó el 1% inicial
    estado: "Pendiente",        // "Al día" o "Pendiente"
    pagos: [
      // { mes, cuota, montoPagado, estado: "pagado" | "pendiente" | "proximo" }
      { mes: "Abril",      cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Bibian",
    cumpleanos: "25 Mayo 2027",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 125000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Brayan",
    cumpleanos: "20 Septiembre 2026",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 125000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Demri",
    cumpleanos: "15 Julio 2026",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: false,
    estado: "Pendiente",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 50000,   estado: "pendiente" },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Fabián",
    cumpleanos: "18 Diciembre 2026",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 125000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Geraldine",
    cumpleanos: "8 Noviembre 2026",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 125000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Hugo",
    cumpleanos: "6 Septiembre 2026",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: false,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 125000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Inés",
    cumpleanos: "28 Enero 2027",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 125000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Julián",
    cumpleanos: "1 Abril 2027",
    meta: 1800000,
    cuotaMensual: 150000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 150000, montoPagado: 150000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 150000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Marinita",
    cumpleanos: "14 Mayo 2027",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 125000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Mathías",
    cumpleanos: "18 Agosto 2026",
    meta: 3000000,
    cuotaMensual: 250000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 250000, montoPagado: 250000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 250000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Nancy",
    cumpleanos: "28 Marzo 2027",
    meta: 1800000,
    cuotaMensual: 150000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 150000, montoPagado: 150000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 150000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Naty",
    cumpleanos: "2 Febrero 2027",
    meta: 1800000,
    cuotaMensual: 150000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 150000, montoPagado: 150000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 150000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Nicolás",
    cumpleanos: "24 Abril 2027",
    meta: 1800000,
    cuotaMensual: 150000,
    unoPorciento: false,
    estado: "Pendiente",
    pagos: [
      { mes: "Abril",      cuota: 150000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Mayo",       cuota: 150000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Nicole",
    cumpleanos: "26 Mayo 2027",
    meta: 1800000,
    cuotaMensual: 150000,
    unoPorciento: false,
    estado: "Pendiente",
    pagos: [
      { mes: "Abril",      cuota: 150000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Mayo",       cuota: 150000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Óscar",
    cumpleanos: "5 Abril 2027",
    meta: 1800000,
    cuotaMensual: 150000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 150000, montoPagado: 150000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 150000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 150000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 150000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Peter",
    cumpleanos: "9 Septiembre 2026",
    meta: 3000000,
    cuotaMensual: 250000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 250000, montoPagado: 250000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 250000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Tere",
    cumpleanos: "23 Septiembre 2026",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 125000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Teresita",
    cumpleanos: "13 Octubre 2026",
    meta: 1500000,
    cuotaMensual: 125000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 125000, montoPagado: 125000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 125000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 125000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 125000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Thomas",
    cumpleanos: "22 Noviembre 2026",
    meta: 3000000,
    cuotaMensual: 250000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 250000, montoPagado: 250000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 250000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Valery",
    cumpleanos: "11 Julio 2026",
    meta: 3000000,
    cuotaMensual: 250000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 250000, montoPagado: 250000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 250000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
  {
    nombre: "Yaz",
    cumpleanos: "24 Enero 2026",
    meta: 3000000,
    cuotaMensual: 250000,
    unoPorciento: true,
    estado: "Al día",
    pagos: [
      { mes: "Abril",      cuota: 250000, montoPagado: 250000,  estado: "pagado"    },
      { mes: "Mayo",       cuota: 250000, montoPagado: 0,       estado: "pendiente" },
      { mes: "Junio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Julio",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Agosto",     cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Septiembre", cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Octubre",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Noviembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Diciembre",  cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Enero",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Febrero",    cuota: 250000, montoPagado: 0,       estado: "proximo"   },
      { mes: "Marzo",      cuota: 250000, montoPagado: 0,       estado: "proximo"   },
    ]
  },
];

// --- REGALOS ENTREGADOS ---
// Agrega aquí los regalos que ya se han entregado
// { nombre, fecha, monto }
const REGALOS_ENTREGADOS = [
  // Ejemplo: { nombre: "Valery", fecha: "11 Julio 2026", monto: 3000000 },
];

// ============================================================
//  NO EDITES NADA DEBAJO DE ESTA LÍNEA
//  Las funciones de cálculo se generan automáticamente
// ============================================================

function calcularTotalAhorrado() {
  return PARTICIPANTES.reduce((total, p) => {
    return total + p.pagos.reduce((s, pago) => s + pago.montoPagado, 0);
  }, 0);
}

function calcularMetaGrupo() {
  return PARTICIPANTES.reduce((total, p) => total + p.meta, 0);
}

function calcularTotalRegalos() {
  return REGALOS_ENTREGADOS.reduce((total, r) => total + r.monto, 0);
}

function calcularSaldoPendiente() {
  return calcularMetaGrupo() - calcularTotalAhorrado();
}

function calcularFondoDisponible() {
  return calcularTotalAhorrado() - calcularTotalRegalos();
}

function calcularProgresoParticipante(participante) {
  const pagado = participante.pagos.reduce((s, p) => s + p.montoPagado, 0);
  return participante.meta > 0 ? (pagado / participante.meta * 100) : 0;
}

function calcularTotalAportadoParticipante(participante) {
  return participante.pagos.reduce((s, p) => s + p.montoPagado, 0);
}

function calcularSaldoPendienteParticipante(participante) {
  return participante.meta - calcularTotalAportadoParticipante(participante);
}

function proximosCumpleanos(n = 3) {
  const hoy = new Date();
  return PARTICIPANTES
    .map(p => {
      const partes = p.cumpleanos.split(' ');
      const mesesMap = {
        'Enero':1,'Febrero':2,'Marzo':3,'Abril':4,'Mayo':5,'Junio':6,
        'Julio':7,'Agosto':8,'Septiembre':9,'Octubre':10,'Noviembre':11,'Diciembre':12
      };
      const dia = parseInt(partes[0]);
      const mes = mesesMap[partes[1]];
      const anio = parseInt(partes[2]);
      const fecha = new Date(anio, mes - 1, dia);
      return { ...p, fechaObj: fecha };
    })
    .filter(p => p.fechaObj >= hoy)
    .sort((a, b) => a.fechaObj - b.fechaObj)
    .slice(0, n);
}

//

// ============================================================
//  RegaloFamiliar — APP.JS
//  Lógica completa: PIN, navegación, render y modal
// ============================================================

// --- UTILIDADES ---

function formatCOP(valor) {
  if (valor === 0) return '$0';
  return '$' + valor.toLocaleString('es-CO').replace(/,/g, '\'');
}

function formatPct(valor) {
  if (valor < 0.01 && valor > 0) return '0,01%';
  return valor.toFixed(2).replace('.', ',') + '%';
}

// ============================================================
//  PIN
// ============================================================

let pinIngresado = '';

function pinPress(digito) {
  if (pinIngresado.length >= 4) return;
  pinIngresado += digito;
  actualizarDots();
  if (pinIngresado.length === 4) {
    setTimeout(validarPin, 150);
  }
}

function pinDelete() {
  if (pinIngresado.length === 0) return;
  pinIngresado = pinIngresado.slice(0, -1);
  actualizarDots();
  ocultarErrorPin();
}

function actualizarDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById('dot' + i);
    dot.classList.toggle('filled', i < pinIngresado.length);
  }
}

function validarPin() {
  if (pinIngresado === CONFIG.pin) {
    // PIN correcto: ocultar pantalla PIN y mostrar app
    document.getElementById('pinScreen').classList.remove('active');
    const app = document.getElementById('appWrapper');
    app.style.display = 'flex';
    app.style.flexDirection = 'column';
    app.style.minHeight = '100vh';
    inicializarApp();
  } else {
    // PIN incorrecto
    mostrarErrorPin();
    pinIngresado = '';
    actualizarDots();
  }
}

function mostrarErrorPin() {
  document.getElementById('pinError').classList.add('visible');
  // Efecto shake en la card
  const card = document.querySelector('.pin-card');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = 'shake 0.4s ease';
}

function ocultarErrorPin() {
  document.getElementById('pinError').classList.remove('visible');
}

// Animación shake (se agrega dinámicamente)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// Soporte teclado físico en la pantalla PIN
document.addEventListener('keydown', function(e) {
  const pinVisible = document.getElementById('pinScreen').classList.contains('active');
  if (!pinVisible) return;
  if (e.key >= '0' && e.key <= '9') pinPress(e.key);
  if (e.key === 'Backspace') pinDelete();
});

// ============================================================
//  NAVEGACIÓN
// ============================================================

function showPage(pageName, linkEl) {
  // Ocultar todas las páginas
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Mostrar la página seleccionada
  document.getElementById('page-' + pageName).classList.add('active');

  // Actualizar nav activo
  document.querySelectorAll('.navbar-nav a').forEach(a => a.classList.remove('active'));
  if (linkEl) {
    linkEl.classList.add('active');
  } else {
    // Buscar el link por texto
    document.querySelectorAll('.navbar-nav a').forEach(a => {
      const map = { inicio: 'Inicio', participantes: 'Participantes', calendario: 'Calendario' };
      if (a.textContent.trim() === map[pageName]) a.classList.add('active');
    });
  }

  // Scroll al tope
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return false;
}

// ============================================================
//  INICIALIZACIÓN
// ============================================================

function inicializarApp() {
  renderInicio();
  renderParticipantes();
  renderCalendario();
}

// ============================================================
//  PÁGINA: INICIO
// ============================================================

function renderInicio() {
  const meta      = calcularMetaGrupo();
  const ahorrado  = calcularTotalAhorrado();
  const regalos   = calcularTotalRegalos();
  const pendiente = calcularSaldoPendiente();
  const fondo     = calcularFondoDisponible();
  const pct       = meta > 0 ? (ahorrado / meta * 100) : 0;

  // Subtítulo header
  document.getElementById('headerSubtitle').textContent =
    'Ciclo ' + CONFIG.ciclo.inicio + ' a ' + CONFIG.ciclo.fin;

  // Meta y fecha
  document.getElementById('fechaActualizacion').textContent =
    'Última actualización: ' + CONFIG.fechaActualizacion;
  document.getElementById('cicloBadge').textContent =
    'Ciclo ' + CONFIG.ciclo.inicio + ' a ' + CONFIG.ciclo.fin;

  // Stats
  document.getElementById('totalParticipantes').textContent = PARTICIPANTES.length;
  document.getElementById('metaGrupo').textContent          = formatCOP(meta);
  document.getElementById('totalAhorrado').textContent      = formatCOP(ahorrado);
  document.getElementById('metaAhorradoMeta').textContent   = 'Meta: ' + formatCOP(meta);
  document.getElementById('saldoPendiente').textContent     = formatCOP(pendiente);
  document.getElementById('totalRegalos').textContent       = formatCOP(regalos);
  document.getElementById('fondoDisponible').textContent    = formatCOP(fondo);

  // Progreso
  const pctStr = formatPct(pct);
  document.getElementById('progresoPorcentaje').textContent = pctStr;
  document.getElementById('progresoBar').style.width        = Math.min(pct, 100) + '%';
  document.getElementById('progresoAhorrado').textContent   = 'Ahorrado: ' + formatCOP(ahorrado);
  document.getElementById('progresoMeta').textContent       = 'Meta: ' + formatCOP(meta);

  // Próximos cumpleaños
  renderProxCumple();

  // Regalos entregados
  renderRegalos();
}

function renderProxCumple() {
  const lista = document.getElementById('proxCumpleList');
  const proximos = proximosCumpleanos(3);

  if (proximos.length === 0) {
    lista.innerHTML = `
      <div class="birthday-item">
        <div class="birthday-info">
          <span>No hay cumpleaños próximos registrados.</span>
        </div>
      </div>`;
    return;
  }

  lista.innerHTML = proximos.map(p => `
    <div class="birthday-item">
      <div class="birthday-icon">
        <i class="ti ti-gift"></i>
      </div>
      <div class="birthday-info">
        <strong>${p.nombre}</strong>
        <span>${p.cumpleanos}</span>
      </div>
      <span class="birthday-amount">${formatCOP(p.meta)}</span>
    </div>
  `).join('');
}

function renderRegalos() {
  const lista = document.getElementById('regalosEntregadosList');

  // Siempre mostrar al menos 3 items (vacíos si no hay regalos)
  const items = [...REGALOS_ENTREGADOS];
  while (items.length < 3) items.push(null);

  lista.innerHTML = items.slice(0, 3).map(r => {
    if (r) {
      return `
        <div class="gift-item">
          <div class="gift-icon">
            <i class="ti ti-check"></i>
          </div>
          <div class="gift-info">
            <strong>${r.nombre}</strong>
            <span>${r.fecha}</span>
          </div>
          <span class="gift-amount">${formatCOP(r.monto)}</span>
        </div>`;
    } else {
      return `
        <div class="gift-item">
          <div class="gift-icon" style="background:var(--bg-input); color:var(--text-muted);">
            <i class="ti ti-check"></i>
          </div>
          <div class="gift-info">
            <strong style="color:var(--text-muted);">Vacío</strong>
            <span>—</span>
          </div>
          <span class="gift-amount empty">$0</span>
        </div>`;
    }
  }).join('');
}

// ============================================================
//  PÁGINA: PARTICIPANTES
// ============================================================

function renderParticipantes() {
  const grid = document.getElementById('participantsGrid');

  grid.innerHTML = PARTICIPANTES.map(p => {
    const aportado  = calcularTotalAportadoParticipante(p);
    const pendiente = calcularSaldoPendienteParticipante(p);
    const pct       = calcularProgresoParticipante(p);
    const esAlDia   = p.estado === 'Al día';

    return `
      <div class="participant-card" onclick="openModal('${p.nombre}')">
        <div class="participant-card-header">
          <div>
            <div class="participant-name">${p.nombre}</div>
            <div class="participant-date">
              <i class="ti ti-cake"></i> ${p.cumpleanos}
            </div>
          </div>
          <span class="badge ${esAlDia ? 'badge-success' : 'badge-danger'}">
            ${esAlDia
              ? '<i class="ti ti-circle-check"></i> Al día'
              : '<i class="ti ti-alert-circle"></i> Pendiente'}
          </span>
        </div>

        <div class="participant-card-body">
          <div class="participant-stat">
            <div class="stat-label">Meta ahorro</div>
            <div class="stat-value">${formatCOP(p.meta)}</div>
          </div>
          <div class="participant-stat">
            <div class="stat-label">Cuota mensual</div>
            <div class="stat-value">${formatCOP(p.cuotaMensual)}</div>
          </div>
          <div class="participant-stat">
            <div class="stat-label">1%</div>
            <div class="stat-value ${p.unoPorciento ? '' : 'muted'}">
              ${p.unoPorciento ? 'Abonado ✓' : 'Pendiente'}
            </div>
          </div>
          <div class="participant-stat">
            <div class="stat-label">Progreso</div>
            <div class="stat-value">${formatPct(pct)}</div>
          </div>
        </div>

        <div class="progress-mini">
          <div class="progress-mini-fill ${esAlDia ? '' : 'danger'}"
               style="width: ${Math.min(pct, 100)}%"></div>
        </div>

        <div class="participant-card-footer mt-8">
          <span class="progress-text">
            Aportado: <span>${formatCOP(aportado)}</span>
          </span>
          <span class="participant-link">
            Ver historial <i class="ti ti-arrow-right"></i>
          </span>
        </div>
      </div>`;
  }).join('');
}

// ============================================================
//  PÁGINA: CALENDARIO
// ============================================================

// Meses del ciclo con su año correspondiente
const MESES_CICLO = [
  { mes: 'Abril',      anio: 2026 },
  { mes: 'Mayo',       anio: 2026 },
  { mes: 'Junio',      anio: 2026 },
  { mes: 'Julio',      anio: 2026 },
  { mes: 'Agosto',     anio: 2026 },
  { mes: 'Septiembre', anio: 2026 },
  { mes: 'Octubre',    anio: 2026 },
  { mes: 'Noviembre',  anio: 2026 },
  { mes: 'Diciembre',  anio: 2026 },
  { mes: 'Enero',      anio: 2027 },
  { mes: 'Febrero',    anio: 2027 },
  { mes: 'Marzo',      anio: 2027 },
];

const MESES_NUM = {
  'Enero':1,'Febrero':2,'Marzo':3,'Abril':4,'Mayo':5,'Junio':6,
  'Julio':7,'Agosto':8,'Septiembre':9,'Octubre':10,'Noviembre':11,'Diciembre':12
};

function mesActual() {
  const hoy = new Date();
  return { mes: hoy.getMonth() + 1, anio: hoy.getFullYear() };
}

function participantesPorMes(mesNombre, anio) {
  return PARTICIPANTES.filter(p => {
    const partes = p.cumpleanos.split(' ');
    const mesCumple  = MESES_NUM[partes[1]];
    const anioCumple = parseInt(partes[2]);
    return mesCumple === MESES_NUM[mesNombre] && anioCumple === anio;
  }).sort((a, b) => parseInt(a.cumpleanos) - parseInt(b.cumpleanos));
}

function renderCalendario() {
  document.getElementById('calendarioCiclo').textContent =
    'Ciclo ' + CONFIG.ciclo.inicio + ' - ' + CONFIG.ciclo.fin;

  const grid   = document.getElementById('calendarGrid');
  const actual = mesActual();
  const colchon = CONFIG.ciclo.mesesColchon;

  grid.innerHTML = MESES_CICLO.map(({ mes, anio }) => {
    const esActual  = MESES_NUM[mes] === actual.mes && anio === actual.anio;
    const esColchon = colchon.includes(mes);
    const cumples   = participantesPorMes(mes, anio);
    const totalMes  = cumples.reduce((s, p) => s + p.meta, 0);

    const etiquetaAnio = anio === 2027 ? ` / ${anio}` : '';

    let contenido = '';

    if (esColchon) {
      contenido = `
        <div class="calendar-cushion">
          <i class="ti ti-shield"></i>
          <span>Mes de colchón</span>
        </div>`;
    } else {
      contenido = `
        <div class="calendar-birthdays">
          ${cumples.map(p => {
            const dia = p.cumpleanos.split(' ')[0];
            return `
              <div class="calendar-birthday-row">
                <span class="cb-day">${dia}</span>
                <span class="cb-name">${p.nombre}</span>
                <span class="cb-amount">${formatCOP(p.meta)}</span>
              </div>`;
          }).join('')}
        </div>
        ${cumples.length > 0 ? `
        <div class="calendar-month-total">
          <span class="total-label">
            <i class="ti ti-gift"></i> Total:
          </span>
          <span class="total-value">${formatCOP(totalMes)}</span>
        </div>` : ''}`;
    }

    return `
      <div class="calendar-month ${esActual ? 'current' : ''}">
        <div class="calendar-month-header">
          <div class="calendar-month-name">
            ${mes}${etiquetaAnio}
            ${esActual ? '<span class="calendar-current-tag">Actual</span>' : ''}
          </div>
          <div class="calendar-count">
            <i class="ti ti-cake"></i> ${cumples.length}
          </div>
        </div>
        ${contenido}
      </div>`;
  }).join('');

  // Sección "Próximos / siguiente ciclo"
  renderCalendarioProximos();
}

function renderCalendarioProximos() {
  const proximos = PARTICIPANTES.filter(p => {
    const anio = parseInt(p.cumpleanos.split(' ')[2]);
    return anio > 2027 || (anio === 2027 && MESES_NUM[p.cumpleanos.split(' ')[1]] > 3);
  }).sort((a, b) => {
    const fa = parseFechaCumple(a.cumpleanos);
    const fb = parseFechaCumple(b.cumpleanos);
    return fa - fb;
  });

  const container = document.getElementById('calendarNext');

  if (proximos.length === 0) {
    container.style.display = 'none';
    return;
  }

  const total = proximos.reduce((s, p) => s + p.meta, 0);

  container.innerHTML = `
    <div class="calendar-next-header">
      <span class="calendar-next-title">Próximos / 2027</span>
      <div class="calendar-count">
        <i class="ti ti-cake"></i> ${proximos.length}
      </div>
    </div>
    <div class="calendar-birthdays">
      ${proximos.map(p => {
        const partes = p.cumpleanos.split(' ');
        const dia    = partes[0];
        const mes    = partes[1].toLowerCase();
        return `
          <div class="calendar-birthday-row">
            <span class="cb-day">${dia}</span>
            <span class="cb-name" style="padding-left:4px;">
              <span style="color:var(--text-muted); font-size:0.75rem; margin-right:4px;">${mes}</span>
              ${p.nombre}
            </span>
            <span class="cb-amount">${formatCOP(p.meta)}</span>
          </div>`;
      }).join('')}
    </div>
    <div class="calendar-month-total" style="margin-top:14px; padding-top:14px;">
      <span class="total-label">
        <i class="ti ti-gift"></i> Total:
      </span>
      <span class="total-value">${formatCOP(total)}</span>
    </div>`;
}

function parseFechaCumple(cumpleanos) {
  const partes = cumpleanos.split(' ');
  return new Date(parseInt(partes[2]), MESES_NUM[partes[1]] - 1, parseInt(partes[0]));
}

// ============================================================
//  MODAL: HISTORIAL DE PAGOS
// ============================================================

function openModal(nombre) {
  const p = PARTICIPANTES.find(x => x.nombre === nombre);
  if (!p) return;

  const aportado  = calcularTotalAportadoParticipante(p);
  const pendiente = calcularSaldoPendienteParticipante(p);

  // Header
  document.getElementById('modalNombre').textContent    = p.nombre;
  document.getElementById('modalCumpleanos').textContent = p.cumpleanos;

  // Stats
  document.getElementById('modalMeta').textContent     = formatCOP(p.meta);
  document.getElementById('modalAportado').textContent = formatCOP(aportado);
  document.getElementById('modalPendiente').textContent = formatCOP(pendiente);
  document.getElementById('modal1pct').innerHTML = p.unoPorciento
    ? '<i class="ti ti-circle-check"></i> Pagado'
    : 'Pendiente';
  document.getElementById('modal1pct').className = 'modal-stat-value ' +
    (p.unoPorciento ? 'teal' : 'red');

  // Tabla de pagos
  const tbody = document.getElementById('modalPaymentsBody');
  tbody.innerHTML = p.pagos.map(pago => {
    const rowClass = pago.estado === 'pagado'   ? 'row-paid'
                   : pago.estado === 'pendiente' ? 'row-pending'
                   : 'row-next';

    const estadoHtml = pago.estado === 'pagado'
      ? '<span class="estado-badge estado-pagado"><i class="ti ti-check"></i> Pagado</span>'
      : pago.estado === 'pendiente'
      ? '<span class="estado-badge estado-pendiente">Pendiente</span>'
      : '<span class="estado-badge estado-proximo">Próximo</span>';

    const montoHtml = pago.montoPagado > 0
      ? `<span class="col-monto">${formatCOP(pago.montoPagado)}</span>`
      : `<span class="col-monto empty">$—</span>`;

    return `
      <tr class="${rowClass}">
        <td class="col-mes">${pago.mes}</td>
        <td class="col-cuota">${formatCOP(pago.cuota)}</td>
        <td>${montoHtml}</td>
        <td>${estadoHtml}</td>
      </tr>`;
  }).join('');

  // Abrir modal
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  // Solo cierra si el click fue en el overlay (fondo), no en el modal
  if (e.target === document.getElementById('modalOverlay')) {
    closeModalBtn();
  }
}

function closeModalBtn() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModalBtn();
});